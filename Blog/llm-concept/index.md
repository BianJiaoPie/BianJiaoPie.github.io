---
layout: page/blog/blog
title: "LLM Agent 概念：從基礎問答到多角色協作"
date: 2026-07-22
section: tech
---

五個層級的 pseudo code，展示從「單純問答」到「會做事的 agent」、「多個角色互相協作」、「固定流程的 workflow」，再到「開票分工的 workflows」的演進。第三、四層有真的可以跑的程式（`team.js`、`workflow.js`），第五層純概念示意，實際實作參考 `Skill(agent-claude-bot)`。

## 1. 基礎：單純問答

一來一回，沒有記憶、沒有動作，純粹「問 → 答」。

```js
const response = await claude("hi 你是誰")
console.log(response)
// "我是AI"
```

對應這個資料夾裡的 `llm.js`：`node llm.js "hi"`。

## 2. Agent：不只回答，還會做事

多了「工具」（tools）——claude 不是只吐文字，還能實際呼叫函式（寫檔案、跑指令…），自己決定要不要用、用幾次。

```js
const result = await claude("寫一篇文章並存檔", {
  tools: [writeFile, readFile /* ... */],
})
// claude 內部自己決定：先想文章內容 → 判斷需要存檔 → 呼叫 writeFile 工具 → 回報完成
console.log(result)
// "已將文章存到 article.md"
```

跟第 1 層的差別：第 1 層的輸出只是文字；第 2 層的輸出可能是「文字＋一連串工具呼叫造成的副作用」。

## 3. Agent Teams：多角色輪流協作

單一 agent 換成兩個各自扮演角色、輪流發言的 agent，每輪都把目前為止的對話 history 整包帶給下一個角色——這樣後面發言的角色才看得到前面說過什麼。

```js
let history = ""

while (true) {
  const writerReply = await claude(`歷史對話：${history}\n你是作家，說出你的想法`)
  history += `作家說：${writerReply}`

  const editorReply = await claude(`歷史對話：${history}\n你是編輯，要從讀者角度說要怎麼改`)
  history += `編輯說：${editorReply}`
}
```

真正可執行的版本在 `team.js`（`while(true)` 換成有限輪數，避免無止盡打 API 燒 quota）：

```bash
node team.js "主題" [輪數]
```

每輪印出當前角色（作家／編輯）的發言，並把它累加進 history 傳給下一輪。

## 4. Workflow：定義一連串的動作

跟第 3 層不一樣的地方：Agent Teams 是「角色輪流講話、講到你手動停下來」，走向是即興的；Workflow 是**先把步驟定死**（像 pipeline），每一步做什麼、順序是什麼都寫在流程定義裡，跑起來是固定路徑，不是角色間的自由對話。上一步的輸出直接餵給下一步當輸入。

```js
const workflow = [
  { name: "大綱", prompt: (topic) => `幫「${topic}」列一個大綱` },
  { name: "草稿", prompt: (topic, prev) => `依照這個大綱寫一段草稿：\n${prev}` },
  { name: "潤稿", prompt: (topic, prev) => `潤飾這篇草稿，讓它更好讀：\n${prev}` },
]

let result = topic
for (const step of workflow) {
  result = await claude(step.prompt(topic, result))
  console.log(`【${step.name}】`, result)
}
```

真正可執行的版本在 `workflow.js`：

```bash
node workflow.js "主題"
```

固定跑「大綱 → 草稿 → 潤稿」三步，每步的輸出接下一步的輸入，最後印出潤稿完成的成品。

## 5. Workflows：開票、多條 workflow 平行跑

規模再大一點的 workflow 常常會先「開 ticket」——把工作拆成一張一張票，每張票各自走「規劃 → 閱讀 code → implement → test → review → commit」，可以多個 worker 平行處理不同票。這層只給概念示意，沒有真的可執行檔案。

```js
const tickets = await pm.listTickets({ status: "todo" })

for (const ticket of tickets) {
  await pm.setStatus(ticket.id, "in_progress")

  const plan = await claude(`規劃怎麼做這張票：${ticket.doc}`)
  const context = await claude(`讀這些檔案，理解現有寫法：${plan.filesToRead}`)
  const diff = await claude(
    `依照規劃實作：${plan}\n\n現有程式碼：${context}`,
    { tools: [readFile, writeFile, runShell] }
  )

  await pm.setStatus(ticket.id, "testing")
  const testResult = await runTests()
  if (!testResult.pass) {
    await pm.setStatus(ticket.id, "debugging")
    continue // 換下一張票，這張之後再處理
  }

  await claude(`review 這個 diff，format + lint 過再定稿：${diff}`, { tools: [runShell] })
  await claude(`把改動 commit 起來，寫一句符合這張票的 commit message：${diff}`, { tools: [runShell] })
  await pm.setStatus(ticket.id, "review") // 交給人審
}
```

這層沒有自己寫的可執行檔案——真實世界已經有現成的兩種對應：

- **Claude Code 內建的 `Workflow` 工具**：本質上就是這段 pseudo code 的正式版，`agent()` 對應這裡的 `claude()`，`pipeline()` 對應「上一步輸出接下一步輸入」，`parallel()` 對應多張票同時跑。差別是它把 review／驗證這類「懷疑自己」的步驟也內建成標準寫法（獨立 agent 反駁、多數決才算過）。
- **`Skill(agent-claude-bot)`**：規模更大、要真的碰 git worktree／PM 系統時的實作——orchestrator 開 N 個 worker 平行跑，每個 worker 在自己的 git worktree 裡完整走一次「讀 ticket doc（真正的 spec）→ 實作 → test/format/lint → commit → merge 回 story 分支」，ticket 狀態全部記在 LatticeCast PM 裡，單張票有 900 秒逾時上限，太大會被判要拆票。
