# 技術 SEO 檢核報告 — silk-painting-binder-compatibility

> 檢核對象：`seo-drafts/silk-painting-binder-compatibility/silk-painting-binder-compatibility.md`
> 發布位置：`Blog/silk-painting-binder-compatibility/index.md`（已搬）
> 檢核日期：2026-07-31
> 3H：Hero（中文圈稀缺的膠彩材料學深度題）　主關鍵字：膠礬水　Intent：mofu
> 站台技術棧：Jekyll（`remote_theme: jekyll/minima`）＋ `jekyll-seo-tag` / `jekyll-sitemap` / `jekyll-feed`，**無自訂 `_includes/head.html`**（吃 minima 內建、會呼叫 `{% seo %}`）
> Vendor：bianjiaopie ——**不進 fung-seo 表**（邊角派發布體系與 LatticeCast 分開），本次不跑 `fung-seo-upload.sh`

## 13 項檢核結果

| # | 項目 | 結果 | 說明 |
|---|---|:---:|---|
| 1 | Frontmatter 必備欄位 | ⚠️→✅ | 原本只有 title/date/tags/description 四欄。已補 `layout` / `lastmod` / `section` / `categories` / `author` / `image` / `image_width` / `image_height`；`title` 22→**30 字**、`description` 60→**74 字**（見 Patch 1） |
| 2 | H1 vs title | ✅ | 站台慣例：markdown 內不寫 `# H1`，由 layout `page/blog/blog` 從 frontmatter `title` 產生 H1（與 `gongbi-silk-dark-background`、`llm-logic-levels` 一致）。因此 H1＝title，屬**改進機會非 fail**（見 checklist §2） |
| 3 | Meta description | ✅ | 74 字，落在中文 70–80 區間；自然帶主關鍵字「膠礬水」1 次，寫成預告不是首段抄貼 |
| 4 | OpenGraph / Twitter Card | ✅ | 靠 `{% seo %}` 自動產生。**關鍵是 plugin 認的鍵是 `image:` 不是 `cover:`**——本文已填 `image:` 絕對路徑，OG/Twitter 圖不會空。`og:locale` 由 `_config.yml` 的 `lang: zh-TW` 帶出 |
| 5 | Schema.org | ✅（實測） | **不是推定，是實際 build 出 HTML 驗過**：`{% seo %}` 吐出 `@type: BlogPosting`，`author`（Person，含 name/url）、`datePublished`、`dateModified`、`description`、`headline`、`image`、`mainEntityOfPage`、`url` 全部到位，網址為正式網域。**Google 官方建議的五個屬性（author／dateModified／datePublished／headline／image）全數具備**。<br>~~publisher 缺失~~ **已撤回**：查 Google 官方 Article 文件（2026-07）確認「There are no required properties」，`publisher` 既非必填也非建議——先前依本 skill 舊版 checklist 判為缺口是錯的，checklist 已同步修正 |
| 6 | Canonical URL | ✅ | 不手動設——`jekyll-seo-tag` 用 `site.url`（`https://BianJiaoPie.com`）＋檔案實際路徑自動算。檔案已放在 `Blog/silk-painting-binder-compatibility/index.md`，會算出 `/Blog/silk-painting-binder-compatibility/`，正確 |
| 7 | 圖片 alt + 優化 | ⚠️→✅ | **4 張圖全部從 markdown `![]()` 改成 `<img>`**，補齊 `width`/`height`/`loading="lazy"`（防 CLS）：pic1 1600×1200、pic2 1600×1064、pic3 794×1244、SVG 640×460（原本只有 viewBox 無寬高）。alt 全部重寫成描述性文字。**封面 PNG 1.74MB → webp 66KB**（`cwebp -q 82`；且 `.gitignore` 擋 `*.png`，不轉就進不了 repo） |
| 8 | 內外鏈 | ⚠️→✅ | **修掉 1 個壞內鏈**：`/Blog/gongbi-silk-dark-background.html` → `/Blog/gongbi-silk-dark-background/`（該文是 `index.md` 目錄式輸出、`.html` 路徑不存在，原連結是死的）。**清掉 1 個殘留 `<!-- 🖼️ 待補 -->` comment**（見下方待辦）。外鏈 7 個、含國美館 PDF、農業部研究報告、AIC conservation-wiki 等權威來源；站上 `jekyll-external-links` 處理 `target`/`rel`，未全上 `nofollow` |
| 9 | Sitemap / robots | ✅ | `jekyll-sitemap` 已啟用，`Blog/` 路徑會自動收進 `sitemap.xml`。`robots.txt` 只擋 `/article-ideas/`、`/brand-assets/`、`/researcher-drafts/`、`/seo-drafts/`——**Blog 未被擋**；頁面無 `noindex` |
| 10 | Core Web Vitals | ⏳ | 需 live URL 才能跑 PageSpeed Insights。已預先做完會影響 LCP/CLS 的基本功：全圖 webp、全 `<img>` 帶寬高、非首屏 `loading="lazy"`、封面壓到 66KB |
| 11 | Mobile-friendly | ✅（推定） | minima 內建 responsive ＋ viewport meta，站上其他頁已在用。建議發布後跑一次 PSI mobile 報告 |
| 12 | HTTPS | ✅（推定） | `_config.yml` `url: https://BianJiaoPie.com`；GitHub Pages 自訂網域預設強制 HTTPS。文內外鏈全 https，無 mixed content |
| 13 | URL 結構 | ✅ | `silk-painting-binder-compatibility` 全小寫、連字號、無雜訊；`/Blog/{slug}/` 結構淺，與站上既有兩篇一致 |

## Patch 1：Frontmatter（已直接套用到 `{slug}.md` 與 `Blog/.../index.md`）

```yaml
layout: page/blog/blog
title: 膠礬水到底在幹嘛？從pH值看懂動物膠、植物膠、壓克力三大衝突   # 22→30 字
date: 2026-07-21
last_modified_at: 2026-07-31   # ★ 不是 lastmod——見下方「實測發現」
section: painting
categories: [水墨膠彩, 繪畫材料學]
tags: [膠彩畫, 膠礬水, 繪畫材料學, 絹本, 動物膠]
description: 膠礬水到底在做什麼？從動物膠的pH值與機械強度數據，拆解動物膠、植物膠、合成膠三大體系為何互相衝突，附傳統配製比例、三礬九染原則與明礬酸化風險數據。   # 60→74 字
author:
  name: Fung
  url: https://BianJiaoPie.com
image: /Blog/silk-painting-binder-compatibility/cover-silk-painting-binder-compatibility.webp
image_width: 1376
image_height: 768
```

## Patch 2：HTML `<head>` 補件 —— **本站不需要手貼**

這個站沒有自己刻 `<head>`，靠 minima 內建 head 呼叫 `{% seo %}` 自動產生 title / description / OG / Twitter / canonical / JSON-LD。**不要、也不應該**貼 `templates.md` 那份通用 HTML head 補件（那是給沒有此 plugin 的站台用的）。

### 預期 JSON-LD 產出（★ 不是要手貼進 head，是給發布後比對用的基準）

依據 = `_site/Blog/gongbi-silk-dark-background/index.html` 的實際建置產出（同站、同 frontmatter 結構）。發布後跑 Rich Results Test 時拿這份對照，欄位對不上就是有東西沒吃到：

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "膠礬水到底在幹嘛？從pH值看懂動物膠、植物膠、壓克力三大衝突",
  "description": "膠礬水到底在做什麼？從動物膠的pH值與機械強度數據，拆解動物膠、植物膠、合成膠三大體系為何互相衝突，附傳統配製比例、三礬九染原則與明礬酸化風險數據。",
  "author": {
    "@type": "Person",
    "name": "Fung",
    "url": "https://BianJiaoPie.com"
  },
  "datePublished": "2026-07-21T00:00:00+00:00",
  "dateModified": "2026-07-31T00:00:00+00:00",
  "image": "https://BianJiaoPie.com/Blog/silk-painting-binder-compatibility/cover-silk-painting-binder-compatibility.webp",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://BianJiaoPie.com/Blog/silk-painting-binder-compatibility/"
  },
  "url": "https://BianJiaoPie.com/Blog/silk-painting-binder-compatibility/"
}
```

> ⚠️ 兩點提醒：① `_site/` 是舊的本機建置，裡面的絕對網址是 `http://0.0.0.0:14000`——正式建置會用 `_config.yml` 的 `url: https://BianJiaoPie.com`，上面已換成正式網域。② **實際產出沒有 `publisher`**（見檢核 #5），本基準也照實不列。

有效鍵名對照（★ 與通用模板不同，容易寫錯）：

| 通用模板欄位 | 本站真正吃的鍵 | 本文現況 |
|---|---|---|
| `cover` | **`image`**（字串路徑，或 `{path,height,width}`） | ✅ 已填絕對路徑 ＋ `image_width` / `image_height` |
| `canonical` | **`canonical_url`** | 不手動設，讓 plugin 自動算（檔案路徑已正確） |

## 本次實際動到的檔案

| 檔案 | 動作 |
|---|---|
| `seo-drafts/.../silk-painting-binder-compatibility.md` | frontmatter 補齊、內鏈修正、4 張圖改 `<img>`、清除待補 comment |
| `seo-drafts/.../cover-silk-painting-binder-compatibility.webp` | 🆕 由 `Gemini_Generated_Image_*.png`（1.74MB）轉出，66KB |
| `Blog/silk-painting-binder-compatibility/index.md` | 🆕 發布檔（自草稿複製） |
| `Blog/silk-painting-binder-compatibility/*.webp`、`diagram-sanfan-jiuran.svg` | 🆕 隨文資產（5 檔） |

## ★ 實測發現：`lastmod` 是死鍵，正確鍵名是 `last_modified_at`

用 docker 實際 build 出來比對才抓到：**`jekyll-seo-tag` 完全不看 `lastmod:`**，它讀的是 `last_modified_at:`。設了 `lastmod` 而沒設 `last_modified_at`，schema 的 `dateModified` 會靜默 fallback 成 `date`（＝首次發布日），看起來有值、其實是錯的。

| | 設 `lastmod: 2026-07-31` | 改設 `last_modified_at: 2026-07-31` |
|---|---|---|
| 產出的 `dateModified` | `2026-07-21`（＝date，錯） | `2026-07-31`（正確） |

本文已改用 `last_modified_at`，並**移除 `lastmod`**（兩個同值鍵遲早漂移，只留真源）。

> **⚠️ 既有文章 `gongbi-silk-dark-background` 中同一個地雷**：它的 frontmatter 是 `date: 2026-07-14` ＋ `lastmod: 2026-07-21`，實際建置產出 `"dateModified":"2026-07-14"`——**7/21 那次修訂完全沒被 Google 看到**。改法就是把 `lastmod` 換成 `last_modified_at`。那是已發布文章，未逕行修改，等你點頭。

## 發布前／後必跑

- [x] **本機建置驗證** —— 本機無 `bundle`，改用 repo 自帶 docker 跑 `jekyll build`，**已通過**。逐項比對實際產出的 HTML：`BlogPosting` JSON-LD 欄位齊全且網址為正式網域、`og:image` 指向新封面、`<h1>` 恰好一個（由 layout 產生）、4 個 `loading="lazy"` 都在、內鏈目標 `/Blog/gongbi-silk-dark-background/` 確實存在、`sitemap.xml` 已收錄本文
- [ ] Rich Results Test（需 live URL）：https://search.google.com/test/rich-results ——確認 `{% seo %}` 真的吐出 `BlogPosting` 且必填欄位齊
- [ ] PageSpeed Insights（需 live URL）：https://pagespeed.web.dev/ ——LCP / INP / CLS ＋ mobile 報告
- [ ] 社群預覽實測：貼一次連結到 Threads／FB，確認 OG 圖抓到的是新封面
- [ ] `Gemini_Generated_Image_silk-painting-binder-compatibility.png` 原始檔留在 `seo-drafts/`，被 `.gitignore` 擋、不會進 repo；要保留原檔請自行備份

## 待辦（自本次檢核產生）

- **膠礬水實拍照**：原文第 22 行有 `<!-- 🖼️ 待補：調好的膠礬水（透明液體）實拍照，Wikimedia 上沒找到現成可用的，建議自己拍一張 -->`。依 checklist §8「不准帶著待填標記發布」已移除該 comment，**但需求仍在**——自己拍一張後補進〈膠礬水是什麼〉節，補完把 `lastmod` 往後推。
- **反向內鏈**：`gongbi-silk-dark-background` 目前沒有連回本文。兩篇是互補題（一個講顏色透不透得出來、一個講膠會不會排斥剝落），建議在該文加一條回鏈形成內鏈對。
- ~~全站缺 `publisher`~~ **不用處理，已查證撤回**：Google 官方 Article 文件明載沒有必填屬性，`publisher` 不在必填也不在建議清單（2023-11 起 logo 相關要求併進 Organization markup）。站上三篇都沒有 publisher，**不影響 Article 的結構化資料資格**。若日後做了 logo，那是為了 Organization／知識面板與封面角標，不是為了補這一欄。
- **`validate-schema.sh` 對本站型不適用**：該腳本在 `tech-seo.md` 裡找手寫的 JSON-LD 區塊，但 plugin 驅動的站台本來就不會有——實測既有的 `gongbi-silk-dark-background` 也同樣 FAIL。本檔加了「預期產出」基準區塊後可通過，但那是副作用不是目的；真正的驗證仍是發布後的 Rich Results Test。

## 完工接力狀態

- `fung-seo` upsert：**SKIP** —— bianjiaopie 不進 LatticeCast 發布體系（非失敗、非遺漏）
- `cover-image-prompt`：**略過硬接** —— `cover-prompt.md` 已存在（本日稍早依新版 `brand-assets/bianjiaopie/cover-spec.md` 重跑過並出圖、人審通過），依規則不覆蓋
- `social-platform-adapt`：待 invoke
