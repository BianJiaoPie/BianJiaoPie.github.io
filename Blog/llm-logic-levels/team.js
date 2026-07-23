#!/usr/bin/env node
// 第四層：多角色協作，兩個角色輪流發言、互相把關。
// 用法：node team.js "客戶需求" [輪數]
// 「規劃師」提出行程、「把關者」檢查時間會不會太趕——每輪都把之前的討論整包帶給下一位，
// 這樣後面發言的角色才看得到前面說過什麼。

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

const ROLES = [
  { name: "規劃師", instruction: "你是行程規劃師，提出一版具體的東京行程（景點、交通、大致時間安排）。" },
  { name: "把關者", instruction: "你是行程把關者，檢查上面這版行程時間會不會太趕，太趕就明確指出要拿掉哪個景點或調整順序；如果時間允許，請在回覆最後加一句「時間允許」。" },
];

async function main() {
  const request = process.argv[2];
  const maxTurns = Number(process.argv[3]) || 4;

  if (!request) {
    console.error('用法：node team.js "客戶需求：東京三天兩夜，行程盡量排滿但不要太趕" [輪數]');
    process.exit(1);
  }
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  let discussion = `客戶需求：${request}`;

  for (let turn = 0; turn < maxTurns; turn++) {
    const role = ROLES[turn % ROLES.length];
    const prompt = `${discussion}\n\n${role.instruction}`;

    const reply = await callLLM(prompt);
    console.log(`\n【${role.name}】\n${reply}`);

    discussion += `\n\n${role.name}：${reply}`;

    if (role.name === "把關者" && reply.includes("時間允許")) {
      console.log("\n（把關者確認時間允許，結束討論）");
      break;
    }
  }
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
