# todo

~~ ## 2026-07-29~~
- ~~用 brand-asset-setup skill 幫 bianjiaopie 建一份自己的 cover-spec.md~~ ✅
- ~~生成 silk-painting-binder-compatibility 封面圖~~ ✅

## 2026-07-31（未完成，接續）

### 收尾
- ~~**commit**：cover-spec、3 份 cover-prompt、Blog 新文、4 支 skill 改動全都還沒 commit~~ ✅（本 repo `ad56625`＋`2459fff`；skill 在 pom-fung `24a0980`＋`bfa47c9`）
- **seo-article changelog**：版本已 bump 到 0.17.8（改了內鏈依賴檢查為 per-vendor），但沒寫 changelog（該筆說明目前只寫在 seo-tech-setup changelog v0.8.0 段末）
- **site profile 重構的體檢重掃**：照 restructuring checklist「修正本身也是一次改動」，要重跑 #1 方向A/B、#4 跨檔 link、#5 兩端對帳，直到掃不出新的

### ~~silk-painting-binder-compatibility（已進 Blog、未 commit）~~ ✅
- ~~**social-platform-adapt 還沒跑**~~ ❌ **作廢**：08-04 產出 10 檔後同日改策略——FB／X 退出經營、三個主經營平台一律不主動生 AI 文章，這條流程對本站停用。10 檔留當素材、已放 `social/README.md` 標記作廢（gongbi 那 4 檔同辦）
- ~~**`social-platform-adapt` skill 認不得「不主動生 AI 文章」**——只讀「主經營／輔」欄，再跑一次仍會產 Threads／IG 貼文，要擋得改 skill~~ ✅（08-11：skill v0.17.0 新增 AI 產文資格閘門；全品牌禁用直接 SKIP、個別平台禁用則排除）
- ~~gongbi 那篇加一條回鏈到本篇，形成內鏈對~~ ✅ 08-04 加在〈為什麼深色背景這麼難〉節，`last_modified_at` 已推

### 待驗證（skill 改完沒實跑過）
- `cover-image-prompt` 端到端沒跑過（silk-painting 那次是我手動照新規則跑的；版本已滾到 v0.17.2）
- `seo-tech-setup` 的 site profile 路由沒實跑過——下一篇文章就是驗證時機（版本已滾到 v0.9.0）
- cover-spec **程式線**規格尚無實圖驗證（繪畫線已定案）

### 站台層級
- **做 logo／favicon**：`cover-spec.md` C 段的洞。做了可一次解決封面角標 ＋ schema publisher（後者不影響 Google 資格，優先度低）
- ~~`index.md` / `site.json` 有未 commit 的標題改動（不是我改的，你自己確認）~~ ✅ 已隨 `ad56625` 一起進版
