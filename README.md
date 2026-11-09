# MyNote

手機優先的私人純文字筆記 PWA。支援 Android Edge / Windows Edge；使用 Cloudflare Workers + SQLite-backed Durable Object。

正式入口：https://mynote.christorng.workers.dev/

## 第一版 v0.1 功能
- 分類：新增、重新命名、刪除。刪除分類時筆記移到預設分類，不會丟失。
- 可收合的快速輸入框，點選展開；文字第一行是標題、第二行是內容預覽，超長單行漸隱。
- 紀錄筆記建立時間、最後修改時間、來源裝置 ID 及自訂名稱。
- 每筆筆記只有來源裝置可以編輯及封存，其他裝置唯讀。
- 有「目前筆記」與「已封存」視圖、搜尋、取消封存。
- IndexedDB 逐次儲存及待同步佇列。離線仍可編輯；重新連線時自動傳送。
- WebSocket 變更通知與可見頁面定期輪詢，其他裝置無須手動重新整理。
- 首次輸入高強度登入碼與裝置名稱，取得長期 HttpOnly Secure Cookie（180 天、持續使用會續期）。
- Service Worker 提供已載入頁面的離線快取。

## 安全邊界
**v0.1 尚未實作端對端加密（E2EE）與獨立備份。** 後端目前儲存明文，Cloudflare 資料庫管理者有能力讀取。對高度敏感筆記，請先完成端對端加密與還原驗收。

GitHub 儲存庫僅有公開程式碼，不含登入碼明文或私人筆記。部署設定的 SETUP_CODE_HASH 是隨機高熵登入碼的 SHA-256 雜湊，儲存在 Cloudflare Worker plain_text 綁定中，而非 GitHub。若重新部署，必須保留這個綁定。來源裝置限制是同步規則，不是硬體防偽身分驗證。

IndexedDB 可以降低離線及切換 App 的資料遺失風險，不能保證裝置故障、清除網站資料、交易尚未完成時絕不遺失。請確認「已同步雲端」狀態。

## 原始碼
- src/worker.js：認證、Session、資料庫、HTTP API 與 WebSocket
- src/ui.js：純 HTML / CSS / JavaScript 介面與 IndexedDB 自動儲存

## Cloudflare 部署
Worker 名稱：mynote
Workers 網域：christorng.workers.dev
相容性日期：2025-12-01
主模組：worker.js（由 src/worker.js 提供）
第二模組：ui.js（由 src/ui.js 提供）
Durable Object binding：STORE，class：MyNoteStore
首次 migration：v1 / new_sqlite_classes MyNoteStore
環境綁定：SETUP_CODE_HASH（高強度登入碼的 SHA-256 hex）

後續程式碼修改使用官方 GitHub 連接器；部署使用 Cloudflare 連接器。尚未配置 GitHub Actions 自動部署，提交 GitHub 不會自動更新正式網站。

## 使用
先在手機 Edge 開啟網址，輸入一次登入碼與裝置名稱；再於 Windows Edge 同樣登入，兩者會得到不同 deviceId。新筆記直接輸入、編輯、封存；其他來源裝置的筆記會顯示「唯讀」。可在裝置按鈕修改裝置名稱。

## 驗收狀態
已完成 GitHub 寫入、Cloudflare API 程式上傳、綁定及 100% 部署狀態檢查，並完成前端 JavaScript 語法檢查。由於驗證環境對新 workers.dev 網址的網路存取受限，尚未完成實際瀏覽器登入／資料寫入／斷線復原的端對端測試。
