# MyNote

手機優先、跨裝置私人文字筆記 PWA。首版支援分類、即時本機草稿、單一來源裝置編輯、封存與搜尋，使用 Cloudflare Workers + SQLite Durable Objects。

## 安全與部署

正式資料儲存在 Cloudflare，不在 GitHub。部署時必須設定 Workers Secret `SETUP_CODE_HASH`（高強度登入碼的 SHA-256 雜湊），登入後使用 HttpOnly 裝置 Session。**目前 v0.1 尚未提供端對端加密**，擁有 Cloudflare 資料庫管理權限者仍可能取得明文內容。

詳見後續原始碼與部署設定。