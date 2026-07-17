# 封面圖提示詞 — gongbi-silk-dark-background

> ⚠️ **風格來源備註**：`brand-assets/bianjiaopie/` 目前沒有 `cover-spec.md`，本次 fallback 讀取 `brand-assets/homunmage/cover-spec.md` 當跨品牌預設（等距 3D 基調、2026-06-03 拍板）。之後若邊角派要建立自己的封面風格規格，建議另立 `brand-assets/bianjiaopie/cover-spec.md`。
> 只發中文單語言（英文為 Reference, not published），圖內文字仍照規則統一用英文。

## 英文主標＋副標（逐字）

- 主標：**How to Paint on Black Silk**
- 副標：**Three gongbi techniques for clean red flowers on dark silk**

## 視覺概念

一塊繃在木框上的黑色絹本，斜角等距 3D 呈現、主體推向畫面右側；絹是半透明的，背面透出一道暖白／暖紅的光，隱約浮現出一朵花形的輪廓——像從內部點亮的燈籠，直接呼應文章「裏彩色／背染：從背面墊色讓形狀透到正面」的核心技法。畫框旁放一支毛筆與一碟紅色顏料，暗示工筆創作場景。左半留白供疊字。

**風格來源**：`brand-assets/homunmage/cover-spec.md`（fallback，跨品牌等距 3D 預設）

**Rubric 收斂備註**：5 個候選中，此「絹本背光透形」概念在主題辨識度（技法核心一眼可讀）、風格一致性（構圖天然主體靠右、左半留白）兩項都拿到最高分（5/5），專業感與資訊層次也都 ≥4，其餘候選（前後剖半圖、三技法並列小圖等）在資訊層次或辨識度上未達門檻（<4）而淘汰。

## 提示詞（貼進 LLM 生圖工具：DALL·E／ChatGPT／Gemini／Ideogram）

```
A clean isometric 3D illustration for a blog cover. Deep navy and violet/purple color palette, soft studio lighting, minimal uncluttered background. Scene: a piece of black silk fabric stretched taut on a wooden embroidery frame, angled in 3D space and pushed to the RIGHT side of the frame. The black silk is translucent — a faint warm reddish-white glow shines through it from behind, revealing the soft silhouette of a spider-lily-like flower shape emerging from the darkness, like a lantern lit from within. A small traditional ink brush and a shallow dish of red pigment rest beside the frame. The entire LEFT HALF of the image is empty negative space, reserved for text overlay. In that left third, vertically centered, render clean bold white sans-serif text: a large headline reading "How to Paint on Black Silk" and a smaller subheadline below it reading "Three gongbi techniques for clean red flowers on dark silk." Wide 16:9 banner (1920x1080), with all key visual elements and text kept within the central 1.91:1 safe area for social-sharing crops. No other text, no gibberish letters, no random words, no watermark, no third-party logo, no Chinese characters.
```

## 出圖後存檔

生圖完成後存成 `seo-drafts/gongbi-silk-dark-background/cover.webp`，並把文章 frontmatter 的 `cover:` 欄位改名成 `image:`（這個站的 `jekyll-seo-tag` plugin 認的鍵）、填實際路徑——詳見 `tech-seo.md` 的「站台技術棧備註」。

## fung-cover 上雲狀態

bianjiaopie 不進 LatticeCast `fung-cover` 表（2026-07-14 拍板：邊角派與 LatticeCast 發布體系分開），本步驟略過 upsert。
