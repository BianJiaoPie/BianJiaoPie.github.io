#!/usr/bin/env node
// 用法：node team.js "主題" [輪數]
// 作家／編輯兩個角色輪流發言，每輪都把之前的對話 history 一起帶給下一個角色。
// pseudocode 的 while(true) 在這裡改成有限輪數（預設 6 輪＝3 組作家/編輯）——
// 真的 while(true) 打 API 會沒有盡頭地燒 quota，留一個可調的輪數上限比較實際。

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
  { name: "作家", instruction: "你是作家，針對主題說出你的想法／草稿。" },
  { name: "編輯", instruction: "你是編輯，要從讀者角度說要怎麼改，具體指出問題。" },
];

async function main() {
  const topic = process.argv[2];
  const maxTurns = Number(process.argv[3]) || 6;

  if (!topic) {
    console.error('用法：node team.js "主題" [輪數]');
    process.exit(1);
  }
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  let history = `主題：${topic}`;

  for (let turn = 0; turn < maxTurns; turn++) {
    const role = ROLES[turn % ROLES.length];
    const prompt = `歷史對話：\n${history}\n\n${role.instruction}`;

    const reply = await callLLM(prompt);
    console.log(`\n【${role.name}】\n${reply}`);

    history += `\n\n${role.name}說：${reply}`;
  }
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
