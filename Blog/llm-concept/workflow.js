#!/usr/bin/env node
// 用法：node workflow.js "主題"
// 固定跑「大綱 → 草稿 → 潤稿」三步（像 pipeline），每一步的輸出直接餵給下一步當輸入。
// 跟 team.js 的差別：team.js 是角色輪流即興發言；workflow.js 的步驟與順序是先定死的。

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

const WORKFLOW = [
  { name: "大綱", prompt: (topic) => `幫「${topic}」列一個大綱。` },
  { name: "草稿", prompt: (topic, prev) => `依照這個大綱寫一段草稿：\n${prev}` },
  { name: "潤稿", prompt: (topic, prev) => `潤飾這篇草稿，讓它更好讀：\n${prev}` },
];

async function main() {
  const topic = process.argv[2];

  if (!topic) {
    console.error('用法：node workflow.js "主題"');
    process.exit(1);
  }
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  let result = topic;

  for (const step of WORKFLOW) {
    result = await callLLM(step.prompt(topic, result));
    console.log(`\n【${step.name}】\n${result}`);
  }
}

main().catch((err) => {
  console.error("連線失敗：" + err.message);
  process.exit(1);
});
