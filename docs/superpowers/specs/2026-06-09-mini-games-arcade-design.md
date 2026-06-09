# 互動小遊戲頁(Arcade)— 設計規格

> 日期:2026-06-09 · 狀態:已核准,實作中
> 在 SEMICON Taiwan 2026 導覽站新增第 8 個頁面:半導體主題的互動小遊戲頁。

## 目標

- 新增一個 `game.html`(slug `game`,layout `arcade`),自動進入全站跨頁導覽列。
- 4 款半導體主題小遊戲,採「選單卡片 → 頁內切換」互動。
- 與全站慣例一致:雙語(`{en,zh}`)、深淺色(CSS 變數)、`localStorage` 記最佳分數、手機 375px 無水平溢出、零 build 純靜態。
- **架構支援多 agent 平行開發**:每款遊戲是一個獨立檔案,透過註冊表自我註冊,互不衝突。

## 4 款遊戲

| id | 檔案 | 中文 | 玩法 |
|----|------|------|------|
| `memory` | `assets/games/memory.js` | 晶片記憶配對 | 翻牌配對半導體技術圖示;分數越高越好(由速度/步數換算) |
| `quiz` | `assets/games/quiz.js` | 論壇快問快答 | 讀 `window.SITE_PAGES` 的論壇/特區/數據自動出題;答對得分 |
| `sorter` | `assets/games/sorter.js` | 晶圓分類反應 | 快節奏左右分類良品/不良晶圓;反應正確連擊得分 |
| `node2048` | `assets/games/node2048.js` | 節點合成 2048 | 合成製程節點 28nm→14nm→7nm→5nm→3nm→2nm 的 2048 玩法 |

## 架構

沿用既有模式:`data.js`(資料)→ `shell.js`(共用 chrome + `window.LDW`)→ `app.js`(`RENDERERS`/`WIRE` 依 `layout` 渲染)。

### 新增/修改檔案

**地基(先建,為穩定契約;遊戲 agent 不得修改)**
- `assets/games/_registry.js` — `window.SEMICON_ARCADE` 註冊表(`register/list/get`)。
- `assets/app.js` — 新增 `RENDERERS.arcade` + `WIRE.arcade`,以及模組層級 `arcadeActiveId` 與 best-score/ctx 輔助函式。
- `assets/styles.css` — 新增 `.arcade` / `.gamecard` / `.arcade__stage` 等樣式 + 共用「遊戲 UI kit」class。
- `data/data.js` — 在 `SITE_PAGES` 加入 `game` 頁(僅 slug/layout/icon/title/subtitle)。
- `game.html` — 新頁 shell;依序載入 `data.js → shell.js → _registry.js → memory.js → quiz.js → sorter.js → node2048.js → app.js`。

**各 agent 獨佔一檔(平行開發)**
- `assets/games/{memory,quiz,sorter,node2048}.js`

### 遊戲模組契約(每個遊戲必須遵守)

```js
SEMICON_ARCADE.register({
  id: "memory",                                  // 唯一 id,需與檔名/載入順序一致
  icon: "style",                                 // Material Symbols Rounded 名稱
  title: { en: "Chip Memory Match", zh: "晶片記憶配對" },
  desc:  { en: "...", zh: "翻牌配對半導體技術圖示" },   // 選單卡片副標(雙語)
  scoreLabel: { en: "Best", zh: "最佳" },          // 選單最佳分數前綴(雙語)
  lowerIsBetter: false,                          // 選填;true 表分數越低越好
  mount: function (root, ctx) { /* 把遊戲畫進 root 元素 */ },
  unmount: function () { /* 清掉所有 timer / requestAnimationFrame / 全域 listener */ }
});
```

`mount(root, ctx)` 收到的 `root` 是空的容器 `<div class="arcade__mount">`;`ctx` 提供:

| 欄位 | 說明 |
|------|------|
| `ctx.lang` | 目前語言 `"zh"` / `"en"` |
| `ctx.t(obj)` | 翻譯 `{en,zh}` → 字串(吃目前語言) |
| `ctx.esc(s)` | HTML escape |
| `ctx.lsGet(k)` / `ctx.lsSet(k,v)` | sandbox-safe localStorage |
| `ctx.getBest()` | 取本遊戲最佳分數(number 或 null) |
| `ctx.setBest(n)` | 視 `lowerIsBetter` 存入較佳者,回傳目前最佳 |
| `ctx.reduceMotion` | 是否 `prefers-reduced-motion`(true 時關閉動畫) |
| `ctx.injectStyle(css)` | 注入一次性 scoped `<style>`(同一遊戲只注入一次) |

**契約規範**
- 所有可見字串走 `ctx.t({en,zh})`;不得寫死單一語言。
- 顏色一律用既有 CSS 變數(下方),深淺色自動適配;不得寫死 hex。
- 遊戲專屬樣式以 `ctx.injectStyle()` 注入,選擇器一律加根前綴 `.game--<id>`(例:`.game--memory .tile{...}`),避免污染其他遊戲。
- chrome(返回鍵、遊戲標題)由 arcade 提供;遊戲在自己的 root 內呈現分數列、重玩鍵、勝負畫面。
- `unmount()` 必須清乾淨所有計時器/動畫/`window` 事件,否則切換語言或返回時會洩漏。
- 不得新增任何第三方相依;純 vanilla JS、IIFE 包裹、`"use strict"`。
- 行動裝置 375px 寬不得水平溢出;支援鍵盤操作與基本 a11y(`aria-label`)。

### 頁面互動(選單 + 頁內切換)

- 進頁:`RENDERERS.arcade` 讀 `SEMICON_ARCADE.list()` 渲染遊戲卡選單(圖示、雙語標題、副標、最佳分數)。
- 點卡:設 `arcadeActiveId = id` 並 `render()` → 顯示 stage(返回鍵 + 遊戲名 + `#arcadeMount`),`WIRE.arcade` 呼叫該遊戲 `mount()`。
- 返回:`arcadeActiveId = null` 並 `render()` → 回選單;`render()` 前的 teardown 會呼叫該遊戲 `unmount()`。
- 語言切換:全站既有 `onLang(render)` 機制觸發 `render()`;若 `arcadeActiveId` 仍有值,會以新語言**重新 mount 該局**(重置進度,符合全站重繪慣例)。

### 可用 CSS 變數(給遊戲 agent)

色:`--bg --surface --surface-solid --surface-2 --hairline --hairline-2 --inner-hi --text --text-dim --text-mute --accent --accent-2 --accent-3 --accent-soft --accent-line --on-accent --chip-bg`
陰影:`--shadow --shadow-lg --shadow-accent` · 圓角:`--radius-sm(12) --radius(18) --radius-lg(30) --radius-pill`
字:`--font-display --font-body` · 緩動:`--ease --ease-out`

### 共用遊戲 UI kit(arcade 提供的 class,遊戲應盡量沿用)

- `.game` 遊戲根容器(置中、column、gap) · `.game__head` 頂部列 · `.game__stats` 分數區 · `.game__stat` 單一統計 chip(含 `.game__stat-label` / `.game__stat-val`)
- `.game__board` 主遊戲區卡片 · `.game__btn` 緊湊操作鈕 · `.game__overlay` 勝負覆蓋層 · `.game__msg` 狀態文字

## 驗收標準

- [ ] 4 款遊戲皆可遊玩、計分正確、最佳分數寫入 `localStorage` 並於選單顯示。
- [ ] 選單 ↔ 遊戲頁內切換正常;返回會正確 `unmount`(無計時器洩漏)。
- [ ] 中↔英切換全頁同步、無殘留;深↔淺色皆正常。
- [ ] 手機 375px 無水平溢出;鍵盤可操作。
- [ ] `game` 頁出現在全站 8 頁導覽列並可深連結 `game.html`。
- [ ] README.md 更新(頁面表 7→8、功能特色、結構樹加 `assets/games/`)。

## 流程

brainstorming(完成)→ 本 spec(完成)→ 搭地基 → 派 4 個平行 agent 各做一遊戲 → 整合驗收 → 更新 README → commit(以 `tingwei161803 <monkeydluffy3u4ace@gmail.com>`)。
