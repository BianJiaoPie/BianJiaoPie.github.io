#!/usr/bin/env node
// 第六層：Workflows，多張票同時平行分工處理。
// 用法：node workflows.js
// 用一個寫死的陣列假裝「多張票」（不用真的 PM 系統），每張票各自完整跑一次
// 第五層 workflow.js 的四步驟，`Promise.all` 讓它們平行處理——觀察 log 交錯出現，
// 就能看到不是「一張做完才做下一張」，而是同時開工。

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

// 假的查詢 API，跟 workflow.js 用同一組（各檔獨立、不共用模組，方便單支複製著跑）。
function checkWeatherMock(city, date) {
  return `${city} ${date}天氣：陣雨，氣溫 24°C。`;
}

function checkOpeningHoursMock(weatherInfo) {
  return `主要景點多為室外景點（天氣資訊：${weatherInfo}）。`;
}

const WORKFLOW = [
  { name: "查天氣", run: (ctx) => checkWeatherMock(ctx.city, ctx.date) },
  { name: "查開放時間", run: (ctx, prev) => checkOpeningHoursMock(prev) },
  { name: "排行程", run: (ctx, prev) => callLLM(`已知天氣與開放時間：「${prev}」，請用一句話排一個「${ctx.city}」三天兩夜行程的重點提案。`) },
  { name: "寫提醒信", run: (ctx, prev) => callLLM(`把這個提案「${prev}」整理成一句提醒（例如要不要帶傘）。`) },
];

// 假的票——不用真的 PM 系統，就是一個寫死的陣列。
const TICKETS = [
  { id: "A", city: "東京", date: "禮拜五" },
  { id: "B", city: "大阪", date: "禮拜六" },
  { id: "C", city: "京都", date: "禮拜日" },
];

async function processTicket(ticket) {
  console.log(`【票 ${ticket.id}】開始處理（${ticket.city}）`);

  let output = null;
  for (const step of WORKFLOW) {
    output = await step.run(ticket, output);
    console.log(`【票 ${ticket.id}】完成「${step.name}」`);
  }

  console.log(`【票 ${ticket.id}】全部完成 → ${output}`);
  return { ticket, output };
}

async function main() {
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  console.log(`同時開始處理 ${TICKETS.length} 張票，觀察下面的 log 是不是交錯出現：\n`);
  await Promise.all(TICKETS.map(processTicket));
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
