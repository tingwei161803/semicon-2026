/* =========================================================================
   multipage · games/flow.js — 製程排序 / Fab Flow

   An ordering puzzle. Each round draws 7 of the 13 steps in a simplified,
   single-pass chipmaking flow (bare wafer → tested chip), shuffles them, and
   asks the player to lay them back on the line in the order they happen.
   When the line is full it is checked: steps in the right place lock, the
   rest bounce back to the pool and the attempt counter ticks. Fewer attempts
   and less time = higher score.

   The flow is deliberately the textbook one-pass story (real fabs loop the
   litho/etch/deposit cycle dozens of times); the on-screen message says so,
   and only steps whose relative order is unambiguous are included.

   Self-registers into window.SEMICON_ARCADE; builds only inside `root`, talks
   to the host only through `ctx`, clears every timer in unmount().
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  var ROUND = 7;          /* steps per round */
  var BOUNCE_MS = 650;    /* how long wrong tiles show red before returning */

  var clockTimer = null;
  var bounceTimer = null;
  function clearTimers() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    if (bounceTimer) { clearTimeout(bounceTimer); bounceTimer = null; }
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* canonical order; each round samples a subset and keeps this ordering */
  var STEPS = [
    { icon: "circle",              name: { en: "Wafer preparation", zh: "晶圓製備" },   hint: { en: "Grow the ingot, slice and polish", zh: "拉晶、切片、拋光" } },
    { icon: "layers",              name: { en: "Oxidation", zh: "氧化" },               hint: { en: "Grow a protective SiO₂ layer", zh: "長出保護用的二氧化矽層" } },
    { icon: "format_paint",        name: { en: "Photoresist coating", zh: "塗佈光阻" }, hint: { en: "Spin on a light-sensitive film", zh: "旋塗一層感光薄膜" } },
    { icon: "flare",               name: { en: "Exposure", zh: "曝光" },                hint: { en: "Project the mask pattern (EUV / DUV)", zh: "把光罩圖案投影到光阻（EUV / DUV）" } },
    { icon: "water_drop",          name: { en: "Development", zh: "顯影" },             hint: { en: "Wash away the exposed resist", zh: "洗去曝光過的光阻" } },
    { icon: "content_cut",         name: { en: "Etching", zh: "蝕刻" },                 hint: { en: "Carve the pattern into the layer", zh: "把圖案刻進薄膜" } },
    { icon: "scatter_plot",        name: { en: "Ion implantation", zh: "離子植入" },    hint: { en: "Dope the silicon to set its conductivity", zh: "摻雜矽以改變導電性" } },
    { icon: "auto_awesome_motion", name: { en: "Thin-film deposition", zh: "薄膜沉積" }, hint: { en: "Lay down the next layer (CVD / PVD / ALD)", zh: "鍍上下一層薄膜（CVD / PVD / ALD）" } },
    { icon: "cable",               name: { en: "Metallisation", zh: "金屬連線" },       hint: { en: "Wire the transistors together", zh: "用金屬把電晶體接起來" } },
    { icon: "fact_check",          name: { en: "Wafer probe test", zh: "晶圓測試" },    hint: { en: "Probe every die electrically", zh: "逐顆晶粒做電性量測" } },
    { icon: "grid_on",             name: { en: "Dicing", zh: "切割" },                  hint: { en: "Saw the wafer into dies", zh: "把晶圓切成一顆顆晶粒" } },
    { icon: "inventory_2",         name: { en: "Packaging", zh: "封裝" },               hint: { en: "Seal the die and bring out its pins", zh: "把晶粒封起來並接出腳位" } },
    { icon: "verified",            name: { en: "Final test", zh: "最終測試" },          hint: { en: "Verify the finished chip", zh: "驗證成品晶片" } }
  ];

  var CSS = `
    .game--flow .fl-line { display: grid; gap: 8px; margin-bottom: 18px; }
    .game--flow .fl-slot, .game--flow .fl-tile {
      display: flex; align-items: center; gap: 12px; min-height: 54px; padding: 8px 12px;
      border-radius: var(--radius-sm); text-align: left; font: inherit; color: var(--text);
    }
    .game--flow .fl-slot {
      border: 1.5px dashed var(--hairline-2); color: var(--text-mute);
      background: color-mix(in srgb, var(--surface-2) 60%, transparent);
    }
    .game--flow .fl-tile {
      width: 100%; cursor: pointer; background: var(--surface-2); border: 1px solid var(--hairline);
      box-shadow: var(--shadow), inset 0 1px 0 var(--inner-hi);
      transition: transform .2s var(--ease), border-color .2s var(--ease), background .2s var(--ease);
    }
    .game--flow .fl-tile:hover { transform: translateY(-1px); border-color: var(--accent-line); }
    .game--flow .fl-tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .game--flow .fl-tile.is-locked { cursor: default; background: var(--accent-soft); border-color: var(--accent-line); }
    .game--flow .fl-tile.is-locked:hover { transform: none; }
    .game--flow .fl-tile.is-wrong { background: color-mix(in srgb, #d9484f 14%, var(--surface)); border-color: #d9484f; animation: fl-shake .4s var(--ease); }
    .game--flow.is-reduced .fl-tile.is-wrong { animation: none; }
    @keyframes fl-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    .game--flow .fl-num {
      flex: none; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%;
      font-family: var(--font-display); font-weight: 700; font-size: .8rem;
      background: var(--surface); border: 1px solid var(--hairline-2); color: var(--text-mute);
    }
    .game--flow .fl-tile.is-locked .fl-num { background: var(--accent); border-color: transparent; color: var(--on-accent); }
    .game--flow .fl-icon { flex: none; font-size: 24px; color: var(--accent); }
    [data-theme="dark"] .game--flow .fl-icon { color: var(--accent-3); }
    .game--flow .fl-text { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
    .game--flow .fl-name { font-weight: 700; font-size: .95rem; line-height: 1.3; }
    .game--flow .fl-hint { font-size: .78rem; color: var(--text-mute); line-height: 1.35; }
    .game--flow .fl-ok { flex: none; margin-left: auto; color: var(--accent); font-size: 22px; }
    [data-theme="dark"] .game--flow .fl-ok { color: var(--accent-3); }
    .game--flow .fl-pool { display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
    .game--flow .fl-pool:empty { display: none; }
    .game--flow .fl-divider {
      display: flex; align-items: center; gap: 10px; margin: 0 0 12px;
      font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--text-mute);
    }
    .game--flow .fl-divider::before, .game--flow .fl-divider::after { content: ""; flex: 1; height: 1px; background: var(--hairline); }
    .game--flow .fl-divider[hidden] { display: none; }
    .game--flow .fl-overlay .fl-trophy { font-size: 44px; color: var(--accent-3); }
    .game--flow .fl-overlay b { color: var(--accent); font-family: var(--font-display); }
    .game--flow .fl-overlay .fl-sub { color: var(--text-mute); font-size: .9rem; }
  `;

  SEMICON_ARCADE.register({
    id: "flow",
    icon: "linear_scale",
    title: { en: "Fab Flow", zh: "製程排序" },
    desc:  { en: "Put the chipmaking steps back in order, from bare wafer to tested chip.",
             zh: "把製程步驟排回正確順序——從裸晶圓到測完的晶片。" },
    scoreLabel: { en: "Best", zh: "最佳" },
    lowerIsBetter: false,

    mount: function (root, ctx) {
      var t = ctx.t, esc = ctx.esc;
      ctx.injectStyle(CSS);

      var S = {
        tries:   { en: "Attempts", zh: "嘗試" },
        time:    { en: "Time", zh: "時間" },
        best:    { en: "Best", zh: "最佳" },
        restart: { en: "New round", zh: "換一組" },
        line:    { en: "Your sequence", zh: "你的順序" },
        pool:    { en: "Steps to place", zh: "待放入的步驟" },
        poolHead:{ en: "Tap a step to add it next", zh: "點一個步驟加到下一格" },
        step:    { en: "Step", zh: "第" },
        stepSuf: { en: "", zh: " 步" },
        empty:   { en: "empty", zh: "空格" },
        locked:  { en: "correct, locked", zh: "正確，已鎖定" },
        placed:  { en: "placed, tap to take back", zh: "已放入，點一下收回" },
        hint:    { en: "Tap the steps in the order they happen in the fab. Tap a placed step to take it back. (A simplified one-pass flow — real fabs repeat the litho/etch/deposit loop many times.)",
                   zh: "依製程發生的先後點選步驟；點已放入的步驟可收回。（這是簡化的單輪流程——真實產線會把曝光／蝕刻／沉積循環重複幾十次。）" },
        partial: { en: "{n} of {m} in place — the rest went back to the pool.", zh: "{n} / {m} 步正確，其餘退回。" },
        win:     { en: "Flow complete!", zh: "流程排對了！" },
        score:   { en: "Score", zh: "分數" },
        again:   { en: "Play again", zh: "再玩一次" },
        secs:    { en: "s", zh: " 秒" }
      };
      function fmt(o, n, m) { return t(o).replace("{n}", n).replace("{m}", m); }
      function bestText() { var b = ctx.getBest(); return b == null ? "—" : String(b); }

      /* ---- state ---- */
      var order = [];    /* step indices for this round, canonical order */
      var pool = [];     /* step indices still to place, display order */
      var slots = [];    /* slots[i] = step index or -1 */
      var locked = [];   /* slots[i] confirmed correct */
      var wrong = {};    /* slot index → true while showing red */
      var attempts = 0, seconds = 0, busy = false, done = false;
      var focusNext = null; /* selector to focus after a repaint */

      root.innerHTML =
        '<div class="game game--flow' + (ctx.reduceMotion ? " is-reduced" : "") + '">' +
          '<div class="game__head">' +
            '<div class="game__stats">' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.tries)) + '</span>' +
                '<span class="game__stat-val fl-tries">0</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.time)) + '</span>' +
                '<span class="game__stat-val fl-time">0</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.best)) + '</span>' +
                '<span class="game__stat-val fl-best">' + esc(bestText()) + '</span></div>' +
            '</div>' +
            '<button class="game__btn game__btn--ghost fl-restart" type="button">' +
              '<span class="material-symbols-rounded" aria-hidden="true">refresh</span>' +
              '<span>' + esc(t(S.restart)) + '</span>' +
            '</button>' +
          '</div>' +
          '<div class="game__board">' +
            '<div class="fl-line" role="list" aria-label="' + esc(t(S.line)) + '"></div>' +
            '<p class="fl-divider" aria-hidden="true">' + esc(t(S.poolHead)) + '</p>' +
            '<div class="fl-pool" role="group" aria-label="' + esc(t(S.pool)) + '"></div>' +
          '</div>' +
          '<p class="game__msg fl-msg" aria-live="polite">' + esc(t(S.hint)) + '</p>' +
        '</div>';

      var triesEl = root.querySelector(".fl-tries");
      var timeEl = root.querySelector(".fl-time");
      var bestEl = root.querySelector(".fl-best");
      var msgEl = root.querySelector(".fl-msg");
      var boardEl = root.querySelector(".game__board");
      var lineEl = root.querySelector(".fl-line");
      var poolEl = root.querySelector(".fl-pool");
      var dividerEl = root.querySelector(".fl-divider");

      function startClock() {
        if (clockTimer) return;
        clockTimer = setInterval(function () { seconds++; timeEl.textContent = String(seconds); }, 1000);
      }
      function stopClock() { if (clockTimer) { clearInterval(clockTimer); clockTimer = null; } }

      function stepNo(i) { return t(S.step) + " " + (i + 1) + t(S.stepSuf); }
      function tileInner(st, num, extra) {
        return (num != null ? '<span class="fl-num" aria-hidden="true">' + num + '</span>' : "") +
          '<span class="fl-icon material-symbols-rounded" aria-hidden="true">' + esc(st.icon) + '</span>' +
          '<span class="fl-text"><span class="fl-name">' + esc(t(st.name)) + '</span>' +
            '<span class="fl-hint">' + esc(t(st.hint)) + '</span></span>' + (extra || "");
      }

      function paint() {
        lineEl.innerHTML = slots.map(function (idx, i) {
          if (idx < 0) {
            return '<div class="fl-slot" role="listitem" aria-label="' + esc(stepNo(i) + ", " + t(S.empty)) + '">' +
              '<span class="fl-num" aria-hidden="true">' + (i + 1) + '</span></div>';
          }
          var st = STEPS[idx];
          var cls = "fl-tile fl-tile--placed" + (locked[i] ? " is-locked" : "") + (wrong[i] ? " is-wrong" : "");
          var state = locked[i] ? t(S.locked) : t(S.placed);
          return '<button class="' + cls + '" type="button" role="listitem" data-slot="' + i + '" ' +
            (locked[i] ? 'aria-disabled="true" ' : "") +
            'aria-label="' + esc(stepNo(i) + ": " + t(st.name) + " — " + state) + '">' +
            tileInner(st, i + 1, locked[i] ? '<span class="fl-ok material-symbols-rounded" aria-hidden="true">check_circle</span>' : "") +
          '</button>';
        }).join("");
        poolEl.innerHTML = pool.map(function (idx) {
          var st = STEPS[idx];
          return '<button class="fl-tile" type="button" data-pool="' + idx + '" aria-label="' + esc(t(st.name)) + '">' +
            tileInner(st, null) + '</button>';
        }).join("");
        dividerEl.hidden = !pool.length;
        if (focusNext) {
          var el = root.querySelector(focusNext);
          if (el) el.focus();
          focusNext = null;
        }
      }

      function firstEmpty() { for (var i = 0; i < slots.length; i++) if (slots[i] < 0) return i; return -1; }

      function place(idx) {
        var i = firstEmpty();
        if (i < 0) return;
        startClock();
        pool.splice(pool.indexOf(idx), 1);
        slots[i] = idx;
        /* keep focus useful: the next pool tile, else the slot just filled */
        focusNext = pool.length ? '[data-pool="' + pool[0] + '"]' : '[data-slot="' + i + '"]';
        paint();
        if (firstEmpty() < 0) check();
      }

      function takeBack(i) {
        if (locked[i] || busy) return;
        var idx = slots[i];
        slots[i] = -1;
        pool.push(idx);
        focusNext = '[data-pool="' + idx + '"]';
        paint();
      }

      function check() {
        attempts++;
        triesEl.textContent = String(attempts);
        var right = 0;
        wrong = {};
        slots.forEach(function (idx, i) {
          if (idx === order[i]) { locked[i] = true; right++; }
          else wrong[i] = true;
        });
        if (right === ROUND) { paint(); finish(); return; }
        busy = true;
        paint();
        msgEl.textContent = fmt(S.partial, right, ROUND);
        bounceTimer = setTimeout(function () {
          bounceTimer = null;
          Object.keys(wrong).forEach(function (k) {
            var i = Number(k);
            pool.push(slots[i]);
            slots[i] = -1;
          });
          wrong = {};
          busy = false;
          focusNext = '[data-pool="' + pool[0] + '"]';
          paint();
        }, BOUNCE_MS);
      }

      function finish() {
        done = true;
        stopClock();
        var score = Math.max(100, 1000 - (attempts - 1) * 120 - seconds * 4);
        var best = ctx.setBest(score);
        bestEl.textContent = String(best);
        var ov = document.createElement("div");
        ov.className = "game__overlay fl-overlay";
        ov.setAttribute("role", "dialog");
        ov.setAttribute("aria-label", t(S.win));
        ov.innerHTML =
          '<span class="material-symbols-rounded fl-trophy" aria-hidden="true">emoji_events</span>' +
          '<h3>' + esc(t(S.win)) + '</h3>' +
          '<p>' + esc(t(S.score)) + ' <b>' + esc(String(score)) + '</b> · ' + esc(t(S.best)) + ' ' + esc(String(best)) + '</p>' +
          '<p class="fl-sub">' + esc(t(S.tries)) + ' ' + esc(String(attempts)) + ' · ' +
            esc(t(S.time)) + ' ' + esc(String(seconds) + t(S.secs)) + '</p>' +
          '<button class="game__btn fl-again" type="button">' +
            '<span class="material-symbols-rounded" aria-hidden="true">replay</span>' +
            '<span>' + esc(t(S.again)) + '</span>' +
          '</button>';
        boardEl.appendChild(ov);
        var again = ov.querySelector(".fl-again");
        again.addEventListener("click", newRound);
        again.focus();
      }

      function newRound() {
        clearTimers();
        var ov = boardEl.querySelector(".game__overlay"); if (ov) ov.remove();
        /* sample ROUND distinct steps, keep canonical order */
        var all = []; for (var i = 0; i < STEPS.length; i++) all.push(i);
        order = shuffle(all).slice(0, ROUND).sort(function (a, b) { return a - b; });
        pool = shuffle(order);
        slots = []; locked = []; wrong = {};
        for (var k = 0; k < ROUND; k++) { slots.push(-1); locked.push(false); }
        attempts = 0; seconds = 0; busy = false; done = false;
        triesEl.textContent = "0"; timeEl.textContent = "0"; bestEl.textContent = bestText();
        msgEl.textContent = t(S.hint);
        paint();
      }

      boardEl.addEventListener("click", function (e) {
        if (busy || done) return;
        var el = e.target.closest ? e.target.closest("button[data-pool], button[data-slot]") : null;
        if (!el || !boardEl.contains(el)) return;
        if (el.hasAttribute("data-pool")) place(Number(el.getAttribute("data-pool")));
        else takeBack(Number(el.getAttribute("data-slot")));
      });
      root.querySelector(".fl-restart").addEventListener("click", newRound);

      newRound();
    },

    unmount: function () { clearTimers(); }
  });
})();
