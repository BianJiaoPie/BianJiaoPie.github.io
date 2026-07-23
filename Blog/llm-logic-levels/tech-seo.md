# 技術 SEO 檢核 — LLM 邏輯進階筆記：從一問一答到分工協作，六個層級

- 文章：`Blog/llm-logic-levels/index.md`
- 檢核日期：2026-07-23
- 備註：這篇是學習筆記，沒有走 researcher/serp-analysis/seo-article 全鏈（沒有 serp.md、沒有關鍵字/搜尋意圖研究），單獨對這篇跑技術層檢核。
- 站台架構：Jekyll + `remote_theme: jekyll/minima` + `jekyll-seo-tag` 外掛——**大部分 head 標籤是外掛自動從 frontmatter 產生的**，不是手工寫死在 layout 裡；本次檢核用本機 `docker-compose`（`localhost:14000`）跑真實 render 結果核對，不是憑猜測。

## 13 項檢核結果

| # | 項目 | 結果 | 備註 |
|---|---|---|---|
| 1 | Frontmatter 必備欄位 | ✅ 已補 | 原本缺 `description`／`author`／`lastmod`，已用 Patch 1 直接補進 `index.md` frontmatter；`cover` 待 cover-image-prompt 產出後補（見下） |
| 2 | H1 與 title 區分 | ⚠️ 相同（非 fail） | `layout/page/blog/blog.html` 的 `<h1>{{ page.title }}</h1>` 直接吃 frontmatter title，兩者現在完全一致——不算錯，但沒有额外優化 SERP CTR 的空間；學習筆記類文章可接受，不強改 |
| 3 | Meta description | ✅ 已補、70 字 | 見 Patch 1；已在本機 render 確認 `<meta name="description">` 有正確輸出 |
| 4 | OpenGraph / Twitter Card | ⚠️ 部分 | `og:title`／`og:description`／`og:url`／`og:site_name`／`og:type`／`og:locale`／`twitter:title` 皆已由 jekyll-seo-tag 正確輸出（本機 render 驗證過）；**`og:image`／`twitter:image` 缺，`twitter:card` 因此退化成 `summary`（非 `summary_large_image`）**——等 cover 圖到位就會自動補上，不用手動加 meta 標籤 |
| 5 | Schema.org 結構化資料 | ⚠️ 語法驗證 FAIL（預期中、待 cover 圖解） | 見下方「schema.org 語法驗證」——唯一 FAIL 原因是缺 `image`，其餘（`headline`／`datePublished`／`author.name`）皆通過 |
| 6 | Canonical URL | ✅ Pass | jekyll-seo-tag 自動輸出 self-referencing canonical（`http://0.0.0.0:14000/Blog/llm-logic-levels/`，本機 dev host；正式站會是 `https://bianjiaopie.com/Blog/llm-logic-levels/`），不用額外設定 |
| 7 | 圖片 alt + 優化 | ✅ Pass | 全文六張圖是 inline `<svg role="img" aria-label="...">` + `<title>`，等同 alt 語意；`viewBox` 讓瀏覽器能正確保留版面（無 CLS 風險）；沒有 `<img>` 需要另外補 `width`/`height`/`loading` |
| 8 | 內鏈與外鏈 | ⚠️ 無鏈（N/A，非 fail） | 全文零內鏈、零外鏈。內鏈：目前站上沒有其他前端/LLM 相關文章可連（僅此篇＋工筆畫系列，主題不相關），暫無適合的內鏈目標；外鏈：可考慮連到 Gemini API 官方文件（demo 用的就是這支 API），**建議由你決定要不要加，不直接動內文**（見下方建議） |
| 9 | Sitemap / robots.txt | ✅ Pass | 本機驗證：`sitemap.xml` 已含 `<loc>.../Blog/llm-logic-levels/</loc>`；`robots.txt` 沒擋 `/Blog/`（僅擋 `/article-ideas/`／`/brand-assets/`／`/researcher-drafts/`／`/seo-drafts/`） |
| 10 | Core Web Vitals | ⏳ 待發布後量測 | 需要 live URL 才能跑 PageSpeed Insights，本機 dev server 量測沒有意義 |
| 11 | Mobile-friendly | ✅ Pass（站台層級） | viewport meta 已輸出；響應式排版是 minima 主題層級的既有能力，非本篇特有問題 |
| 12 | HTTPS | ✅ Pass（發布後自動） | GitHub Pages 強制 HTTPS，正式網域上線即符合 |
| 13 | URL 結構 | ✅ Pass | `/Blog/llm-logic-levels/`——全小寫、用 `-`、無 session id/時間戳、結構淺、英文 slug |

## schema.org 語法驗證

跑 `validate-schema.sh` 對現況（尚未有 cover 圖）的 JSON-LD：

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "LLM 邏輯進階筆記：從一問一答到分工協作，六個層級",
  "description": "用虛擬碼拆解 LLM 邏輯：從沒有記憶的單次問答，到工具呼叫、多角色協作、固定流程，最後平行處理多份工作，六層各附可跑 demo 與示意圖。",
  "datePublished": "2026-07-23T00:00:00+00:00",
  "dateModified": "2026-07-23T00:00:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Fung",
    "url": "https://BianJiaoPie.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "http://0.0.0.0:14000/Blog/llm-logic-levels/"
  },
  "url": "http://0.0.0.0:14000/Blog/llm-logic-levels/"
}
```

**結果：FAIL——缺 `image`；WARN——建議補 `publisher.name`**（跑 `validate-schema.sh Blog/llm-logic-levels/tech-seo.md` 實測，非推測）。

FAIL 成因單一：`index.md` frontmatter 還沒有 `image` 欄位。等 cover-image-prompt 產出提示詞、你生好圖、補上 `image`／`image_width`／`image_height` 到 frontmatter 後，`og:image`／`twitter:image`／JSON-LD `image` 會被 jekyll-seo-tag 自動一起補齊（不用手動寫 meta 標籤），schema 驗證會轉 PASS。

WARN 的 `publisher.name` 不用處理：對照已發布的 `gongbi-silk-dark-background.md`，jekyll-seo-tag 產出的 BlogPosting 本來就不含 `publisher` 欄位（外掛設計如此，非本篇獨有的缺漏），全站現況一致。

## Patch 1：Frontmatter（已直接套用到 `index.md`）

```yaml
lastmod: 2026-07-23
description: 用虛擬碼拆解 LLM 邏輯：從沒有記憶的單次問答，到工具呼叫、多角色協作、固定流程，最後平行處理多份工作，六層各附可跑 demo 與示意圖。
author:
  name: Fung
  url: https://BianJiaoPie.com
```

## 待補（真正的 placeholder，不是本次能做的）

- **`image` / `image_width` / `image_height`**：等 cover-image-prompt 產出提示詞、你生好封面圖後，比照 `gongbi-silk-dark-background.md` 的寫法補進 frontmatter（`image: /Blog/llm-logic-levels/cover-xxx.webp`）。補完後 og:image／twitter:image／JSON-LD image／`twitter:card`（升級成 `summary_large_image`）會一起自動生效，不用再回來改這份報告。
- **Core Web Vitals**：發布上線後跑 https://pagespeed.web.dev/ 對正式網址量測。
- **Rich Results Test（收錄資格層）**：發布上線後跑 https://search.google.com/test/rich-results 對正式網址驗證，本機語法驗證不能取代這一步。

## 建議（不強制、未直接動內文）

- 考慮在第三層（Agent 工具呼叫）第一次提到 `checkWeather()`/Gemini API 時，外鏈一次到 [Gemini API 官方文件](https://ai.google.dev/gemini-api/docs)——demo 實際打的就是這支 API，對讀者是自然且權威的參考來源。要加的話麻煩你自己決定位置，我不直接改內文。
- H1 與 title 目前完全相同；如果之後想優化 SERP 點擊率，可以把 frontmatter title 換成更短、更關鍵字前置的版本（例如「LLM 邏輯六層筆記：問答到多 agent 協作」），H1 維持現在這個更完整的版本給站內讀者。非必要，學習筆記類文章可以不改。

## 完工接力狀態

- fung-seo（LatticeCast）上傳：**跳過**——bianjiaopie 站台與 LatticeCast 發布體系分開（2026-07-14 拍板），不進 fung-seo 表。
- cover-image-prompt：接力中（見下方告知）。
- social-platform-adapt：接力中（見下方告知）。
