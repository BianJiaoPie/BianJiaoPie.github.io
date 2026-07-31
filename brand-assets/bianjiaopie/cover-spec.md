# cover-spec — 邊角派（BianJiaoPie）

> **決策摘要**（記錄；待翻點以對話框為準）
> - **這份是什麼**：voice-spec 的視覺孿生——voice-spec 定「文字怎麼寫」，本檔定「封面怎麼長」。下游 `cover-image-prompt` 的第一順位視覺真源；本檔存在後，該 skill **不再 fallback 讀 `brand-assets/homunmage/cover-spec.md`**。
> - **建檔理由**：既有 3 份 cover-prompt 全都掛著「⚠️ 無 cover-spec、fallback homunmage」在跑。homunmage 是工具／工程品牌，邊角派是**雙線個人專業站**，繪畫線的視覺需求 homunmage 那份完全沒涵蓋。
> - **現況反推來源**：2 張已出圖封面（`ChatGPT_Image_llm-logic-levels.webp`、`Gemini_Generated_Image_gongbi-silk-dark-background.webp`）＋ 3 份 cover-prompt 的踩坑筆記。信心：中高。
> - ✅ **2026-07-31 人審通過、定稿（對話框簽核）**，四項拍板：
>   - **「淡與幽」拆兩層**（推翻初稿）：初稿把深墨底鎖成規格，人審指出**明度該由文章內容決定**（例：花卉透光正因深背景才凸顯）。定案＝**「淡」全站鎖死**（低飽和／留白／單一點綴）、**「幽」降為每篇變數**（明暗由主體性質決定，見 A 段明度規則），**唯一恆定的是冷側色溫**。
>   - **版位分流**：程式類跟隨 homunmage（文字左）、**繪畫類左右鏡像**（文字右）、生活類沿用程式版位。共 2 種版位。
>   - **收回初稿的「允許空白帶」**：人審「占比不動」——1/3 : 2/3 嚴格互補、無空白帶。留白改由**主體區內部的空場與大氣層次**表現，不靠撐大文字區偷。
>   - **生活類不立第三版位**：低權重 Hygiene 切片不值得吃掉一個識別維度，「輕快」改由光線與主體數量表現。
> - 取預設：**點綴色不鎖死**，隨該篇真實材料走（膠＝琥珀、朱砂＝硃紅）。homunmage 鎖死 amber，鎖死會逼繪畫題說謊。
> - ✅ **2026-07-31 追加人審（對話框簽核）：渲染語言由「全站鎖死」改為「按線分流」，繪畫線＝紀實／檔案靜物攝影**。
>   - **觸發事件**：`silk-painting-binder-compatibility` 照舊規格生出的封面（`ChatGPT Image 2026年7月31日 上午11_53_55.png`）被人審判「太像蜂蜜」。
>   - **實圖診斷**：`cinematic editorial 3D render ＋ photorealistic materials` 遇到**液體／有機材料**主體時會塌陷成**商業產品／食品廣告攝影**——懸空液滴、玻璃般高光與內部焦散、高飽和金黃、零瑕疵零粉塵。同一套風格在 `llm-logic-levels` 的霧面玻璃對話泡上成功，是因為霧面幾何體**沒有廣告原型可對應**；換成有機材料，模型最近的視覺原型就是廣告。
>   - **推論**：繪畫線的主體幾乎都是真實物質（膠、礬、絹、礦物顏料），**全部會踩同一個坑**，不是單篇失誤。
>   - **真正的軸線是「廣告 vs 紀錄」，不是 3D vs 手繪**——差別在打光與完成度，不在媒材。
> - ✅ **2026-07-31 追加人審②（對話框簽核）：程式線同樣去廣告化，兩線共用「紀錄者的目光」**。
>   - **起因**：人審質疑「程式／LLM 偏科技感，寫實撐得起嗎」。
>   - **回查既有成品後的診斷**：`llm-logic-levels` 那張其實踩了**同一個病**——霧面玻璃物件 ＋ **基座（pedestal）** ＋ 內部發光 ＋ 戲劇打光 ＝ **產品發表會／香水廣告**構圖。與蜂蜜那張同源：寫實渲染一個發明物，模型最近的原型就是產品攝影。差別只在該張被喜歡、沒被判為問題。
>   - **定案**：病因不是「寫實撐不起科技感」，而是**「追求科技感」本身是陷阱**——搜科技感必收斂到藍色電路板／發光核心／資料流粒子，那整串正是 `cover-image-prompt`「絕對不要」清單。邊角派程式文章的本質是**教學筆記與實驗紀錄**，該有的氣質是「工程手冊」不是「發表會」，**與繪畫線的「紀實／檔案」是同一種氣質**。
>   - **做法（人審選 ①，最小改動）**：程式線**保留發明隱喻物**（維持主題辨識度這個硬門檻），但拿掉基座、拿掉內部發光、拿掉戲劇打光，把物件放進真實環境。渲染語言仍是 3D，只有打光與擺法改走紀錄語彙。
>   - **未採用的方向**：②工程製圖感（風險：滑進禁用的「抽象圖表式構圖」）、③真實工作場景靜物「作者的兩張工作臺」（家族感最強，但抽象題會變成「一張好看的桌子」、主題辨識度風險高）——兩者留檔備查，日後想加強兩線統一感時可再議。
>   - **附帶效益**：兩線共用同一種紀錄者目光，兌現了 seo-strategy 品牌敘事第②層「**交界**」（前端做「介面」、膠彩管「界面」）。
> - ✅ **2026-07-31 繪畫線定案（對話框簽核，已有實圖驗證）**：依本規格重跑 `silk-painting-binder-compatibility` 並實際出圖，人審通過。**`Gemini_Generated_Image_silk-painting-binder-compatibility.png` 即繪畫線的風格參照範本**，日後繪畫題比照此張。逐項核對全數命中：亮場冷灰白冷側基底／紀實靜物語彙（真實刮痕與粉塵、自然柔光）／主體左三分之二・文字右三分之一／單一低飽和暖點綴（木框木色，色帶同色）／亮場配深冷灰字／廣告語彙禁用清單零違規／主題辨識度成立（翹起剝離的膜片一眼可辨）。
> - ⏳ **程式線尚未實圖驗證**：去廣告化的關鍵詞已寫入 D 段，但還沒有任何一張照新規格產出的程式線封面。下一篇程式線文章出圖後再回頭確認、補簽核。
> - 標洞：**無 logo 檔**（全站找不到任何 logo／favicon 圖檔）→ C 段標洞、封面暫不疊 logo。
> - 不適用段：B（實體字型檔）／F（影像 API）是 homunmage 為未來程式疊字管線準備的；邊角派是生圖工具直接疊字，標「不適用」並說明理由，不留空欄假裝待填。

---

## ★ 全站鎖死的三件事（家族感的真正來源）

版位可以左右翻、明暗可以變、渲染語言可以按線分流，但**這三件任何一篇都不准動**。只要它們不動，其餘變化讀起來是「有節奏的變奏」，不是「不一致」。

1. **寫實度與景深**：寫實材質與光、淺景深、單一主體。（**渲染語言本身按線分流**——見 D 段；分流的是「用什麼語彙拍」，不是「寫不寫實」。）
2. **色溫結構**：**冷側基底 ＋ 唯一一處暖點綴**。畫面裡不准出現第二處暖色。
3. **分割比例與文字排版**：`1/3 文字 : 2/3 主體`、互補無空白帶；主標粗體 ≤2 行 ／ 短色帶 ／ 細副標單行——完全固定（細節見 D 段）。

> **2026-07-31 修訂**：初稿把「渲染語言（cinematic editorial 3D）」列為第 1 條鎖死項，繪畫線實測翻車後降級——鎖死的是**寫實度與景深**這個更底層的性質，具體用哪套攝影／渲染語彙按線分流。

---

## A. 色彩

### 恆定：色溫

基底 hue **永遠落在冷側**（藍／青／冷灰），不論明暗。暖色只出現在單一點綴。這是「淡與幽」裡**不變的那一半**。

### 變數：明度（由主體性質決定，不由題材類別決定）

| 走哪種 | 觸發條件 | 為什麼 | 實例 |
|:---|:---|:---|:---|
| **暗場** | 主體靠「**光**」說話——透光、發光、逆光、自體光源 | 暗底才看得見光 | 絹的半透明、膠液通透、玻璃對話泡 |
| **亮場** | 主體靠「**質地／結構**」說話——纖維、筆觸、榫接、表面肌理、顆粒 | 側光打表面才有肌理，暗場會吃掉細節 | 紙紋、礦物顏料顆粒、木框工序、線材 |

- 暗場基底：`~#0E1620` ~ `~#16202C` 深墨藍近黑（目視參考，取自兩張既有封面）
- 亮場基底：冷灰白／霧藍（**不是暖白底**——暖白會破壞冷側鐵律）
- **⚠️ 亮場的點綴要加深、加飽和**：暗場那套「微光」壓在冷灰白上會直接糊掉，亮場的暖點綴必須更實、更沉，才跳得出來。

### 點綴色（每張限一處，隨主題真實材料走、不鎖死）

| 情境 | 點綴色 | 出處 |
|:---|:---|:---|
| 預設／無材料指涉 | `~#E8A33D` muted amber | `llm-logic-levels` 封面 |
| 繪畫題、材料本身有色 | 取該材料的真實色（朱砂／彼岸花 `~#C64A3C` 硃紅、動物膠 `~#D9A05B` 琥珀） | `gongbi-silk-dark-background`／`silk-painting-binder-compatibility` |

### 文字與色帶

- **標題文字色不寫死**——跟著該張文字區實際渲染的明暗走（暗場→暖白 `~#F2EFE6`，非純白；亮場→深冷灰）。主標副標永遠同色。
- **色帶用該張的點綴色**，靠色溫反差跳出來，不靠明暗。

> **「淡」的紀律**：點綴是**一處**、且**克制**。`gongbi-silk-dark-background` 第一輪就是敗在紅色搶戲、風格一致性卡分，把紅光範圍收小才過。飽和度寧可再降一階，不要濃豔。

## B. 字體

**不適用（現行流程無此需求）。**

圖內文字由**生圖工具直接疊上**（見既有 cover-prompt 的提示詞尾段），不是程式後製疊字，故不需實體 `.ttf/.otf` 路徑。提示詞只指定樣式：主標 `bold sans-serif`、副標 `regular weight`；**圖內文字一律英文**（中英共用一張，中文字生圖會崩）。

> 未來若改走程式疊字（中文標題上圖），再回頭補字型檔路徑——屆時務必挑有完整繁中字符的字型（Noto Sans TC／思源黑體），否則會出現缺字方框。

## C. Logo

- [ ] logo 檔路徑：**（洞）全站無 logo／favicon 圖檔**
- [x] 現階段規則：**封面不疊 logo**——沒有檔案可疊，且大留白畫面多一個角落標記會破壞留白本身。
- [x] 未來若做 logo：依 seo-strategy「品牌敘事」段**走角落意象**（「邊角」的①層含義），擺放在**主體所在角的對角**，寬度 ≤ 畫面寬 8%。

## D. 版面 / 安全區

### 兩種版位（比例恆為 1/3 : 2/3，互補無空白帶）

```
程式類（＝ homunmage 同步）           繪畫類（左右鏡像）
┌──────────┬────────────────┐    ┌────────────────┬──────────┐
│ HEADLINE │                │    │                │ HEADLINE │
│ ──       │    ▓ 主體 ▓    │    │    ▓ 主體 ▓    │ ──       │
│ subhead  │                │    │                │ subhead  │
└──────────┴────────────────┘    └────────────────┴──────────┘
   左 1/3 字      右 2/3 圖          左 2/3 圖        右 1/3 字
```

繪畫類鏡像的額外好處：閱讀順序是左→右，文字在右代表**畫先被看見、字後被讀到**——對繪畫題這是對的優先序。

### 版位判定規則（給下游，按「主體性質」判、不按 content-domains 的環判）

1. 主體是**程式／介面／抽象系統概念** → **程式版位**（文字左）
2. 主體是**實體繪畫材料／作品／工序** → **繪畫版位**（文字右）
3. 兩者皆非（生活手作、旅遊、心得、雜談） → **程式版位**，走下方「生活變奏」

> 刻意不照環判：content-domains 延伸圈的「部落格經營／寫作工作流」主體是程式（走①）、「電繪／數位作品整理」主體是作品（走②）——按環分會分錯。

### 生活變奏（只動光線與主體數量，不動版位）

| 動 | 不動 |
|:---|:---|
| 明度提高（**亮場**，冷灰白／晨光感） | 版位、比例 |
| 光更散更柔（不是戲劇性側光） | 色溫（仍冷側＋單一暖點綴） |
| 主體 2–3 件小物組合（仍錨在一角） | 文字排版 |

### 留白的定義（★ 別誤解）

留白**不是靠版位偷來的空白帶**，是**主體區內部的空場與大氣層次**——右 2/3 裡可以只有角落一個小物、其餘是有深度的暗場或霧氣。「馬一角」講的是主體收在角落、其餘留給氛圍，不是把文字區撐大。

### ★ 渲染語言（按線分流，2026-07-31 定）

軸線是「**廣告 vs 紀錄**」——不是 3D vs 手繪，是**打光與完成度**。廣告語彙＝戲劇高光、零瑕疵、懸空、極端微距；紀錄語彙＝自然散光、有粉塵與瑕疵、物件放著、正常距離。

**兩線共用「紀錄者的目光」**，差別只在拍什麼、以及主體是真實物還是發明物：

| 線 | 主體 | 渲染語言 | 為什麼 |
|:---|:---|:---|:---|
| **繪畫線** | **真實物質**（膠、礬、絹、礦物顏料） | **紀實／檔案靜物攝影**（documentary / archival still life） | 走廣告語彙必塌成食品／化妝品廣告——已實測翻車 |
| **程式線／生活線** | **發明的隱喻物**（抽象主題無實體，必須發明；保留它才守得住「主題辨識度 ≥4」硬門檻） | **去廣告化的寫實 3D**——仍是 3D 渲染，但**打光與擺法改走紀錄語彙** | 產品發表語彙同樣會塌（`llm-logic-levels` 的基座＋內部發光即是），且「追求科技感」會收斂到 AI 俗套 |

**參照物**
- 繪畫線：博物館修復室紀錄照、材料科學論文圖版、中片幅靜物檔案攝影。**不是**產品型錄、不是食譜書。
- 程式線：工程手冊、實驗紀錄、桌上放著的原型物件。**不是**產品發表會、不是精品廣告。

### ★ 廣告語彙禁用清單（★ 全站必守，兩線都適用）

**通用（兩線）**

- ❌ **玻璃糖般的鏡面高光與內部焦散**（specular highlight、caustics）
- ❌ **零瑕疵、零粉塵、完美無暇的表面**——紀實感來自瑕疵
- ❌ 戲劇性逆光／輪廓光把主體整個點亮
- ❌ 高飽和色（違反「淡」的紀律）

**繪畫線加碼（食品／化妝品廣告語彙）**

- ❌ **懸在半空的完美液滴／飛濺／潑灑**——最強套路，一出現就切換語義
- ❌ **極端微距單一物件**（extreme macro）——正常觀看距離即可
- ❌ **通透高飽和的金黃／琥珀**——真實動物膠是**霧的、濁的、表面會結皮**，不是琥珀寶石

**程式線加碼（產品發表會語彙）**

- ❌ **基座／展示台（pedestal, plinth, display stand）**——這是產品發表最強的單一訊號
- ❌ **物件內部發光／自體光源**（glowing from within）
- ❌ 無菌的純色無限背景（seamless studio backdrop）——改放進**真實環境**（桌面、工作臺、有邊界與雜訊的空間）
- ❌ 「科技感」通用素材：藍色電路板、發光核心、資料流粒子、幾何形狀交疊

> **實測依據**
> ① `ChatGPT Image 2026年7月31日 上午11_53_55.png`（silk-painting-binder-compatibility 舊規格產出）同時踩中繪畫線前五條，人審判「太像蜂蜜」。附帶問題：畫面下方的布被渲染成毛巾／針織質地，連「絹」的線索都沒立起來——**絹要明寫平滑、細經緯、微光澤**。
> ② `ChatGPT_Image_llm-logic-levels.webp` 踩中程式線的基座＋內部發光；該張人審當時滿意，但回查判定為同源問題，故一併立禁。

### 底圖固定關鍵詞（每張都帶，`{}` 依該篇填）

**繪畫線**：

```
documentary still-life photography, medium format, natural soft window light,
photorealistic matte surfaces with real dust and imperfection, objects at rest on a surface,
normal viewing distance (not extreme macro), shallow depth of field,
{deep ink-dark | light cool-grey} base — always a COOL hue (blue / teal / cool grey), never warm,
a single restrained desaturated warm accent and no other warm color anywhere in the frame,
subject anchored toward one corner with generous negative space treated as atmospheric depth
rather than blank fill, subject occupying the {RIGHT | LEFT} two-thirds of the frame,
the entire {LEFT | RIGHT} THIRD kept empty for title text (no gradients or objects competing there),
no glossy specular highlights, no caustics, no mid-air droplets or splashes, no advertising gloss,
no text other than the specified headline and subhead, no third-party logo, no Chinese characters,
wide 16:9 banner
```

**程式線／生活線**（去廣告化版，2026-07-31 定）：

```
photorealistic 3D render with a documentary, matter-of-fact quality — an object photographed
as a record, not as a product. Natural soft ambient light, no dramatic rim light, no glow from
within, matte surfaces with subtle wear and dust, shallow depth of field, normal viewing distance.
The object rests in a real environment (a work surface with edges and context), NOT on a pedestal
or display stand, NOT on a seamless studio backdrop.
{deep ink-dark | light cool-grey} base — always a COOL hue (blue / teal / cool grey), never warm,
a single restrained desaturated warm accent and no other warm color anywhere in the frame,
subject anchored toward one corner with generous negative space treated as atmospheric depth
rather than blank fill, subject occupying the RIGHT two-thirds of the frame,
the entire LEFT THIRD kept empty for title text (no gradients or objects competing there),
no pedestal, no plinth, no internal glow, no specular gloss, no product-launch aesthetic,
no circuit boards, no glowing cores, no data particles, no geometric abstractions,
no text other than the specified headline and subhead, no third-party logo, no UI screenshots,
no Chinese characters, wide 16:9 banner
```

> **程式線保留發明隱喻物**——抽象主題（「LLM 六個層級」）沒有實體，不發明就沒有主體，而「主題辨識度 ≥4」是硬門檻。改的只有**怎麼拍它**：從「陳列一件商品」改成「記錄一件東西」。

### 概念偏好

**文章自帶的具體例子 > 發明的抽象隱喻**（沿用 `cover-image-prompt` 全域鐵律）。繪畫線題材幾乎都有真實材料可拍（絹、木框、膠鍋、明礬結晶、礦物顏料、顏料碟、排筆）——**優先直接拍那些東西**，不要為了「像技術部落格」而抽象化。

> **挑主體要看文章的主幹名詞，不是掃到一個就用。** `silk-painting-binder-compatibility` 那張選了「膠液」當主體，但該詞全文只出現 **2 次**；文章真正的主幹是膠礬水（40）、絹（23）、礦物顏料（17）、明礬（11）。挑邊緣名詞當主體，等於用一個文章沒在講的東西代表整篇。

### 文字排版（固定，兩種版位共用）

- 主標：粗體、字級最大、最多兩行
- 色帶：緊接主標下方，**細線**（不是色塊）、長度約主標一個字母寬的 **1.5 倍**、位置在**主標與副標之間**
- 副標：色帶下方，一般字重（比主標細很多）、單行、字級明顯小一截、與主標同色

> **生圖踩坑筆記（已驗證，承自既有 3 份 cover-prompt）**
> ① **暖色主體要主動交代冷色環境**：`silk-painting-binder-compatibility` 那輪 5 個候選有 4 個卡在風格一致性——只顧著把「膠」的暖色質感寫實，忘了帶「環境是冷調」。**主體本身是暖色物質時，候選描述就要主動寫出環境的冷側基底**，不能只靠固定關鍵詞硬掛在尾巴。
> ② **點綴色搶戲會卡分**：`gongbi-silk-dark-background` 第一輪紅色太張揚，重試把範圍收小才過門檻。
> ③ **AI 會自己塞第三方 logo**，位置不可控——生圖時明寫 `no third-party logo`。
> ④ **輸出常是 16:9**（1.777），OG 分享裁到近 1.91:1（1200×630）——關鍵元素與文字都收在中央安全區，別貼邊。
> ⑤ **Gemini 會在右下角壓一顆四芒星浮水印**（`gongbi-silk-dark-background`、`silk-painting-binder-compatibility` 兩張都有）。負面詞 `no watermark` 擋不掉，那是工具端的簽名。目前判定可接受（在安全區內、低調），介意的話出圖後自行裁掉或修掉。

### ★ 風格參照範本

- **繪畫線**：`seo-drafts/silk-painting-binder-compatibility/Gemini_Generated_Image_silk-painting-binder-compatibility.png`（2026-07-31，本規格第一張通過人審的實圖）——繃框絹本＋剝離的顏料膜＋明礬結晶小碟，淺冷灰檯面帶刮痕粉塵，木框木色為唯一暖點綴。**日後繪畫題比照此張的調性與完成度。**
- **程式線**：⏳ 尚無（`llm-logic-levels` 那張是舊規格、且踩了基座＋內部發光，不可當範本）。

## E. 尺寸

- [x] 主尺寸：**1920 × 1080（16:9）**，文章 hero ＋ OG 共用。
- [x] OG 安全區：中央 1.91:1（1200×630）內不可有被裁到就會壞掉的元素。
- [x] 存檔：`Blog/{slug}/cover-{slug}.webp`（或生圖工具原檔名轉 webp），對齊 `index.md` frontmatter 的 `image:` ／ `image_width` ／ `image_height`——三欄齊全，`og:image`／`twitter:image`／JSON-LD `image` 由 `jekyll-seo-tag` 自動補。

> **各平台分尺寸表：現階段不做。** homunmage 那份的五平台表是為批次程式產圖準備的；邊角派一篇只出一張、手動貼進生圖工具，社群沿用同一張。等真的跑社群分平台產圖再回來補。

## F. 影像 API

**不適用。** 邊角派不跑自動生圖管線（`cover-image-prompt` 的產出止於提示詞，使用者自行貼進 DALL·E／ChatGPT／Gemini／Ideogram 出圖）。亦**不進 LatticeCast `fung-cover` 表**（邊角派與 LatticeCast 發布體系分開）。

---

## 給下游 cover-image-prompt 的一句話

**冷的色、淡的點綴、角落的主體、1/3 的字。**

貫穿全站的一句話是：**用紀錄者的目光，不用廣告的目光**——沒有基座、沒有內部發光、沒有玻璃高光、沒有懸空液滴、沒有零瑕疵的完美表面。東西是被**記錄**下來的，不是被**陳列**的。

其餘跟著題材走：明暗跟主體走（靠光說話就壓暗、靠質地說話就打亮）、版位跟題材走（程式在左、繪畫在右）、渲染語言跟題材走（繪畫＝紀實靜物攝影拍真實材料、程式＝去廣告化 3D 拍發明的隱喻物）。恆定不動的只有三件：寫實度與景深／冷底單一暖點綴／1:2 比例與文字排版。
