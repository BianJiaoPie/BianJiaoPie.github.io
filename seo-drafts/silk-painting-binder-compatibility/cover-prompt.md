# 封面圖提示詞 — 膠礬水到底在幹嘛？從pH值看懂3大膠結劑衝突

> **風格來源**：`brand-assets/bianjiaopie/cover-spec.md`（邊角派自有規格，2026-07-31 建立）——**繪畫線＝紀實／檔案靜物攝影**、版位鏡像（主體左三分之二、文字右三分之一）、亮場冷灰、單一低飽和暖點綴。不再 fallback homunmage。
> **2026-07-31 重跑**：舊版（07-28）依 homunmage 跨品牌預設產出，實際出圖後人審判「太像蜂蜜」。診斷見 cover-spec 檔頭——`cinematic editorial 3D render ＋ photorealistic materials` 遇到液體／有機材料主體會塌陷成食品廣告攝影。本版整份重做：換渲染語言、換版位、換主體。

## 英文主標＋副標（圖內文字，逐字）

- 主標：**Why Your Silk Paint Cracks**
- 副標：**pH science on why glue, gum & acrylic won't bond**

（沿用舊版文案——舊版人審的不滿在圖不在字，主標 4 詞、副標 9 詞皆在規格內，不做無謂更動。）

## 視覺概念

**主體全部來自文章字面**，不發明隱喻：文章開場的鉤子就是「你在絹本上疊了好幾層顏料，某天發現底層開始**一小片一小片剝落**」；明礬是文章定義過的「含結晶水的硫酸鉀鋁複鹽，無色透明」，且已有一張八面體結晶內文圖。

一小塊繃在細木框上的絹本平放在淺冷灰工作檯面上，正常觀看距離、微側角。絹面上的顏料層一小片一小片翹起、剝離，捲起的膜緣清晰可辨，底下露出裸絹的經緯織紋；旁邊擱著一只小淺碟，裝著幾顆透明的明礬八面體結晶。自然側向窗光、霧面質感，檯面有真實粉塵、細纖維與長期使用的刮痕。整體亮場冷調（淺冷灰＋藍灰），**唯一的暖色點綴是生絹本身的米黃與木框的溫潤木色**。主體整組佔畫面左三分之二，右三分之一是空的檯面留給疊字。

**明暗判定**：依 cover-spec，主體靠**質地／結構**說話（絹絲織紋、顏料膜翹起的斷面、結晶稜面）→ 走**亮場**。這同時天然避開了舊版「暗場＋內部發光」滑向廣告語彙的路徑。

**獨立評分（5 候選，各 spawn 一個獨立 `Agent(general-purpose)` 子任務打分，子任務只拿候選描述＋rubric＋cover-spec 摘錄）**：本候選 **19/20**（主題辨識度 4、專業可信感 5、風格一致性 5、資訊層次 5），主題辨識度過硬門檻、其餘三項最低 5 分，直接收斂、不需重試。
- 剝落絹本＋明礬碟（**本次選定**）19/20
- 明礬結晶與骨膠顆粒中間留白 19/20 — 同分，依 tie-break 落選：兩小堆材料的視覺體量撐不起左三分之二，要填滿得硬凹；且需具備材料常識才認得出結晶是明礬。選定候選的繃框絹本是有邊界、有體量的實體，天然貼合版位。
- 三塊絹本試片對照樣本 18/20 — 專業感滿分，但評分者指出手寫紙籤與翹曲絹面有散出**多處**米黃暖色的風險，違反「單一暖點綴」。
- 膠礬水工序靜物（玻璃碗＋排筆＋膠鍋＋溫度計）17/20 — 玻璃碗＋透明液體＋蒸氣有滑向「玻璃糖高光／焦散」的風險，且後方鍋與溫度計是第二視覺焦點、可能侵入標題區。
- 三只瓷碟並置三種膠結劑 14/20 — **主題辨識度僅 3、未過硬門檻**：三碟並排讀得出「三體系比較」但讀不出衝突；且評分者指出「琥珀色骨膠＋乳白壓克力」構成第二處暖色，直接踩禁止清單。

> **兩位評分者都提醒的補件**：選定候選原描述沒指定暖色點綴，冷灰基底＋透明結晶會全冷。已在提示詞中明確鎖定**生絹米黃＋木框木色為唯一暖點綴**，並加上 `no other warm color anywhere in the frame`。

## 提示詞（貼進 DALL·E／ChatGPT／Gemini／Ideogram）

```
Documentary still-life photography, medium format, natural soft window light from the side. A small piece of silk stretched on a thin wooden frame lies flat on a pale cool-grey work surface, photographed at normal viewing distance (not macro), at a slight angle. On the silk, layers of paint have lifted and flaked away in small irregular patches — the curled edges of the paint film are clearly visible, and beneath them the bare silk weave shows through. Beside the frame sits a small shallow dish holding a few transparent octahedral alum crystals. Everything is matte: real dust, fine fibers, faint scratches and signs of long use on the work surface. Overall a light, cool-toned scene — pale cool grey and soft blue-grey — with the warm tone of the raw silk and its wooden frame as the single restrained, desaturated warm accent; no other warm color anywhere in the frame. Shallow depth of field. The silk frame and the dish together occupy the LEFT TWO-THIRDS of the frame; the entire RIGHT THIRD is empty work surface reserved for title text, with nothing placed there. No glossy specular highlights, no caustics, no droplets or splashes, no pedestal or display stand, no seamless studio backdrop, no advertising gloss, no flawless spotless surfaces, no dramatic rim light.

Overlay text in the right third of the frame, vertically centered. Choose a text color with strong contrast against whatever that right-side background actually renders as (light or dark) — do not default to a fixed color:
Headline: "Why Your Silk Paint Cracks" — bold sans-serif, largest size, up to two lines.
Below the headline, a very short thin horizontal accent line — only about 1.5x the width of a single headline letter, NOT spanning the text block — positioned between the headline and the subhead, in the same desaturated warm silk/wood tone used as the accent.
Subhead: "pH science on why glue, gum & acrylic won't bond" — placed below that short accent line, regular weight (much lighter than headline), same color as the headline, one line, noticeably smaller than headline.

No other text, no gibberish letters, no random words, no watermark, no third-party logo, no UI screenshots, no Chinese characters. Wide 16:9 banner, 1920x1080. Keep the silk frame, the dish and the text within the central 1.91:1 (1200x630) safe zone so nothing critical is cropped when shared as an OG social preview — avoid placing key elements flush against any edge.
```

## 出圖狀態

✅ **已出圖並通過人審（2026-07-31）**：`Gemini_Generated_Image_silk-painting-binder-compatibility.png`（1376×768，暫存於本資料夾）。逐項核對 cover-spec 全數命中，**本張已被指定為繪畫線的風格參照範本**（見 `brand-assets/bianjiaopie/cover-spec.md` D 段）。

> 附註：右下角有 Gemini 的四芒星浮水印，`no watermark` 擋不掉（工具端簽名）。已判定可接受、在 OG 安全區內。

發布時的目標路徑（中英共用一張）：`Blog/silk-painting-binder-compatibility/cover-silk-painting-binder-compatibility.webp`，並對齊文章 frontmatter 待補的 `image:` ／ `image_width` ／ `image_height` 三欄。**轉檔搬移與 frontmatter 補件屬發布階段、由使用者自行處理**（本 skill 工作邊界止於提示詞）。

## 舊版產出（保留備查）

`ChatGPT Image 2026年7月31日 上午11_53_55.png`——舊規格產出，同時踩中懸空液滴、玻璃高光與焦散、高飽和金黃、零瑕疵、極端微距五條，人審判「太像蜂蜜」。附帶問題：畫面下方的布被渲染成毛巾／針織質地，連「絹」的線索都沒立起來。此圖即 cover-spec 立「廣告語彙禁用清單」的實測依據。

## fung-cover 上傳

**跳過**——bianjiaopie 與 LatticeCast 發布體系分開，不進 fung-cover 表。
