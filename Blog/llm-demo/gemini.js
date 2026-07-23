#!/usr/bin/env node
// 用法：node llm.js "你的問題"
// 需要 Node 18+（用內建 fetch）。API Key 從環境變數 GEMINI_API_KEY 讀（去
// https://aistudio.google.com/apikey 申請），不要寫死在程式碼裡。
// 可選環境變數 GEMINI_MODEL 換模型，預設 gemini-3.1-flash-lite（免費額度）。

"use strict";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

async function main() {
  const prompt = process.argv.slice(2).join(" ").trim();

  if (!prompt) {
    console.error('用法：node llm.js "你的問題"');
    process.exit(1);
  }
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent` +
    `?key=${encodeURIComponent(API_KEY)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = (data && data.error && data.error.message) || `HTTP ${res.status}`;
    console.error("錯誤：" + msg);
    process.exit(1);
  }

  let text = "";
  try {
    text = data.candidates[0].content.parts.map((p) => p.text || "").join("");
  } catch (e) {
    text = "";
  }

  if (!text) {
    console.error("沒有收到回覆內容（可能被安全過濾擋下）。");
    process.exit(1);
  }

  console.log(text);
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
