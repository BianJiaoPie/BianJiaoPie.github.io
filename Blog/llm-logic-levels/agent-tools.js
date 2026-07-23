#!/usr/bin/env node
// 第三層：Agent，AI 自己決定要不要呼叫工具。
// 用法：node agent-tools.js "幫我查一下禮拜五東京的天氣"
//
// 簡化版做法：先問 AI「這件事需要用哪個工具？」，AI 回傳結構化 JSON 告訴我們要呼叫
// 哪個工具、帶什麼參數；程式收到後才真的去執行（這裡用假資料模擬 API，
// 不涉及任何訂購或金錢行為），再把工具的結果拿回去問 AI 一次，換成自然語言回覆給使用者。

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

// 假的工具，實際專案裡這裡會是真的天氣查詢／行事曆 API。
function checkWeather({ city, date }) {
  return { city, date, condition: "陣雨", tempC: 24 };
}

function addCalendarReminder({ event, date }) {
  return { added: true, event, date };
}

const TOOLS = { checkWeather, addCalendarReminder };

function stripCodeFence(text) {
  return text.replace(/^```json\s*|^```\s*|```\s*$/g, "").trim();
}

const DECISION_PROMPT = `你有以下工具可以用：
- checkWeather({ city, date }): 查詢某天某城市的天氣
- addCalendarReminder({ event, date }): 在行事曆加一則提醒

如果使用者的需求需要用到工具，只回傳一行 JSON，格式：{"tool":"工具名稱","args":{...}}
如果不需要用工具，直接回覆就好，格式：{"tool":null,"reply":"你的回覆文字"}
只回傳 JSON，不要加其他說明文字或程式碼區塊符號。

使用者需求：`;

async function main() {
  const request = process.argv[2];

  if (!request) {
    console.error('用法：node agent-tools.js "幫我查一下禮拜五東京的天氣"');
    process.exit(1);
  }
  if (!API_KEY) {
    console.error("缺少 API Key：先設定環境變數 GEMINI_API_KEY。");
    process.exit(1);
  }

  const rawDecision = await callLLM(DECISION_PROMPT + request);
  const decision = JSON.parse(stripCodeFence(rawDecision));

  if (!decision.tool) {
    console.log(decision.reply);
    return;
  }

  console.log(`【AI 決定呼叫工具】${decision.tool}(${JSON.stringify(decision.args)})`);

  const tool = TOOLS[decision.tool];
  if (!tool) throw new Error(`未知的工具：${decision.tool}`);
  const toolResult = tool(decision.args || {});

  console.log(`【工具執行結果】${JSON.stringify(toolResult)}`);

  const finalReply = await callLLM(
    `工具「${decision.tool}」的執行結果：${JSON.stringify(toolResult)}\n` +
      `請根據這個結果，用自然語言回覆使用者原本的需求：「${request}」`
  );

  console.log("【最終回覆】" + finalReply);
}

main().catch((err) => {
  console.error("執行失敗：" + err.message);
  process.exit(1);
});
