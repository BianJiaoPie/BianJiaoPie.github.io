# 封面圖提示詞 — 膠礬水到底在幹嘛？從pH值看懂3大膠結劑衝突

> ⚠️ **無 cover-spec、風格未對齊社群**：`brand-assets/bianjiaopie/` 底下沒有 `cover-spec.md`，fallback 讀 `brand-assets/homunmage/cover-spec.md` 當跨品牌預設（clean tech-editorial 寫實電影感）。

## 英文主標＋副標（圖內文字，逐字）

- 主標：**Why Your Silk Paint Cracks**
- 副標：**pH science on why glue, gum & acrylic won't bond**

## 視覺概念

**2026-07-28 改版**：使用者不喜歡上一版的剝落特寫，指定這次換成**以膠本身為主體**——文章講的正是動物膠的化學特性（pH 值、可逆性、70 度上限）與上膠礬水的實際動作，膠液本身才是主角。

融化的琥珀色膠液，一滴懸在半空，即將落向下方絹布表面、尚未接觸的瞬間；柔和的方向光穿透液滴，透出琥珀色的通透感，絹布紋理在下方微微失焦。整組主體佔滿畫面右三分之二，左三分之一留白供疊標題。冷色調基底（石板藍＋暖白）＋單一節制暖琥珀點綴（就是膠液滴本身的顏色）。

**風格來源**：本站（bianjiaopie）brand-assets 無 `cover-spec.md`，fallback 至 `homunmage/cover-spec.md` 的跨品牌預設（clean tech-editorial 寫實電影感、冷色基底＋單一暖色點綴、主體靠右佔右三分之二、左三分之一留白——2026-07-28 版位比例修正，原為左半留白，見該檔檔頭）。

**評分（獨立子任務，5 候選，本輪全部換成以膠為主體的角度）**：分別對 5 個角度各開一個獨立 `Agent(general-purpose)` 子任務打分，子任務只拿候選描述＋rubric＋風格摘錄，不知道其他候選、不知道生成者推理：
- **膠液滴懸空落向絹布**（本次選定）18/20（主題辨識度 4、專業／可信感 5、風格一致性 4、資訊層次清楚 5）——四項全數 ≥4，直接收斂，不需重試。膠＋絹布同框，扣連「上膠礬水」這個實際動作。
- 排筆挑起膠絲、快斷未斷 16/20——主題辨識度滿分（5），但描述沒交代冷色基底，風格一致性卡在 3 分未過門檻。
- 攪拌棒拉出融膠絲線 16/20——同上，主題辨識度滿分，風格一致性同樣卡在 3 分。
- 骨膠顆粒逆光特寫（純材料肖像，無其他物件）14/20——整張畫面被暖琥珀色主導，違反「冷色基底＋單一節制點綴」，風格一致性僅 2 分；且脫離標題容易被誤認成琥珀寶石或蜂蜜。
- 骨膠顆粒泡水軟化 15/20——同樣沒交代冷色基底，風格一致性 3 分未過門檻。

> ⚠️ **本輪 5 候選風格一致性普遍偏低**：多數候選只顧著把「膠」的質感寫實，忘了在描述裡帶到「冷色石板藍基底＋方向性柔光」這個規格要求，只有膠液滴（同時帶出絹布的冷色調背景）自然滿足。之後產類似候選時，即使主體是暖色物質，描述裡也要主動點出背景/環境是冷色調，不能只靠風格摘錄硬掛在提示詞裡。

## 提示詞（貼進 DALL·E／ChatGPT／Gemini／Ideogram）

```
Cinematic editorial 3D render, photorealistic materials and lighting, shallow depth of field. Extreme macro of a single droplet of warm amber-colored molten animal glue, suspended mid-air, falling toward the textured surface of a silk fabric swatch below — captured the instant just before contact. Soft directional light passes through the translucent droplet, making it glow warmly from within; the silk surface beneath is softly out of focus, rendered in cool slate-blue and warm off-white tones. The glue droplet is the single warm accent in an otherwise cool-toned scene — no other warm colors elsewhere in the frame. Soft atmospheric, directional lighting. The entire subject occupies the RIGHT TWO-THIRDS of the frame; the entire LEFT THIRD of the frame is empty negative space reserved for title text — no gradients, textures, or objects competing for attention there.

Overlay text in the left third of the frame, vertically centered. Choose a text color with strong contrast against whatever that left-side background actually renders as (light or dark) — do not default to a fixed color:
Headline: "Why Your Silk Paint Cracks" — bold sans-serif, largest size, up to two lines.
Below the headline, a very short thin horizontal accent line — only about 1.5x the width of a single headline letter, NOT spanning the text block — positioned between the headline and subhead, in the same warm amber accent color as the glue droplet.
Subhead: "pH science on why glue, gum & acrylic won't bond" — placed below that short accent line, regular weight (much lighter than headline), same color as the headline, one line, noticeably smaller than headline.

No other text, no gibberish letters, no random words, no watermark, no third-party logo, no UI screenshots, no Chinese characters. Wide 16:9 banner, 1920x1080. Keep the droplet, the silk surface, and the text within the central 1.91:1 (1200x630) safe zone so nothing critical is cropped when shared as an OG social preview — avoid placing key elements flush against any edge.
```

## 出圖後存檔路徑

中英共用一張：`Blog/silk-painting-binder-compatibility/cover-silk-painting-binder-compatibility.webp`（對齊文章 frontmatter 待補的 `image:` 欄位）。

## fung-cover 上傳

**跳過**——bianjiaopie 與 LatticeCast 發布體系分開，不進 fung-cover 表。
