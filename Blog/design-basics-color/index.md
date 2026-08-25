---
layout: page/blog/blog
title: "設計基礎筆記｜主色、強調色、輔助色與色彩三屬性"
date: 2026-08-25
last_modified_at: 2026-08-25
section: tech
categories: [學習筆記, 前端設計]
tags: [配色, 色彩, 主色, 強調色, 輔助色, 色相, 明度, 彩度]
description: 簡單認識主色、強調色、輔助色，以及色相、明度和彩度，建立挑選與調整配色的基本語言。
series: design-basics
series_title: 設計基礎筆記
article_type: foundation
source_pages: [147, 157, 158]
author:
  name: Fung
  url: https://BianJiaoPie.com
---

挑顏色之前，先分清楚「顏色負責什麼」與「顏色如何變化」。前者是主色、強調色和輔助色；後者是色相、明度和彩度。

## 主色、強調色與輔助色

<div class="color-role-demo" aria-label="主色、輔助色與強調色的版面示意">
  <div class="color-role-demo__base">
    <span>主色</span>
    <strong>決定整體印象</strong>
  </div>
  <div class="color-role-demo__sub">
    <span>輔助色</span>
    <strong>補充層次</strong>
  </div>
  <div class="color-role-demo__accent">
    <span>強調色</span>
    <strong>吸引視線</strong>
  </div>
</div>

- **主色（Base color）**：畫面中最主要的顏色，負責建立整體氣氛。
- **強調色（Accent color）**：用量少、對比明顯，放在最希望被看見的位置，例如按鈕或重要資訊。
- **輔助色（Sub color）**：連接主色與強調色，增加層次，也能區分不同區塊。

三者沒有固定比例。先讓主色統一畫面，再用少量強調色安排視覺重點即可。

## 色相、明度與彩度

<div class="color-property-demo">
  <section>
    <h3>色相 Hue</h3>
    <div class="color-property-demo__hue" aria-hidden="true"></div>
    <p>紅、黃、綠、藍等顏色種類。</p>
  </section>
  <section>
    <h3>明度 Value</h3>
    <div class="color-property-demo__value" aria-hidden="true"></div>
    <p>顏色看起來有多亮或多暗。</p>
  </section>
  <section>
    <h3>彩度 Chroma</h3>
    <div class="color-property-demo__chroma" aria-hidden="true"></div>
    <p>顏色有多鮮豔或多灰濁。</p>
  </section>
</div>

調整配色時，可以一次只改一項：換色相會改變顏色種類；調明度會影響閱讀對比；降彩度則能讓畫面變得柔和沉穩。

## 一個簡單的判斷順序

1. 先決定希望畫面給人什麼感覺。
2. 選一個主色建立氣氛。
3. 加入輔助色整理層次。
4. 最後才放少量強調色引導視線。

如果顏色太多而顯得零散，可以先讓它們的明度與彩度接近。實際比較可閱讀：[如何把不同顏色統一成柔和色調？]({{ '/Blog/frontend-design-lab-02-soft-tone/' | relative_url }})。

## 參考資料

本文概念整理自 ingectar-e《最強排版設計：32個版面關鍵技巧，社群小編、斜槓設計，自學者神速升級！》Chapter 3，黃薇嬪譯，積木文化，2023。本文圖示為重新繪製，未使用書籍內頁圖片。[城邦讀書花園書籍資料](https://www.cite.com.tw/book?id=97171)

<style>
  .color-role-demo {
    display: grid;
    grid-template-columns: 1.5fr 1fr 0.65fr;
    min-height: 12rem;
    margin: 1.5rem 0;
    overflow: hidden;
    border-radius: 1.2rem;
    color: #3f3a3d;
  }

  .color-role-demo > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.25rem;
    padding: 1.2rem;
  }

  .color-role-demo span {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .color-role-demo strong { font-size: 1rem; }
  .color-role-demo__base { background: #d7a4af; }
  .color-role-demo__sub { background: #aebfae; }
  .color-role-demo__accent { background: #d9bd68; }

  .color-property-demo {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .color-property-demo section {
    padding: 1rem;
    border: 1px solid #e2d9d5;
    border-radius: 1rem;
    background: #fbf8f6;
  }

  .color-property-demo h3 {
    margin: 0 0 0.75rem;
    font-size: 1rem;
  }

  .color-property-demo p {
    margin: 0.75rem 0 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .color-property-demo__hue,
  .color-property-demo__value,
  .color-property-demo__chroma {
    height: 3.5rem;
    border-radius: 0.7rem;
  }

  .color-property-demo__hue {
    background: linear-gradient(90deg, #d76f7d, #dab85e, #75ae8b, #719fc2, #9b79ad);
  }

  .color-property-demo__value {
    background: linear-gradient(90deg, #f2dde2, #b67685, #4b2931);
  }

  .color-property-demo__chroma {
    background: linear-gradient(90deg, #b3a5a8, #c67d8e, #e13b63);
  }

  @media (max-width: 700px) {
    .color-role-demo { grid-template-columns: 1fr; }
    .color-property-demo { grid-template-columns: 1fr; }
  }
</style>
