# Portfolio 作品卡

每件作品放在 `Portfolio/works/{作品代號}/`，以該資料夾的 `index.md` 作為唯一資料來源；圖片統一放在同層 `images/`。

## 新增流程

1. 複製 `_template.md` 到 `works/{作品代號}/index.md`。
2. 填完 frontmatter 的必填欄位。
3. 將網頁版主圖放進 `images/cover.webp`，填好 `cover_alt`，再把 `cover_ready: false` 改成 `true`。
4. 用正式圖片取代內文的細節圖／創作過程圖預留框。
5. 完成校對後把 `published: false` 改成 `published: true`。

原始高解析檔不放進公開 repo；網站圖片使用移除定位資訊的 WebP 或 JPEG。
