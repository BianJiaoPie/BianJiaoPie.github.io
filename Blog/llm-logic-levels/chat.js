#!/usr/bin/env node
// 第二層：多輪對話，有記憶。
// 用法：node chat.js（進入互動模式，輸入問題按 Enter 送出，空行或 exit 結束）
// 跟 qa.js 的差別：這裡用 history 字串把每一輪的問與答都存起來，
// 每次呼叫都把完整歷史一起送給 AI，所以「那第一個要怎麼去」問得出正確答案。

"use strict";

const readline = require("readline");

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
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  console.log("多輪對話模式，輸入問題按 Enter 送出，空行或 exit 結束。");
  console.log('範例流程：先問「推薦三個東京景點」，再問「那第一個要怎麼去」。\n');

  let history = "";
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "你：" });
  rl.prompt();

  rl.on("line", async (line) => {
    const question = line.trim();
    if (!question || question === "exit") {
      rl.close();
      return;
    }

    rl.pause();
    try {
      const prompt = `之前的對話：\n${history}\n\n使用者現在問：${question}\n請直接回覆使用者，不用重複之前的內容。`;
      const reply = await callLLM(prompt);
      console.log("AI：" + reply + "\n");
      history += `使用者：${question}\nAI：${reply}\n`;
    } catch (err) {
      console.error("連線失敗：" + err.message);
    }
    rl.resume();
    rl.prompt();
  });

  rl.on("close", () => process.exit(0));
}

main();
