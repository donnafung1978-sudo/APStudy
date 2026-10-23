解剖生理學溫習 — PWA Flat（無子資料夾版）
==========================================

這個版本所有檔案都放在同一層，沒有 icons / audio / atlas 子資料夾。
適合 Cloudflare Pages 這類「只可以拖檔案、拖不到 folder」的上載介面。

上載方法：
1. 解壓這個 zip。
2. 打開解壓後的資料夾，按 Command+A（Windows: Ctrl+A）全選所有檔案。
3. 將所有檔案拖去 Cloudflare Pages 的 Upload 區域。
4. 部署後打開 https://你的網址.pages.dev/
5. iPhone Safari → 分享 → 加入主畫面。

注意：
- index.html 必須在網站最上層。
- 不要拖外層資料夾，否則會多一層。
- 第一次要聯網載入，之後可離線使用。
- 直接把 index.html 雙擊開啟（file://）不能啟用 service worker。
