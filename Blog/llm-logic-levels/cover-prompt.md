# 封面圖提示詞 — LLM 邏輯進階筆記：從一問一答到分工協作，六個層級

> ⚠️ **無 cover-spec、風格未對齊社群**：`brand-assets/bianjiaopie/` 底下沒有 `cover-spec.md`，依 skill 規則 fallback 讀 `brand-assets/homunmage/cover-spec.md` 當跨品牌預設（等距 3D 基調，2026-06-03 拍板）。bianjiaopie 之後若要建立自己的視覺規格，建議另開 `brand-asset-setup` 補這份檔案。

## 英文主標＋副標（圖內文字，逐字）

- 主標：**Six Levels of LLM Logic**
- 副標：**From single-shot Q&A to parallel AI workflows**

## 視覺概念

六個等距立方平台由左下往右上呈階梯狀堆疊，每階微微向右上位移；最低階台面上是一個孤零零的對話框圖示，最高階台面上是三個並排發光的小節點（代表平行工作）；階梯之間有細光帶連接暗示流程演進；主體整體推向畫面右半，左半留空。

風格來源：`brand-assets/homunmage/cover-spec.md`（跨品牌 fallback，非 bianjiaopie 專屬）。

獨立評分（5 候選、各自獨立 Agent 打分，不自評；rubric：主題辨識度／專業可信感／風格一致性／資訊層次，各 0-5）：

| 候選 | 主題辨識度 | 專業可信感 | 風格一致性 | 資訊層次 | 總分 | 結果 |
|---|---|---|---|---|---|---|
| **堆疊管線／升階梯（採用）** | 4 | 5 | 5 | 4 | **18/20** | 合格，最低項 4 分，直接收斂 |
| 分岔管道 | 4 | 4 | 5 | 4 | 17/20 | 合格，未採用（次高分） |
| 六個發光方塊樓梯 | 4 | 4 | 5 | 3 | 16/20 | 不合格（資訊層次 <4，符號過雜） |
| 生長中的助理小人偶 | 3 | 3 | 3 | 3 | 12/20 | 不合格（偏童趣、與風格基調衝突） |
| 節點網絡收束 | 3 | 2 | 3 | 4 | 12/20 | 不合格（落入 AI 陳腔濫調意象） |

## 提示詞（可直接貼進 DALL·E／ChatGPT／Gemini 等生圖工具）

```
Clean isometric 3D illustration, deep navy + violet/purple palette, soft studio lighting, minimal uncluttered background. Six simple glowing isometric platform blocks arranged in an ascending staircase from bottom-left to top-right, each step offset slightly further right and upward. The lowest platform holds a single small speech-bubble icon, standing alone. The highest platform holds three small glowing nodes arranged side by side, representing parallel work. Thin glowing light trails connect each step to the next, suggesting progression. The entire staircase composition is pushed to the RIGHT half of the frame; the entire LEFT HALF is empty negative space reserved for title text.

Overlay text in the left third of the frame, vertically centered, clean bold sans-serif, white text, headline larger than subhead:
Headline: "Six Levels of LLM Logic"
Subhead: "From single-shot Q&A to parallel AI workflows"

No other text, no gibberish letters, no random words, no watermark, no third-party logo, no Chinese characters. Wide 16:9 banner, 1920x1080. Keep the staircase and light trails within the central 1.91:1 (1200x630) safe zone so nothing critical is cropped when shared as an OG social preview — avoid placing key elements flush against any edge.
```

## 出圖後

存成 `Blog/llm-logic-levels/cover.webp`，補進 `index.md` frontmatter：

```yaml
image: /Blog/llm-logic-levels/cover.webp
image_width: 1920
image_height: 1080
```

補完後 og:image／twitter:image／JSON-LD image 會被 jekyll-seo-tag 自動一起補齊（不用手動寫 meta 標籤），`tech-seo.md` 裡記錄的 schema.org FAIL 也會轉 PASS。

## fung-cover 上傳

**跳過**——bianjiaopie 與 LatticeCast 發布體系分開（2026-07-14 拍板），不進 fung-cover 表。
