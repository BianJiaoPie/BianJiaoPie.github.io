# 封面圖提示詞 — gongbi-silk-dark-background

> ⚠️ **風格來源備註**：`brand-assets/bianjiaopie/` 目前沒有 `cover-spec.md`，fallback 讀取 `brand-assets/homunmage/cover-spec.md` 當跨品牌預設（clean tech-editorial 寫實電影感）。之後若邊角派要建立自己的封面風格規格，建議另立 `brand-assets/bianjiaopie/cover-spec.md`。
> 只發中文單語言（英文為 reference，not published），圖內文字仍照規則統一用英文。

## 英文主標＋副標（逐字）

- 主標：**How to Paint on Black Silk**
- 副標：**Three gongbi techniques for clean red flowers on dark silk**

## 視覺概念

文章的具體例子（作者自己實作、有照片）：黑色絹本、繃在木框上、絹是半透明的、從絹背面上色讓色透到正面（裏彩色／背染），這是文章真正的核心技法，不是敘事載體，直接用真實元素組成畫面，不發明隱喻。

一片繃在木框上的黑色絹本，畫面九成是深沉近黑的絹面與木框，只在偏右側一小塊區域，一朵**彼岸花（紅花石蒜，Lycoris radiata）**形的暖紅光暈從絹背後透出、範圍克制不張揚，像畫面裡唯一的一點暖色重點；框緣清晰、側角呈現，柔和背光從深處打來，細墨線在花形邊界清晰可辨；旁邊放一支毛筆與一碟紅色顏料，暗示工筆創作場景。左側大片留給黑絹本身的留白。

**獨立評分**（5 候選 + 1 輪重試，各自獨立 Agent 打分）：初版候選多因「紅色搶戲、跟冷色基底衝突」卡在風格一致性；重試把紅光範圍收得更小、更克制後，本候選拿到主題辨識度 5、專業可信感 5、風格一致性 4、資訊層次 5（19/20），四項都 ≥4，直接收斂。

**標題排版**（固定風格，參照 ai-poc-to-production-gap 封面）：
- 標題文字 vs 背景＝明暗互補：文字顏色不寫死，跟著左側留白區（這裡預期是深色絹面）實際渲染的明暗走——這張畫面偏暗，預期用淺色（近白）字。
- 色帶 vs 畫面基底＝色溫互補：色帶用這張封面本身的暖紅點綴色（跟花形光暈同色系），因為整體畫面是深色冷調，暖色才會跳出來。
- 色帶 vs 標題＝視覺重量分工＋位置＋長度：色帶是細線，比副標更輕，扮演分隔線角色；**位置在主標和副標中間**（不是副標下方）；**長度很短**，大約主標一個字母寬度的 1.5 倍，不是跟文字區塊同寬。
- 排版固定：主標粗體最大字、最多兩行；色帶緊接在主標下方（短線）；副標接在色帶下方，一般字重、單行、明顯更小、跟主標同色系。

## 提示詞（貼進 LLM 生圖工具：DALL·E／ChatGPT／Gemini／Ideogram）

```
Cinematic editorial 3D render, photorealistic materials and lighting, shallow depth of field. A piece of black silk fabric stretched taut on a wooden frame, shown at a slight angle, pushed to the RIGHT side of the frame. About 90% of the visible silk and frame reads as deep, near-black, cool-toned darkness. Only in a small, restrained area toward the right does the shape of a red spider lily flower (Lycoris radiata) glow warmly, showing through faintly from behind the translucent silk — like the single warm accent point in an otherwise dark, cool scene. A fine ink-line boundary is crisply visible at the edge of that glowing flower shape. The wooden frame's edge is crisp and clearly rendered. Soft directional backlight comes from deep within the frame. Beside the frame rest a traditional ink brush and a shallow dish of red pigment. The entire LEFT HALF of the frame is empty negative space reserved for title text.

Overlay text in the left third of the frame, vertically centered. Choose a text color with strong contrast against whatever that left-side background actually renders as (light or dark) — do not default to a fixed color:
Headline: "How to Paint on Black Silk" — bold sans-serif, largest size, up to two lines.
Below the headline, a very short thin horizontal accent line — only about 1.5x the width of a single headline letter, NOT spanning the text block — in the same warm reddish accent color as the glowing flower shape.
Subhead: "Three gongbi techniques for clean red flowers on dark silk" — placed below that short accent line, regular weight (much lighter than headline), same color as the headline, one line if possible, noticeably smaller than headline.

No other text, no gibberish letters, no random words, no watermark, no third-party logo, no Chinese characters. Wide 16:9 banner, 1920x1080. Keep the frame and the glowing shape within the central 1.91:1 (1200x630) safe zone so nothing critical is cropped when shared as an OG social preview — avoid placing key elements flush against any edge.
```

## 出圖後存檔

已出圖，存成 `Gemini_Generated_Image_gongbi-silk-dark-background.webp`（1376×768），同步放在 `seo-drafts/gongbi-silk-dark-background/` 與 `Blog/gongbi-silk-dark-background/` 兩處。`Blog/gongbi-silk-dark-background/index.md` frontmatter `image:` 已指向 `/Blog/gongbi-silk-dark-background/Gemini_Generated_Image_gongbi-silk-dark-background.webp`（順便修正了原本少一層子資料夾的錯誤路徑）。Blog 端舊檔 `cover-gongbi-silk-dark-background-v4.webp`（等距 3D／深藍紫舊風格）已不再被引用，保留原檔未刪除。

## fung-cover 上雲狀態

bianjiaopie 不進 LatticeCast `fung-cover` 表（邊角派與 LatticeCast 發布體系分開），本步驟略過 upsert。
