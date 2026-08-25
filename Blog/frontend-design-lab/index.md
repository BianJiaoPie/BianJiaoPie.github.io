---
layout: page/blog/blog
title: "前端設計實驗室"
date: 2026-08-25
last_modified_at: 2026-08-25
section: tech
categories: [系列目錄, 前端設計]
tags: [CSS, Vanilla JavaScript, Vue 3, React, 設計練習]
description: 把排版、字型、配色與圖片技巧做成互動頁面，並比較 Vanilla、Vue 3、React 三種實作方式。
article_type: series-index
author:
  name: Fung
  url: https://BianJiaoPie.com
---

這個系列把一個設計技巧做成一篇互動實驗。每次固定大部分條件，只改一個變因，再比較 Vanilla、Vue 3、React 如何控制同一個畫面。

## 系列怎麼讀？

<div class="series-types">
  <section>
    <span>LAB</span>
    <h3>技巧篇</h3>
    <p>一次觀察一個設計原則，並切換三種前端寫法。</p>
  </section>
  <section>
    <span>NOTE</span>
    <h3>基礎筆記</h3>
    <p>補充會在多篇文章重複用到的設計名詞。</p>
  </section>
  <section>
    <span>PROJECT</span>
    <h3>主題作業</h3>
    <p>把幾個技巧組合成一個完整頁面。</p>
  </section>
</div>

## 已完成的技巧篇

{%- assign labs = site.pages | where: "series", "frontend-design-lab" | sort: "series_order" -%}

<ol class="series-list">
  {%- for article in labs %}
  <li>
    <a href="{{ article.url | relative_url }}">{{ article.title }}</a>
    {%- if article.description %}<p>{{ article.description }}</p>{% endif -%}
  </li>
  {%- endfor %}
</ol>

## 第一條路線：可愛風設計

目前先完成可愛風的五個技巧，再把它們組合成一張活動卡片。

1. 英文字型：已完成
2. 柔和色調：已完成
3. 使用插畫：準備中
4. 邊框：準備中
5. 條紋與圓點：準備中
6. 小作業：用五個技巧完成一張可愛風活動卡片

完整的文章編號、來源頁碼與其他主題路線記錄在工作清單中，文章完成後會自動出現在這個系列目錄。

<style>
  .series-types {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .series-types section {
    padding: 1rem;
    border: 1px solid #ded5d2;
    border-radius: 1rem;
    background: #faf7f5;
  }

  .series-types span {
    color: #9a7180;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.12em;
  }

  .series-types h3 { margin: 0.35rem 0; font-size: 1rem; }
  .series-types p { margin: 0; font-size: 0.86rem; line-height: 1.6; }

  .series-list li + li { margin-top: 1rem; }
  .series-list p { margin: 0.25rem 0 0; font-size: 0.9rem; }

  @media (max-width: 700px) {
    .series-types { grid-template-columns: 1fr; }
  }
</style>
