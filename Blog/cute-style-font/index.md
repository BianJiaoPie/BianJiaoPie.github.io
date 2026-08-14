---
layout: page/blog/blog
title: "字型搭配筆記：同一個版型的四種設計風格"
date: 2026-08-14
last_modified_at: 2026-08-14
section: tech
categories: [學習筆記, 前端設計]
tags: [CSS, 字型, Vanilla JavaScript, Vue 3, React]
description: 在同一張活動卡片上切換優雅、甜美、自然、帥氣四種字型，並即時比較 Vanilla、Vue 3、React 的實作程式碼。
author:
  name: Fung
  url: https://BianJiaoPie.com
---

同一段文案，換一套字型就像換了一種說話方式。襯線體比較優雅，圓體甜美，手寫體自然，粗黑窄體則顯得帥氣。與其逐一看靜態範例，不如直接在同一張卡片上比較。

下面的版型、顏色和內容都不會改變。先切換「字型風格」觀察畫面，再切換 Vanilla、Vue 3、React，看看三種寫法如何控制同一個結果。右側程式碼會跟著選項同步更新。

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Bebas+Neue&family=Caveat:wght@600;700&family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap" rel="stylesheet">

<section class="type-lab" id="type-lab" data-mood="sweet">
  <div class="type-lab__toolbar">
    <div class="type-lab__control">
      <span>字型風格</span>
      <div class="type-lab__buttons" role="group" aria-label="選擇字型風格">
        <button type="button" data-mood="elegant">優雅</button>
        <button type="button" data-mood="sweet" aria-pressed="true">甜美</button>
        <button type="button" data-mood="natural">自然</button>
        <button type="button" data-mood="cool">帥氣</button>
      </div>
    </div>
    <div class="type-lab__control">
      <span>實作方式</span>
      <div class="type-lab__buttons" role="group" aria-label="選擇實作方式">
        <button type="button" data-framework="vanilla" aria-pressed="true">Vanilla</button>
        <button type="button" data-framework="vue">Vue 3</button>
        <button type="button" data-framework="react">React</button>
      </div>
    </div>
  </div>

  <div class="type-lab__workspace">
    <div class="type-lab__preview">
      <p class="type-lab__label">PREVIEW</p>
      <article class="event-card">
        <span class="event-card__eyebrow">WEEKEND WORKSHOP</span>
        <div class="event-card__flower" aria-hidden="true">✿</div>
        <h2 class="event-card__title">Little<br>Happy Things</h2>
        <p class="event-card__description">一起做甜點、畫小卡，收集週末裡讓人開心的小事。</p>
        <div class="event-card__details">
          <span>08.23 SAT</span>
          <span>14:00–16:30</span>
        </div>
        <span class="event-card__action">JOIN THE DAY</span>
      </article>
      <p class="type-lab__observation" aria-live="polite"></p>
    </div>

    <div class="type-lab__code-panel">
      <div class="type-lab__code-header">
        <span aria-hidden="true"><i></i><i></i><i></i></span>
        <strong class="type-lab__filename">font-demo.js</strong>
      </div>
      <pre><code class="type-lab__code"></code></pre>
    </div>
  </div>
</section>

<style>
  .type-lab {
    --display-font: "Baloo 2", "Arial Rounded MT Bold", sans-serif;
    --accent-font: "Baloo 2", sans-serif;
    --title-weight: 800;
    --title-spacing: 0;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #ead6dc;
    border-radius: 1.5rem;
    background: #fffafc;
    color: #51363f;
  }

  .type-lab[data-mood="elegant"] {
    --display-font: "Cormorant Garamond", Georgia, serif;
    --accent-font: Georgia, serif;
    --title-weight: 600;
    --title-spacing: 0.01em;
  }

  .type-lab[data-mood="natural"] {
    --display-font: "Caveat", cursive;
    --accent-font: "Trebuchet MS", sans-serif;
    --title-weight: 700;
    --title-spacing: 0.01em;
  }

  .type-lab[data-mood="cool"] {
    --display-font: "Bebas Neue", Impact, sans-serif;
    --accent-font: "Bebas Neue", Impact, sans-serif;
    --title-weight: 400;
    --title-spacing: 0.05em;
  }

  .type-lab__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .type-lab__control > span,
  .type-lab__label {
    display: block;
    margin-bottom: 0.4rem;
    color: #8c6974;
    font: 700 0.72rem system-ui, sans-serif;
    letter-spacing: 0.12em;
  }

  .type-lab__buttons { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .type-lab button {
    padding: 0.45rem 0.75rem;
    border: 1px solid #d989a0;
    border-radius: 999px;
    background: #fff;
    color: #684752;
    font: 700 0.8rem system-ui, sans-serif;
    cursor: pointer;
  }

  .type-lab button[aria-pressed="true"] { background: #d95f85; color: #fff; }

  .type-lab__workspace {
    display: grid;
    grid-template-columns: minmax(16rem, 0.9fr) minmax(20rem, 1.1fr);
    gap: 1rem;
    align-items: stretch;
  }

  .type-lab__preview,
  .type-lab__code-panel { min-width: 0; }

  .type-lab__preview {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 1rem;
    background: #f8edf1;
  }

  .event-card {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-height: 27rem;
    margin: auto;
    padding: 2.8rem 1.25rem 1.5rem;
    overflow: hidden;
    border: 2px solid #d95f85;
    border-radius: 2rem 2rem 6rem 2rem;
    background: #fff5c7;
    text-align: center;
    box-shadow: 7px 7px 0 #f4b5c7;
  }

  .event-card::before,
  .event-card::after {
    position: absolute;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background: #f7c6d3;
    content: "";
  }

  .event-card::before { top: -5rem; left: -3rem; }
  .event-card::after { right: -4rem; bottom: -4rem; }

  .event-card__eyebrow,
  .event-card__details,
  .event-card__action {
    font-family: var(--accent-font);
    letter-spacing: 0.14em;
  }

  .event-card__eyebrow { font-size: 0.72rem; }
  .event-card__flower { margin: 0.6rem 0 0.2rem; color: #d95f85; font-size: 1.6rem; }

  .event-card__title {
    margin: 0;
    font-family: var(--display-font);
    font-size: clamp(3.4rem, 7vw, 5rem);
    font-weight: var(--title-weight);
    line-height: 0.78;
    letter-spacing: var(--title-spacing);
  }

  .event-card__description {
    max-width: 18rem;
    margin: 1.5rem auto 1rem;
    font-family: system-ui, -apple-system, "Noto Sans TC", sans-serif;
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .event-card__details {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
    font-size: 0.7rem;
  }

  .event-card__action {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0.65rem 0.9rem;
    border-radius: 999px;
    background: #d95f85;
    color: #fff;
    font-size: 0.75rem;
  }

  .type-lab__observation {
    min-height: 3.5rem;
    margin: 1rem 0 0;
    color: #684752;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .type-lab__code-panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 1rem;
    background: #202027;
  }

  .type-lab__code-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.75rem 1rem;
    background: #30303a;
    color: #d9d9e2;
    font: 0.75rem ui-monospace, monospace;
  }

  .type-lab__code-header span { display: flex; gap: 0.3rem; }
  .type-lab__code-header i { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: #ff748c; }
  .type-lab__code-header i:nth-child(2) { background: #ffd166; }
  .type-lab__code-header i:nth-child(3) { background: #72d69c; }

  .type-lab__code-panel pre {
    flex: 1;
    max-height: 39rem;
    margin: 0;
    padding: 1.2rem;
    overflow: auto;
    background: transparent;
    color: #f1edf4;
    font-size: 0.78rem;
    line-height: 1.65;
    white-space: pre;
  }

  .type-lab__code-panel code { background: transparent; color: inherit; }

  @media (max-width: 760px) {
    .type-lab__workspace { grid-template-columns: 1fr; }
    .type-lab__code-panel pre { max-height: 28rem; }
  }
</style>

<script>
  (() => {
    const lab = document.querySelector("#type-lab")
    if (!lab) return

    const fontStyles = {
      elegant: {
        label: "優雅",
        note: "襯線的粗細對比配上較輕字重，讓同一張卡片更像精緻的邀請函。",
        css: `.type-lab[data-mood="elegant"] {
  --display-font: "Cormorant Garamond", Georgia, serif;
  --accent-font: Georgia, serif;
  --title-weight: 600;
  --title-spacing: 0.01em;
}`,
      },
      sweet: {
        label: "甜美",
        note: "圓潤輪廓搭配粗字重，像糖果包裝一樣親切，也是最直接的可愛風。",
        css: `.type-lab[data-mood="sweet"] {
  --display-font: "Baloo 2", "Arial Rounded MT Bold", sans-serif;
  --accent-font: "Baloo 2", sans-serif;
  --title-weight: 800;
  --title-spacing: 0;
}`,
      },
      natural: {
        label: "自然",
        note: "手寫線條保留不規則的節奏，少了一點精準，多了一點輕鬆與人味。",
        css: `.type-lab[data-mood="natural"] {
  --display-font: "Caveat", cursive;
  --accent-font: "Trebuchet MS", sans-serif;
  --title-weight: 700;
  --title-spacing: 0.01em;
}`,
      },
      cool: {
        label: "帥氣",
        note: "窄長的大寫字型配上寬字距，版面立刻變得俐落，視覺衝擊也更強。",
        css: `.type-lab[data-mood="cool"] {
  --display-font: "Bebas Neue", Impact, sans-serif;
  --accent-font: "Bebas Neue", Impact, sans-serif;
  --title-weight: 400;
  --title-spacing: 0.05em;
}`,
      },
    }

    const frameworkCode = {
      vanilla: `const lab = document.querySelector("#type-lab")

lab.querySelectorAll("[data-mood]").forEach((button) => {
  button.addEventListener("click", () => {
    lab.dataset.mood = button.dataset.mood
  })
})`,
      vue: `<script setup>
import { ref } from "vue"

const mood = ref("sweet")
const moods = ["elegant", "sweet", "natural", "cool"]
<\/script>

<template>
  <section class="type-lab" :data-mood="mood">
    <button
      v-for="item in moods"
      :key="item"
      @click="mood = item"
    >
      <span v-text="item" />
    </button>
    <EventCard />
  </section>
</template>`,
      react: `import { useState } from "react"

const moods = ["elegant", "sweet", "natural", "cool"]

export default function TypeLab() {
  const [mood, setMood] = useState("sweet")

  return (
    <section className="type-lab" data-mood={mood}>
      {moods.map((item) => (
        <button key={item} onClick={() => setMood(item)}>
          {item}
        </button>
      ))}
      <EventCard />
    </section>
  )
}`,
    }

    const filenames = {
      vanilla: "font-demo.js",
      vue: "FontDemo.vue",
      react: "FontDemo.jsx",
    }

    const code = lab.querySelector(".type-lab__code")
    const filename = lab.querySelector(".type-lab__filename")
    const observation = lab.querySelector(".type-lab__observation")
    let framework = "vanilla"
    let mood = "sweet"

    function render() {
      lab.dataset.mood = mood
      filename.textContent = filenames[framework]
      observation.innerHTML = `<strong>${fontStyles[mood].label}：</strong>${fontStyles[mood].note}`
      code.textContent = `${fontStyles[mood].css}\n\n${frameworkCode[framework]}`
    }

    lab.querySelectorAll("[data-framework]").forEach((button) => {
      button.addEventListener("click", () => {
        framework = button.dataset.framework
        lab.querySelectorAll("[data-framework]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button))
        })
        render()
      })
    })

    lab.querySelectorAll("button[data-mood]").forEach((button) => {
      button.addEventListener("click", () => {
        mood = button.dataset.mood
        lab.querySelectorAll("button[data-mood]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button))
        })
        render()
      })
    })

    render()
  })()
</script>

## 我從切換中看到什麼？

甜美風不只是換成圓體，還要讓標題有足夠的字重，輪廓才會像圖形一樣飽滿。優雅風反而需要降低字重，保留襯線體的粗細變化。自然風依靠手寫字的不規則感；帥氣風則利用窄字、大寫和字距建立節奏。

四種版本都只替換 CSS 變數，卡片本身不需要複製。Vanilla、Vue 3 和 React 的差別，也只是如何保存 `mood` 這個狀態；真正決定視覺性格的仍然是 CSS。

這次最值得記住的不是某一套字型名稱，而是：**先決定文字要用什麼語氣說話，再選擇字型、字重與字距。標題負責表現性格，長篇內文則繼續以清楚好讀為優先。**
