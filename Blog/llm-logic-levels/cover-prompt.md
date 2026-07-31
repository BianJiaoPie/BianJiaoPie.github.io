# 封面圖提示詞 — LLM 邏輯進階筆記：從一問一答到分工協作，六個層級

> **風格來源（2026-07-31 更新）**：本篇產出時 `brand-assets/bianjiaopie/cover-spec.md` 尚不存在，fallback 讀了 `brand-assets/homunmage/cover-spec.md` 當跨品牌預設。**該檔現已建立**，邊角派不再 fallback homunmage。
> ⚠️ **本篇成品事後被判定踩到規格**：已出圖的 `ChatGPT_Image_llm-logic-levels.webp` 使用了**基座（pedestal）＋物件內部發光＋戲劇打光**，構成「產品發表會」語彙——cover-spec 已據此立為程式線的禁用項（與 silk-painting 那張的「食品廣告」語彙同源）。**此圖已發布、暫不重做**，僅留記錄；日後若重生封面，照 cover-spec 的「去廣告化寫實 3D」關鍵詞重跑（無基座、無內部發光、物件放進真實環境）。

## 英文主標＋副標（圖內文字，逐字）

- 主標：**Six Levels of LLM Logic**
- 副標：**From single-turn chat to parallel AI teams**

## 視覺概念

文章用「AI 助理規劃東京旅行」當敘事載體去教一個抽象主題（LLM 系統六個層級），旅行道具（地圖、票根、懷錶……）本身也是發明出來代表抽象函式呼叫的隱喻小物，不是文章真正的具體例子——所以不用旅行道具，改成單一發明隱喻，照 `brand-assets/homunmage/cover-spec.md` 的參照範例手法（小物件與其背後同輪廓的巨大結構，兩種尺度）：

一個小巧、乾淨的霧面玻璃對話泡泡（speech bubble）安穩立在極簡基座上，前景清晰對焦、暖琥珀微光從內透出——它的陰影延伸出去，是一整片由同一輪廓、無數個相同對話泡泡組成的陣列，向畫面深處排開、逐漸虛化。同一個形狀，兩種規模：一句簡單問答，跟同時運作的大量平行對話，其實是同一件事的不同尺度。冷色調基底、單一暖色點綴、主體整體推向畫面右側。

**標題排版**（固定風格，參照 ai-poc-to-production-gap 封面）：
- 標題文字 vs 背景＝明暗互補：文字顏色不寫死，跟著左側留白區實際渲染的明暗走（偏淺配深色字、偏深配淺色字）。
- 色帶 vs 畫面基底＝色溫互補，不是明暗對比：色帶用 homunmage cover-spec 定義的點綴色（琥珀），因為這份 cover-spec 是冷底＋暖點綴，色溫相反才會跳出來；不用跟著背景明暗切換。
- 色帶 vs 標題＝視覺重量分工＋位置＋長度：色帶是細線，比副標更輕，扮演分隔線角色；**位置在主標和副標中間**（不是副標下方）；**長度很短**，大約主標一個字母寬度的 1.5 倍，不是跟文字區塊同寬。
- 排版固定：主標粗體最大字、最多兩行；色帶緊接在主標下方（短線）；副標接在色帶下方，一般字重、單行、明顯更小、跟主標同色系。

## 提示詞（可直接貼進 DALL·E／ChatGPT／Gemini 等生圖工具）

```
Cinematic editorial 3D render, photorealistic materials and lighting. A single small, flawless speech-bubble-shaped object in frosted glass, resting alone on a clean minimalist pedestal, in crisp sharp focus, glowing softly from within with a single warm amber light. Behind and around it, emerging from its own shadow and receding into a shallow-depth-of-field blur, an orderly field of many identical frosted-glass speech-bubble shapes — the exact same silhouette, repeated at a smaller scale — extends outward like an army, each with a faint amber glow. The single glowing bubble in sharp focus and the vast field behind it share the same silhouette, implying a single simple exchange and a massively parallel system of exchanges are the same shape at a different scale. Cool base palette of slate blue and warm off-white, with the amber glow as the only warm accent. Soft atmospheric, directional lighting. The entire scene is pushed to the RIGHT half of the frame; the entire LEFT HALF of the frame is empty negative space reserved for title text.

Overlay text in the left third of the frame, vertically centered. Choose a text color with strong contrast against whatever that left-side background actually renders as (light or dark) — do not default to a fixed color:
Headline: "Six Levels of LLM Logic" — bold sans-serif, largest size, up to two lines.
Below the headline, a very short thin horizontal accent line — only about 1.5x the width of a single headline letter, NOT spanning the text block — in the same warm amber accent color used for the bubble's glow.
Subhead: "From single-turn chat to parallel AI teams" — placed below that short accent line, regular weight (much lighter than headline), same color as the headline, one line, noticeably smaller than headline.

No other text, no gibberish letters, no random words, no watermark, no third-party logo, no UI screenshots, no Chinese characters. Wide 16:9 banner, 1920x1080. Keep the bubble and the field behind it within the central 1.91:1 (1200x630) safe zone so nothing critical is cropped when shared as an OG social preview — avoid placing key elements flush against any edge.
```

## 出圖後

已出圖，存成 `ChatGPT_Image_llm-logic-levels.webp`（1672×941，原檔名含空格已去除），放在 `Blog/llm-logic-levels/`。`index.md` frontmatter 已補：

```yaml
image: /Blog/llm-logic-levels/ChatGPT_Image_llm-logic-levels.webp
image_width: 1672
image_height: 941
```

og:image／twitter:image／JSON-LD image 會被 jekyll-seo-tag 自動一起補齊（不用手動寫 meta 標籤），`tech-seo.md` 裡記錄的 schema.org FAIL（缺 `image`）也會轉 PASS。

## fung-cover 上傳

**跳過**——bianjiaopie 與 LatticeCast 發布體系分開，不進 fung-cover 表。
