---
layout: page/blog/blog
title: "LLM 邏輯進階筆記：從一問一答到分工協作，六個層級"
date: 2026-07-23
categories: [學習筆記, LLM]
tags: [LLM, agent, pseudo code, workflow]
---

這是一篇學習筆記，用虛擬碼（pseudo code）整理我對 LLM 邏輯的理解——從最陽春的「問一句答一句」，一路疊加到「多個角色分工、平行處理很多工作」。全篇用同一個例子貫穿：**幫忙規劃東京旅行的 AI 助理**，每一層只加一個新概念，方便對照差異在哪裡。

六層都有對應的可執行 `.js` demo，跑之前先設定環境變數：

```bash
export GEMINI_API_KEY="你的 key"   # 去 https://aistudio.google.com/apikey 免費申請
export GEMINI_MODEL="gemini-3.1-flash-lite"  # 選填，預設就是這個
```

## 第一層：單次問答——沒有記憶，問完就忘

最基礎的型態：你丟一句話進去，AI 吐一句話出來，兩者之間沒有任何關聯。

```js
const reply1 = await ai("推薦三個東京景點")
console.log(reply1)
// "淺草寺、明治神宮、澀谷十字路口"

const reply2 = await ai("那第一個要怎麼去？")
console.log(reply2)
// "不好意思，請問您是指哪個景點呢？"
```

第二句失敗了，因為每次呼叫 `ai()` 都是全新的、獨立的一次對話——AI 不知道「第一個」是指誰。這就是「單次問答」的本質：**沒有上下文，每次都是白紙一張**。

<figure>
<svg viewBox="0 0 860 220" role="img" aria-label="示意圖：兩次呼叫互不相干，AI 不知道兩次之間的關聯" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
<title>第一層示意圖：單次問答，沒有記憶</title>
<defs>
<marker id="arrow1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#666"/></marker>
</defs>
<rect x="0" y="0" width="860" height="220" fill="#fafafa" rx="12"/>
<text x="130" y="20" text-anchor="middle" font-size="13" fill="#888">第 1 次呼叫</text>
<rect x="20" y="35" width="190" height="55" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="115" y="68" text-anchor="middle" font-size="13" fill="#333">使用者：推薦東京景點</text>
<line x1="210" y1="62" x2="250" y2="62" stroke="#666" stroke-width="2" marker-end="url(#arrow1)"/>
<rect x="250" y="35" width="190" height="55" rx="10" fill="#fff3e0" stroke="#ffb74d"/>
<text x="345" y="68" text-anchor="middle" font-size="13" fill="#333">AI：淺草寺等 3 個</text>
<line x1="430" y1="10" x2="430" y2="210" stroke="#bbb" stroke-width="2" stroke-dasharray="6,6"/>
<text x="430" y="205" text-anchor="middle" font-size="13" fill="#999">✕ 兩次互不相干</text>
<text x="650" y="115" text-anchor="middle" font-size="13" fill="#888">第 2 次呼叫（全新、無關）</text>
<rect x="460" y="130" width="190" height="55" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="555" y="163" text-anchor="middle" font-size="13" fill="#333">使用者：第一個怎麼去？</text>
<line x1="650" y1="157" x2="690" y2="157" stroke="#666" stroke-width="2" marker-end="url(#arrow1)"/>
<rect x="690" y="130" width="150" height="55" rx="10" fill="#fff3e0" stroke="#ffb74d"/>
<text x="765" y="163" text-anchor="middle" font-size="13" fill="#333">AI：請問是哪一個？</text>
</svg>
</figure>

對應這個資料夾裡的 `qa.js`，分兩次執行就能重現這個問題：

```bash
node qa.js "推薦三個東京景點"
node qa.js "那第一個要怎麼去？"
```

兩次是各自獨立的 process，沒有共享的 history，第二次自然答不出「第一個」是誰。

## 第二層：多輪對話——有記憶，靠 history 串起來

加一個 `history`，把每一輪的問與答都存起來，下次呼叫時整包帶給 AI。

```js
let history = []

async function ask(question) {
  history.push({ role: "user", text: question })
  const reply = await ai(history) // 把整段歷史都傳進去，不是只傳這一句
  history.push({ role: "ai", text: reply })
  return reply
}

await ask("推薦三個東京景點")
// "淺草寺、明治神宮、澀谷十字路口"

await ask("那第一個要怎麼去？")
// "淺草寺最近的車站是淺草站，搭地鐵銀座線或淺草線都能到。"
```

同樣一句「那第一個要怎麼去？」，這次答對了——差別只在於 AI 看得到完整的 `history`，知道「第一個」指的是淺草寺。跟第一層的差別：**輸出還是純文字，但輸入多了「之前說過什麼」**。

<figure>
<svg viewBox="0 0 860 270" role="img" aria-label="示意圖：history 把每輪問答存起來，下一輪連同歷史一起送給 AI" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
<title>第二層示意圖：多輪對話，靠 history 累積記憶</title>
<defs>
<marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#666"/></marker>
</defs>
<rect x="0" y="0" width="860" height="270" fill="#fafafa" rx="12"/>
<rect x="20" y="20" width="190" height="55" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="115" y="53" text-anchor="middle" font-size="13" fill="#333">使用者：推薦東京景點</text>
<line x1="210" y1="47" x2="250" y2="47" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="250" y="20" width="190" height="55" rx="10" fill="#fff3e0" stroke="#ffb74d"/>
<text x="345" y="53" text-anchor="middle" font-size="13" fill="#333">AI：淺草寺等 3 個</text>
<line x1="115" y1="75" x2="115" y2="108" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow2)"/>
<line x1="345" y1="75" x2="345" y2="108" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow2)"/>
<text x="230" y="105" text-anchor="middle" font-size="12" fill="#2e7d32">history</text>
<rect x="20" y="110" width="420" height="50" rx="10" fill="#e8f5e9" stroke="#66bb6a"/>
<text x="230" y="140" text-anchor="middle" font-size="13" fill="#2e7d32">history：存下 Q1 + A1</text>
<rect x="20" y="200" width="190" height="55" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="115" y="233" text-anchor="middle" font-size="13" fill="#333">使用者：第一個怎麼去？</text>
<line x1="210" y1="227" x2="650" y2="227" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<line x1="230" y1="160" x2="680" y2="198" stroke="#4caf50" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow2)"/>
<text x="500" y="185" text-anchor="middle" font-size="12" fill="#2e7d32">連同歷史送出</text>
<rect x="650" y="200" width="190" height="55" rx="10" fill="#fff3e0" stroke="#ffb74d"/>
<text x="745" y="233" text-anchor="middle" font-size="13" fill="#333">AI：淺草站，銀座線</text>
</svg>
</figure>

對應這個資料夾裡的 `chat.js`：

```bash
node chat.js
```

依序輸入「推薦三個東京景點」、「那第一個要怎麼去」，這次 `history` 一直在累積，AI 答得出來。

## 第三層：Agent——不只回答，還會自己動手做事

再加一樣東西：工具（tools）。AI 不再只吐文字，而是自己判斷「這件事需要用工具才能完成」，然後呼叫對應的函式。

```js
const result = await ai("幫我查一下禮拜五東京的天氣", {
  tools: [checkWeather, addCalendarReminder],
})
// AI 內部自己想：
//   1. 先呼叫 checkWeather({ city: "東京", date: "禮拜五" }) 查天氣
//   2. 判斷會下雨
//   3. 回報結果，並提醒使用者帶傘

console.log(result)
// "禮拜五東京有陣雨、氣溫 24°C，記得帶傘。"
```

跟第二層的差別：第二層的 AI 只能「講」，第三層的 AI 可以「做」——它自己決定要不要用工具、用哪個、用幾次，你只需要把工具準備好交給它。

<figure>
<svg viewBox="0 0 920 150" role="img" aria-label="示意圖：AI 決定呼叫工具，程式執行後把結果回報給 AI，AI 才生成最終回覆" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
<title>第三層示意圖：Agent 自己決定並呼叫工具</title>
<defs>
<marker id="arrow3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#666"/></marker>
</defs>
<rect x="0" y="0" width="920" height="150" fill="#fafafa" rx="12"/>
<rect x="15" y="45" width="160" height="55" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="95" y="78" text-anchor="middle" font-size="13" fill="#333">使用者：查天氣</text>
<line x1="175" y1="72" x2="200" y2="72" stroke="#666" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="200" y="45" width="160" height="55" rx="10" fill="#fff3e0" stroke="#ffb74d"/>
<text x="280" y="78" text-anchor="middle" font-size="13" fill="#333">AI：需要工具</text>
<line x1="360" y1="72" x2="385" y2="72" stroke="#666" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="385" y="45" width="160" height="55" rx="10" fill="#e8f5e9" stroke="#66bb6a"/>
<text x="465" y="78" text-anchor="middle" font-size="13" fill="#2e7d32">checkWeather()</text>
<line x1="545" y1="72" x2="570" y2="72" stroke="#666" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="570" y="45" width="160" height="55" rx="10" fill="#e8f5e9" stroke="#66bb6a"/>
<text x="650" y="78" text-anchor="middle" font-size="13" fill="#2e7d32">結果：陣雨 24°C</text>
<line x1="730" y1="72" x2="755" y2="72" stroke="#666" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="755" y="45" width="150" height="55" rx="10" fill="#fff3e0" stroke="#ffb74d"/>
<text x="830" y="78" text-anchor="middle" font-size="13" fill="#333">AI：記得帶傘</text>
</svg>
</figure>

對應這個資料夾裡的 `agent-tools.js`（簡化版：先問 AI 要呼叫哪個工具、程式收到決定才真的執行，再把工具結果拿回去換一句自然語言回覆）：

```bash
node agent-tools.js "幫我查一下禮拜五東京的天氣"
```

## 第四層：多角色協作——兩個 AI 輪流講話，互相把關

單一 agent 換成兩個各自扮演角色的 agent，輪流發言，每輪都把目前為止的討論整包帶給下一位——這樣後面發言的角色才看得到前面說過什麼。

```js
let discussion = "客戶需求：東京三天兩夜，行程盡量排滿但不要太趕。"

for (let round = 0; round < 4; round++) {
  const plannerSays = await ai(`${discussion}\n你是行程規劃師，提出一版行程。`)
  discussion += `\n規劃師：${plannerSays}`

  const checkerSays = await ai(`${discussion}\n你是行程把關者，檢查時間會不會太趕，太趕就指出要拿掉哪個行程。`)
  discussion += `\n把關者：${checkerSays}`

  if (checkerSays.includes("時間允許")) break
}
```

「規劃師」先提一版行程，「把關者」檢查時間會不會太趕、太趕就點名要拿掉哪個景點或調整順序；兩人來回幾輪，直到把關者說「時間允許」為止。跟第三層的差別：第三層是一個 AI 自己決定要不要用工具；第四層是**兩個 AI 用對話互相修正對方**。

<figure>
<svg viewBox="0 0 700 320" role="img" aria-label="示意圖：規劃師與把關者輪流發言，直到把關者確認時間允許才結束" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
<title>第四層示意圖：兩個角色輪流對話、互相修正</title>
<defs>
<marker id="arrow4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#666"/></marker>
</defs>
<rect x="0" y="0" width="700" height="320" fill="#fafafa" rx="12"/>
<circle cx="180" cy="120" r="70" fill="#ede7f6" stroke="#9575cd"/>
<text x="180" y="115" text-anchor="middle" font-size="14" fill="#4527a0">規劃師</text>
<text x="180" y="135" text-anchor="middle" font-size="11" fill="#4527a0">（提案行程）</text>
<circle cx="520" cy="120" r="70" fill="#fff3e0" stroke="#ffb74d"/>
<text x="520" y="115" text-anchor="middle" font-size="14" fill="#e65100">把關者</text>
<text x="520" y="135" text-anchor="middle" font-size="11" fill="#e65100">（檢查太趕嗎）</text>
<path d="M250,90 Q350,40 450,90" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow4)"/>
<text x="350" y="55" text-anchor="middle" font-size="12" fill="#555">行程提案</text>
<path d="M450,150 Q350,205 250,150" stroke="#666" stroke-width="2" fill="none" stroke-dasharray="5,5" marker-end="url(#arrow4)"/>
<text x="350" y="222" text-anchor="middle" font-size="12" fill="#555">太趕，拿掉一個景點（重來一輪）</text>
<line x1="520" y1="190" x2="520" y2="248" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow4)"/>
<rect x="420" y="252" width="200" height="45" rx="10" fill="#e8f5e9" stroke="#66bb6a"/>
<text x="520" y="279" text-anchor="middle" font-size="13" fill="#2e7d32">時間允許 → 結束</text>
</svg>
</figure>

對應這個資料夾裡的 `team.js`：

```bash
node team.js "客戶需求：東京三天兩夜，行程盡量排滿但不要太趕"
```

## 第五層：Workflow——把步驟寫死，變成固定流程

跟第四層不一樣的地方：多角色協作是「你一言我一語，走到哪算哪」，是即興的；Workflow 是**先把整套步驟定死**（像生產線），每一步做什麼、順序是什麼都寫在流程定義裡，上一步的輸出直接餵給下一步當輸入。

```js
const workflow = [
  { name: "查天氣", run: (ctx) => ai(`查「${ctx.city}」${ctx.date}的天氣`, { tools: [checkWeather] }) },
  { name: "查開放時間", run: (ctx, prev) => ai(`已知天氣「${prev}」，查主要景點的開放時間`, { tools: [checkOpeningHours] }) },
  { name: "排行程", run: (ctx, prev) => ai(`依照天氣與開放時間「${prev}」，排一份三天兩夜的行程表`) },
  { name: "寫提醒信", run: (ctx, prev) => ai(`把這份行程「${prev}」整理成一封提醒信，內容包含建議帶的物品`) },
]

let output = null
for (const step of workflow) {
  output = await step.run({ city: "東京", date: "禮拜五" }, output)
  console.log(`【${step.name}】完成`)
}
```

固定跑「查天氣 → 查開放時間 → 排行程 → 寫提醒信」四步，每一步都吃上一步的產出。跟第四層的差別：第四層沒有固定終點，靠角色對話「聊」出結果；第五層**路徑是死的**，適合已經想清楚、每次流程都一樣的重複性工作。

<figure>
<svg viewBox="0 0 900 140" role="img" aria-label="示意圖：四個步驟排成固定順序的直線流程，上一步輸出接下一步輸入" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
<title>第五層示意圖：Workflow，固定順序的直線流程</title>
<defs>
<marker id="arrow5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#666"/></marker>
</defs>
<rect x="0" y="0" width="900" height="140" fill="#fafafa" rx="12"/>
<rect x="20" y="40" width="180" height="60" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="110" y="75" text-anchor="middle" font-size="14" fill="#333">① 查天氣</text>
<line x1="200" y1="70" x2="230" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<rect x="230" y="40" width="180" height="60" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="320" y="75" text-anchor="middle" font-size="14" fill="#333">② 查開放時間</text>
<line x1="410" y1="70" x2="440" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<rect x="440" y="40" width="180" height="60" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="530" y="75" text-anchor="middle" font-size="14" fill="#333">③ 排行程</text>
<line x1="620" y1="70" x2="650" y2="70" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<rect x="650" y="40" width="180" height="60" rx="10" fill="#e3f2fd" stroke="#64b5f6"/>
<text x="740" y="75" text-anchor="middle" font-size="14" fill="#333">④ 寫提醒信</text>
</svg>
</figure>

對應這個資料夾裡的 `workflow.js`（前兩步用假資料模擬查詢 API，後兩步真的呼叫 AI）：

```bash
node workflow.js "東京" "禮拜五"
```

## 第六層：Workflows——同時開很多張票，平行分工處理

規模再大一點，常常不是只服務一位客人，而是**同時有一批工作要處理**——這時候會先「開票」，把每一份工作拆成一張票，多個 worker 平行認領處理。

```js
const tickets = await pm.listTickets({ status: "todo" })
// 例如：10 位客人，各自的東京行程需求

await Promise.all(
  tickets.map(async (ticket) => {
    await pm.setStatus(ticket.id, "in_progress")

    // 每張票各自完整跑一次第五層的 workflow
    let output = ticket.request
    for (const step of workflow) {
      output = await step.run(ticket, output)
    }

    await pm.setStatus(ticket.id, "done")
  })
)
```

10 位客人的需求同時開成 10 張票，`Promise.all` 讓它們平行處理，彼此不互相等待——不是「一組一組排隊做」，而是「同時開工」。跟第五層的差別：第五層是**一份工作內部的固定步驟**；第六層是**很多份工作之間怎麼分配、怎麼平行跑**，兩者可以疊在一起用（每張票內部照樣走第五層的固定流程）。

<figure>
<svg viewBox="0 0 800 270" role="img" aria-label="示意圖：三張票同時平行跑，每張票內部各自完整走一次第五層的四步驟" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
<title>第六層示意圖：多張票平行分工，每張票內部走固定流程</title>
<defs>
<marker id="arrow6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#666"/></marker>
</defs>
<rect x="0" y="0" width="800" height="270" fill="#fafafa" rx="12"/>
<text x="400" y="15" text-anchor="middle" font-size="13" fill="#888">同時開工（Promise.all）</text>

<text x="15" y="62" font-size="12" fill="#333">票 A</text>
<rect x="100" y="35" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="170" y="62" text-anchor="middle" font-size="12" fill="#333">①查天氣</text>
<line x1="240" y1="57" x2="260" y2="57" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="260" y="35" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="330" y="62" text-anchor="middle" font-size="12" fill="#333">②開放時間</text>
<line x1="400" y1="57" x2="420" y2="57" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="420" y="35" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="490" y="62" text-anchor="middle" font-size="12" fill="#333">③排行程</text>
<line x1="560" y1="57" x2="580" y2="57" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="580" y="35" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="650" y="62" text-anchor="middle" font-size="12" fill="#333">④提醒信</text>

<text x="15" y="152" font-size="12" fill="#333">票 B</text>
<rect x="100" y="125" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="170" y="152" text-anchor="middle" font-size="12" fill="#333">①查天氣</text>
<line x1="240" y1="147" x2="260" y2="147" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="260" y="125" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="330" y="152" text-anchor="middle" font-size="12" fill="#333">②開放時間</text>
<line x1="400" y1="147" x2="420" y2="147" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="420" y="125" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="490" y="152" text-anchor="middle" font-size="12" fill="#333">③排行程</text>
<line x1="560" y1="147" x2="580" y2="147" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="580" y="125" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="650" y="152" text-anchor="middle" font-size="12" fill="#333">④提醒信</text>

<text x="15" y="242" font-size="12" fill="#333">票 C</text>
<rect x="100" y="215" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="170" y="242" text-anchor="middle" font-size="12" fill="#333">①查天氣</text>
<line x1="240" y1="237" x2="260" y2="237" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="260" y="215" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="330" y="242" text-anchor="middle" font-size="12" fill="#333">②開放時間</text>
<line x1="400" y1="237" x2="420" y2="237" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="420" y="215" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="490" y="242" text-anchor="middle" font-size="12" fill="#333">③排行程</text>
<line x1="560" y1="237" x2="580" y2="237" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="580" y="215" width="140" height="45" rx="8" fill="#e3f2fd" stroke="#64b5f6"/><text x="650" y="242" text-anchor="middle" font-size="12" fill="#333">④提醒信</text>
</svg>
</figure>

對應這個資料夾裡的 `workflows.js`：用一個寫死的陣列假裝三張票（不用真的 PM 系統），每張票各自跑一次第五層的四步驟，`Promise.all` 讓它們平行處理：

```bash
node workflows.js
```

跑起來會看到三張票的 log 交錯出現，不是票 A 全部做完才輪到票 B——這就是「平行」跟「排隊」的差別。

`workflows.js` 用寫死的陣列假裝票務系統，真實世界已經有現成的正式對應：**Claude Code 內建的 `Workflow` 工具**——本質上就是這段 pseudo code 的正式版，`agent()` 對應這裡的 `ai()`，`pipeline()` 對應「上一步輸出接下一步輸入」，`parallel()` 對應多張票同時跑。差別是它把 review／驗證這類「懷疑自己」的步驟也內建成標準寫法（獨立 agent 反駁、多數決才算過）。

## 小結：六層疊加表

| 層級 | 新增的能力 | 例子裡多了什麼 | Demo |
| :--- | :--- | :--- | :--- |
| 1. 單次問答 | 無 | 問完就忘，答不出「第一個」是誰 | `qa.js` |
| 2. 多輪對話 | 記憶（history） | 記得上一句提過淺草寺 | `chat.js` |
| 3. Agent | 工具呼叫 | 自己查天氣、自己加提醒 | `agent-tools.js` |
| 4. 多角色協作 | 角色間對話、互相修正 | 規劃師提案、把關者砍太趕的行程 | `team.js` |
| 5. Workflow | 固定步驟串接 | 查天氣→查開放時間→排行程→寫提醒信 | `workflow.js` |
| 6. Workflows | 多份工作平行分工 | 3 張票（3 個城市）同時開工 | `workflows.js` |

每一層都是在前一層的基礎上加一件事，不是推翻重來——真正在用的系統，往往是把這六層疊在一起：一個開了很多票的 workflows 系統，每張票內部走固定 workflow，某幾步又是由多角色協作或單一 agent 完成的。

## 一個重要提醒：這幾支 demo 到底哪裡是真的？

`GEMINI_API_KEY` 打的是真的 Gemini API，AI「想」的那一步是真的；假的只有「工具」本身——`checkWeather()`、`checkOpeningHours()` 是我們自己寫死回傳假資料，沒有真的去問氣象局。換句話說：**AI 的大腦是真的，手腳（跟外部世界打交道的動作）是假的**，換成真的 API 其他程式碼完全不用改。

也因此 AI 沒辦法分辨工具回報是真的查出來的、還是寫死的——不管哪一種，AI 看到的都只是同一句文字，只能照單全收。查證資料真假的責任在寫程式的人身上，不在 AI 身上。
