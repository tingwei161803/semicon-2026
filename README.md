# SEMICON Taiwan 2026 — 導覽 Guide

> 把 SEMICON Taiwan 2026「Transform Tomorrow」的展會內容，整理成一個多頁、可互動、雙語的靜態導覽站 —— 從展會總覽、20+ 國際論壇，到主題特區、展會週程與參觀資訊。

這是一個獨立、非官方的整理站，把 SEMICON Taiwan 2026 的總覽、論壇陣容、論壇時間軸、技術特區、活動週程、逛展參考與參觀須知，整理成 7 個彼此串連的頁面。內容整理自官方網站，純 HTML / CSS / JS、零 build，可直接部署到 GitHub Pages。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 網站 | <https://tingwei161803.github.io/semicon-2026/> |

> 直接點進去就能用，無需安裝。頂部跨頁導覽列可在 7 頁之間切換；每頁皆支援中文 / English 與深 / 淺色，論壇頁可用 `…/forums.html#<slug>` 深連結到特定論壇。

---

## 📄 頁面 / Pages

| 頁面 | 檔案 | 內容 |
|------|------|------|
| 展會總覽 | `index.html` | 「Transform Tomorrow」hero、規模統計（65 國 / 10 萬+ / 1,300+ 展商 / 4,300+ 攤位 / 200+ 領袖 / 25+ 論壇）、八大焦點技術主題、三大初衷、主辦資訊 |
| 國際論壇 | `forums.html` | **20+ 場**國際論壇（8/31–9/4），可搜尋、依領域篩選（領袖 / 製程封裝 / 材料元件 / 智造永續資安 / 量子），點卡片看詳情 |
| 論壇時間軸 | `schedule.html` | 所有論壇依時間排序的議程，標註**確切時間與地點**（南港展覽館 / 漢來大飯店 / 雅悅會館 各場館樓層攤位） |
| 主題特區 | `zones.html` | 四大亮點特區（AI、量子、晶圓智造、晶片新創）＋ 人才培育主題活動，bento 視覺化呈現 |
| 展會週程 | `events.html` | 8/31–9/4 一週時間軸：論壇日、展覽開幕、大師論壇、亮點活動與新銳獎壓軸 |
| 逛展參考 | `guide.html` | **依身分給建議**：工程師 / 商務 / 投資人 / 新創 / 學生 / 國際訪客等 9 種 persona，各自的論壇、特區、動線建議，以及**對應的參展廠商（含攤位號）** |
| 參觀資訊 | `visit.html` | 展期、地點與交通、購票領證、展區平面圖、參展廠商名單、行程規劃，附官方連結 |

---

## ✨ 功能特色

- 🌏 **全頁雙語切換** — 中文 / English 一鍵切換，整站（卡片、詳情、導覽、頁尾）同步無殘留
- 🌗 **深色 / 淺色模式** — 近 OLED 深色科技感與冷白淺色，`localStorage` 記憶、跨頁延續
- 🧭 **跨頁導覽列** — 7 頁一鍵切換，自動高亮目前頁
- ⭐ **GitHub star 按鈕** — 右上角一鍵前往專案 repo，顯示即時星數（離線 / 限流時自動退回 ★）
- 🔍 **即時搜尋 + 領域篩選** — 論壇頁可即時搜尋並依領域 chip 篩選
- 🪟 **詳情對話框 + 深連結** — 每場論壇可點開看完整介紹，網址帶 `#<slug>` 可分享
- 🧱 **多種版型** — 複合首頁、卡片牆、bento 特區、時間軸、可展開 FAQ，各取所長
- 🎞️ **捲動進場動畫** — 區段隨捲動淡入（尊重 `prefers-reduced-motion`）
- 📱 **響應式設計** — 手機、平板、桌機皆適配，375px 無水平溢出
- ⚡ **純靜態** — 無後端、載入快、可離線瀏覽，含 SEO / Open Graph / JSON-LD

---

## 📂 內容結構 / 資料來源

本站內容整理自 **SEMICON Taiwan 2026 官方網站（semicontaiwan.org）**，主要參考頁面：

- 關於 SEMICON Taiwan（總覽、展期、主辦單位）— <https://www.semicontaiwan.org/zh/about/overview>
- 論壇一覽表（國際論壇陣容與時程）— <https://www.semicontaiwan.org/zh/programs/program-at-a-glance>
- 主題特區（AI / 量子 / 晶圓智造 / 晶片新創 / 人才培育）— <https://www.semicontaiwan.org/zh/about>
- 參展廠商名單與攤位號（「逛展參考」各身分對應廠商）— <https://expo.semi.org/taiwan2026/public/exhibitors.aspx?ID=31939>
- 參觀購票、展區平面圖、規劃行程

> 「逛展參考」列出的參展廠商與攤位號為官方名錄某一時間點的快照，名單仍在持續增補，實際以官方名錄為準。

```
semicon-2026/
├── index.html / forums.html / schedule.html / zones.html /            # 7 個共用 shell 的頁面
│   events.html / guide.html / visit.html
├── assets/
│   ├── styles.css      # 設計 token（淺 / 深）+ 全部元件樣式
│   ├── shell.js        # 共用 chrome：appbar / 跨頁導覽 / 頁尾 / dialog / 語言+主題狀態
│   ├── app.js          # 版型引擎：依 data-page 選 renderer 渲染進 #page
│   └── favicon.svg
├── data/
│   └── data.js         # 唯一資料檔：SITE_META + SITE_PAGES[]（每頁同名 {en,zh} 雙語）
├── .nojekyll
└── README.md
```

> ⚠️ **非官方**：本網站為個人整理之非官方資源，與 SEMICON Taiwan、SEMI、TSIA 無關。展期、場館、論壇、活動與報名等細節以官方公告為準；如有錯誤或出入，請以官方來源為準。

---

## 🛠 本機使用

```bash
# 1. clone 專案
git clone git@github.com:tingwei161803/semicon-2026.git
cd semicon-2026

# 2a. 最簡單：直接開啟 index.html
open index.html

# 2b. 或啟動本機伺服器（建議，跨頁連結 / 深連結才正常）
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

> 本專案為純靜態網站，不需安裝任何依賴；瀏覽不需 Python。若要跑本機伺服器，依偏好一律使用 `uv`。

---

## 📝 聲明 / License

- 本站為非官方整理，內容著作權歸原始來源（SEMICON Taiwan / SEMI / TSIA 與各參與單位）所有。
- 本網站使用 **Google Analytics 4**（GA4 property：SEMICON Taiwan 2026 - GA4）蒐集匿名流量數據，以了解瀏覽情形；可參考 [Google 隱私權政策](https://policies.google.com/privacy)。
- 程式碼以 **MIT** 授權釋出。
- 如為權利人且希望調整或移除內容，請開 issue 聯絡。
