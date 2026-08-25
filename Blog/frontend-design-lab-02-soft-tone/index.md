---
layout: page/blog/blog
title: "前端設計實驗室 02｜如何把不同顏色統一成柔和色調？"
date: 2026-08-25
last_modified_at: 2026-08-25
section: tech
categories: [學習筆記, 前端設計]
tags: [CSS, 配色, 色調, Vanilla JavaScript, Vue 3, React]
description: 在同一張卡片上比較原始、粉色、淺色與柔和色調，觀察如何用相近的明度和彩度統一配色。
series: frontend-design-lab
series_title: 前端設計實驗室
series_order: 2
article_type: lab
source_pages: [148, 149, 150, 151, 152, 153, 157, 158]
tracks: [cute]
author:
  name: Fung
  url: https://BianJiaoPie.com
---

> [前端設計實驗室]({{ '/Blog/frontend-design-lab/' | relative_url }}) · 技巧篇 02

顏色各自好看，放在一起卻不一定協調。問題通常不在色相太多，而是明度和彩度相差太遠，讓每個顏色都在搶注意力。

下面固定字型、排版和內容，只切換配色。先比較未統一版本，再觀察粉色調、淺色調與柔和色調如何讓不同色相看起來像同一家族。

頁面本身由 Vanilla JavaScript 執行；Vue 3 與 React 頁籤顯示的是相同互動的核心寫法。

<section class="tone-lab" id="tone-lab" data-tone="soft">
  <div class="tone-lab__toolbar">
    <div class="tone-lab__control">
      <span>配色狀態</span>
      <div class="tone-lab__buttons" role="group" aria-label="選擇配色狀態">
        <button type="button" data-tone-option="raw" aria-pressed="false">未統一</button>
        <button type="button" data-tone-option="pale" aria-pressed="false">粉色調</button>
        <button type="button" data-tone-option="light" aria-pressed="false">淺色調</button>
        <button type="button" data-tone-option="soft" aria-pressed="true">柔和色調</button>
      </div>
    </div>
    <div class="tone-lab__control">
      <span>實作方式</span>
      <div class="tone-lab__buttons" role="group" aria-label="選擇實作方式">
        <button type="button" data-framework="vanilla" aria-pressed="true">Vanilla</button>
        <button type="button" data-framework="vue" aria-pressed="false">Vue 3</button>
        <button type="button" data-framework="react" aria-pressed="false">React</button>
      </div>
    </div>
  </div>

  <div class="tone-lab__workspace">
    <div class="tone-lab__preview">
      <p class="tone-lab__label">PREVIEW</p>
      <article class="market-card">
        <span class="market-card__eyebrow">WEEKEND MARKET</span>
        <span class="market-card__sun" aria-hidden="true"></span>
        <span class="market-card__leaf" aria-hidden="true"></span>
        <h2 class="market-card__title">Quiet<br>Sunday</h2>
        <p class="market-card__description">花、甜點與手作小物，陪你慢慢度過午後。</p>
        <div class="market-card__details">
          <span>09.06 SUN</span>
          <span>13:00–18:00</span>
        </div>
        <span class="market-card__action">COME SAY HELLO</span>
      </article>
      <div class="tone-lab__palette" aria-label="目前配色的三種角色">
        <span><i class="tone-lab__swatch--base" aria-hidden="true"></i>主色</span>
        <span><i class="tone-lab__swatch--sub" aria-hidden="true"></i>輔助色</span>
        <span><i class="tone-lab__swatch--accent" aria-hidden="true"></i>強調色</span>
      </div>
      <p class="tone-lab__observation" aria-live="polite"></p>
    </div>

    <div class="tone-lab__code-panel">
      <div class="tone-lab__code-header">
        <span aria-hidden="true"><i></i><i></i><i></i></span>
        <strong class="tone-lab__filename">tone-demo.js</strong>
      </div>
      <pre><code class="tone-lab__code"></code></pre>
    </div>
  </div>
</section>

<style>
  .tone-lab {
    --page: #ede9e4;
    --surface: #fbf7f1;
    --base: #d598a5;
    --sub: #9fbba6;
    --accent: #91abc1;
    --ink: #514b51;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #ded5d2;
    border-radius: 1.5rem;
    background: #faf7f5;
    color: #514b51;
  }

  .tone-lab[data-tone="raw"] {
    --page: #efedf2;
    --surface: #fffaf6;
    --base: #ff5364;
    --sub: #00afd0;
    --accent: #6047e8;
    --ink: #291c55;
  }

  .tone-lab[data-tone="pale"] {
    --page: #f8eff2;
    --surface: #fffaf8;
    --base: #f3cbd4;
    --sub: #cee5d4;
    --accent: #c9d7ef;
    --ink: #76666c;
  }

  .tone-lab[data-tone="light"] {
    --page: #f6f2ec;
    --surface: #fffdf9;
    --base: #efb5c4;
    --sub: #b9ddc7;
    --accent: #abcde5;
    --ink: #655b62;
  }

  .tone-lab[data-tone="soft"] {
    --page: #ede9e4;
    --surface: #fbf7f1;
    --base: #d598a5;
    --sub: #9fbba6;
    --accent: #91abc1;
    --ink: #514b51;
  }

  .tone-lab__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .tone-lab__control > span,
  .tone-lab__label {
    display: block;
    margin-bottom: 0.4rem;
    color: #817278;
    font: 700 0.72rem system-ui, sans-serif;
    letter-spacing: 0.12em;
  }

  .tone-lab__buttons { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .tone-lab button {
    padding: 0.45rem 0.75rem;
    border: 1px solid #b98e99;
    border-radius: 999px;
    background: #fff;
    color: #63545a;
    font: 700 0.8rem system-ui, sans-serif;
    cursor: pointer;
  }

  .tone-lab button[aria-pressed="true"] { background: #8e6873; color: #fff; }

  .tone-lab__workspace {
    display: grid;
    grid-template-columns: minmax(16rem, 0.9fr) minmax(20rem, 1.1fr);
    gap: 1rem;
    align-items: stretch;
  }

  .tone-lab__preview,
  .tone-lab__code-panel { min-width: 0; }

  .tone-lab__preview {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 1rem;
    background: var(--page);
    transition: background 180ms ease;
  }

  .market-card {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-height: 27rem;
    margin: auto;
    padding: 3.2rem 1.3rem 1.5rem;
    overflow: hidden;
    border: 2px solid var(--ink);
    border-radius: 1.2rem 4rem 1.2rem 1.2rem;
    background: var(--surface);
    color: var(--ink);
    text-align: center;
    box-shadow: 7px 7px 0 var(--sub);
    transition: background 180ms ease, color 180ms ease, box-shadow 180ms ease;
  }

  .market-card::before,
  .market-card::after {
    position: absolute;
    border-radius: 50%;
    content: "";
  }

  .market-card::before {
    top: -3.5rem;
    left: -2.5rem;
    width: 9rem;
    height: 9rem;
    background: var(--base);
  }

  .market-card::after {
    right: -3rem;
    bottom: -3rem;
    width: 8rem;
    height: 8rem;
    background: var(--sub);
  }

  .market-card__sun,
  .market-card__leaf {
    position: absolute;
    display: block;
  }

  .market-card__sun {
    top: 1.4rem;
    right: 2rem;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    background: var(--accent);
  }

  .market-card__leaf {
    top: 11rem;
    left: 1.2rem;
    width: 2rem;
    height: 4rem;
    border-radius: 100% 0 100% 0;
    background: var(--sub);
    transform: rotate(-24deg);
  }

  .market-card__eyebrow,
  .market-card__details,
  .market-card__action {
    position: relative;
    z-index: 1;
    font-family: system-ui, sans-serif;
    font-weight: 750;
    letter-spacing: 0.14em;
  }

  .market-card__eyebrow { font-size: 0.7rem; }

  .market-card__title {
    position: relative;
    z-index: 1;
    margin: 1rem 0 0;
    font-family: Georgia, "Noto Serif TC", serif;
    font-size: clamp(3.2rem, 7vw, 4.8rem);
    font-weight: 600;
    line-height: 0.82;
  }

  .market-card__description {
    position: relative;
    z-index: 1;
    max-width: 17rem;
    margin: 1.6rem auto 1rem;
    font-family: system-ui, -apple-system, "Noto Sans TC", sans-serif;
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .market-card__details {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-bottom: 1.25rem;
    font-size: 0.68rem;
  }

  .market-card__action {
    display: inline-block;
    padding: 0.65rem 0.9rem;
    border-radius: 999px;
    background: var(--accent);
    font-size: 0.72rem;
  }

  .tone-lab__palette {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.55rem 0.9rem;
    margin-top: 1rem;
    color: var(--ink);
    font: 700 0.72rem system-ui, sans-serif;
  }

  .tone-lab__palette span { display: inline-flex; align-items: center; gap: 0.35rem; }

  .tone-lab__palette i {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 1px solid rgb(0 0 0 / 0.12);
    border-radius: 50%;
  }

  .tone-lab__swatch--base { background: var(--base); }
  .tone-lab__swatch--sub { background: var(--sub); }
  .tone-lab__swatch--accent { background: var(--accent); }

  .tone-lab__observation {
    min-height: 3.5rem;
    margin: 1rem 0 0;
    color: var(--ink);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .tone-lab__code-panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 1rem;
    background: #202027;
  }

  .tone-lab__code-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.75rem 1rem;
    background: #30303a;
    color: #d9d9e2;
    font: 0.75rem ui-monospace, monospace;
  }

  .tone-lab__code-header span { display: flex; gap: 0.3rem; }
  .tone-lab__code-header i { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: #ff748c; }
  .tone-lab__code-header i:nth-child(2) { background: #ffd166; }
  .tone-lab__code-header i:nth-child(3) { background: #72d69c; }

  .tone-lab__code-panel pre {
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

  .tone-lab__code-panel code { background: transparent; color: inherit; }

  @media (max-width: 760px) {
    .tone-lab__workspace { grid-template-columns: 1fr; }
    .tone-lab__code-panel pre { max-height: 28rem; }
  }
</style>

<script>
  (() => {
    const lab = document.querySelector("#tone-lab")
    if (!lab) return

    const toneStyles = {
      raw: {
        label: "未統一",
        note: "高彩度的紅、紫和藍同時出現，每個顏色都很醒目，視線容易分散。",
        css: `.tone-lab[data-tone="raw"] {
  --page: #efedf2;
  --surface: #fffaf6;
  --base: #ff5364;
  --sub: #00afd0;
  --accent: #6047e8;
  --ink: #291c55;
}`,
      },
      pale: {
        label: "粉色調",
        note: "在顏色中加入較多白色，畫面最輕柔，適合可愛、夢幻的印象。",
        css: `.tone-lab[data-tone="pale"] {
  --page: #f8eff2;
  --surface: #fffaf8;
  --base: #f3cbd4;
  --sub: #cee5d4;
  --accent: #c9d7ef;
  --ink: #76666c;
}`,
      },
      light: {
        label: "淺色調",
        note: "明度維持在相近範圍，也保留較多色彩感，整體明亮而清爽。",
        css: `.tone-lab[data-tone="light"] {
  --page: #f6f2ec;
  --surface: #fffdf9;
  --base: #efb5c4;
  --sub: #b9ddc7;
  --accent: #abcde5;
  --ink: #655b62;
}`,
      },
      soft: {
        label: "柔和色調",
        note: "降低彩度並拉近明度，顏色仍有差異，放在一起卻顯得溫和統一。",
        css: `.tone-lab[data-tone="soft"] {
  --page: #ede9e4;
  --surface: #fbf7f1;
  --base: #d598a5;
  --sub: #9fbba6;
  --accent: #91abc1;
  --ink: #514b51;
}`,
      },
    }

    const frameworkCode = {
      vanilla: `const lab = document.querySelector("#tone-lab")

lab.querySelectorAll("[data-tone-option]").forEach((button) => {
  button.addEventListener("click", () => {
    lab.dataset.tone = button.dataset.toneOption
    lab.querySelectorAll("[data-tone-option]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button))
    })
  })
})`,
      vue: `<script setup>
import { ref } from "vue"

const tone = ref("soft")
const tones = ["raw", "pale", "light", "soft"]
<\/script>

<template>
  <section class="tone-lab" :data-tone="tone">
    <button
      v-for="item in tones"
      :key="item"
      :aria-pressed="tone === item"
      @click="tone = item"
    >
      <span v-text="item" />
    </button>
    <MarketCard />
  </section>
</template>`,
      react: `import { useState } from "react"

const tones = ["raw", "pale", "light", "soft"]

export default function ToneLab() {
  const [tone, setTone] = useState("soft")

  return (
    <section className="tone-lab" data-tone={tone}>
      {tones.map((item) => (
        <button
          key={item}
          aria-pressed={tone === item}
          onClick={() => setTone(item)}
        >
          {item}
        </button>
      ))}
      <MarketCard />
    </section>
  )
}`,
    }

    const filenames = {
      vanilla: "tone-demo.js",
      vue: "ToneDemo.vue",
      react: "ToneDemo.jsx",
    }

    const code = lab.querySelector(".tone-lab__code")
    const filename = lab.querySelector(".tone-lab__filename")
    const observation = lab.querySelector(".tone-lab__observation")
    let framework = "vanilla"
    let tone = "soft"

    function render() {
      lab.dataset.tone = tone
      filename.textContent = filenames[framework]
      observation.innerHTML = `<strong>${toneStyles[tone].label}：</strong>${toneStyles[tone].note}`
      code.textContent = `${toneStyles[tone].css}\n\n${frameworkCode[framework]}`
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

    lab.querySelectorAll("[data-tone-option]").forEach((button) => {
      button.addEventListener("click", () => {
        tone = button.dataset.toneOption
        lab.querySelectorAll("[data-tone-option]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button))
        })
        render()
      })
    })

    render()
  })()
</script>

## 柔和不是只把顏色變淡

粉色調加入較多白色；淺色調明亮清爽；柔和色調則降低彩度，同時讓各色的明度接近。即使同時使用粉紅、藍和綠，仍會有一致的氣氛。

實作時先決定主色、輔助色與強調色，再用 `--base`、`--sub`、`--accent` 管理。背景、卡片與文字使用 `--page`、`--surface`、`--ink` 等中性色，不列入三色配色。需要突出重點時，讓強調色只出現在按鈕等少數位置。

如果還不熟悉這些名稱，可以先閱讀：[設計基礎筆記：主色、強調色、輔助色與色彩三屬性]({{ '/Blog/design-basics-color/' | relative_url }})。

## 三種程式碼有什麼差別？

| 寫法 | 保存狀態 | 更新畫面 |
| --- | --- | --- |
| Vanilla | 一般變數 | 監聽按鈕，手動更新 `dataset` |
| Vue 3 | `ref` | 透過資料綁定自動更新 |
| React | `useState` | 更新 state 後重新渲染元件 |

三種寫法都只保存目前的 `tone`，並把它交給 `data-tone`。框架負責切換狀態，真正決定色彩的仍是同一組 CSS 變數。

## 結語
**色相可以不同，但明度和彩度要有共同節奏。**

## 參考資料

本文概念整理自 ingectar-e《最強排版設計：32個版面關鍵技巧，社群小編、斜槓設計，自學者神速升級！》P148–158，黃薇嬪譯，積木文化，2023。[城邦讀書花園書籍資料](https://www.cite.com.tw/book?id=97171)

---

系列導覽：[前端設計實驗室]({{ '/Blog/frontend-design-lab/' | relative_url }}) · 上一篇：[換一套英文字型，畫面個性差多少？]({{ '/Blog/frontend-design-lab-01-font-personality/' | relative_url }})
