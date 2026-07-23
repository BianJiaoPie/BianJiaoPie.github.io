#!/usr/bin/env node
// 第五層：Workflow，步驟與順序先定死，跑起來是固定路徑。
// 用法：node workflow.js "東京" "禮拜五"
// 固定跑「查天氣 → 查開放時間 → 排行程 → 寫提醒信」四步，
// 前兩步用假資料模擬真的查詢 API，後兩步真的呼叫 AI，每一步的輸出都是下一步的輸入。

"use strict";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

async function callLLM(promptText) {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent` +
    `?key=${encodeURIComponent(API_KEY)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: promptText }] }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = (data && data.error && data.error.message) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  try {
    return data.candidates[0].content.parts.map((p) => p.text || "").join("");
  } catch (e) {
    throw new Error("沒有收到回覆內容（可能被安全過濾擋下）。");
  }
}

// 假的查詢 API，模擬真實系統裡「工具執行」的那一步。
function checkWeatherMock(city, date) {
  return `${city} ${date}天氣：陣雨，氣溫 24°C。`;
}

function checkOpeningHoursMock(weatherInfo) {
  return `淺草寺 06:00–17:00、明治神宮 05:00–18:00，均為室外景點（天氣資訊：${weatherInfo}）。`;
}

const WORKFLOW = [
  { name: "查天氣", run: (ctx) => checkWeatherMock(ctx.city, ctx.date) },
  { name: "查開放時間", run: (ctx, prev) => checkOpeningHoursMock(prev) },
  { name: "排行程", run: (ctx, prev) => callLLM(`已知天氣與開放時間：「${prev}」，請排一份東京三天兩夜的行程表。`) },
  { name: "寫提醒信", run: (ctx, prev) => callLLM(`把這份行程「${prev}」整理成一封提醒信，內容包含建議帶的物品（例如下雨要帶傘）。`) },
];

async function main() {
  const city = process.argv[2] || "東京";
  const date = process.argv[3] || "禮拜五";

  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  let output = null;
  for (const step of WORKFLOW) {
    output = await step.run({ city, date }, output);
    console.log(`\n【${step.name}】\n${output}`);
  }
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
