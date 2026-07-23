#!/usr/bin/env node
// 第一層：單次問答，沒有記憶。
// 用法：node qa.js "問題"
// 故意不存任何 history——分開跑兩次、第二次問「那第一個要怎麼去」，
// 就能看到 AI 完全不知道「第一個」是指什麼，因為兩次呼叫之間沒有任何關聯。

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

async function main() {
  const question = process.argv[2];

  if (!question) {
    console.error('用法：node qa.js "問題"');
    process.exit(1);
  }
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  const reply = await callLLM(question);
  console.log(reply);
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
