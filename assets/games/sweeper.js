/* =========================================================================
   multipage · games/sweeper.js — 晶圓掃雷 / Wafer Sweeper

   Minesweeper on a round wafer map. A 9×9 die grid with the corners trimmed
   off — dies that fall outside the wafer edge are inert — hides 10 defects.
   Reveal every good die without touching a defect; faster is better, so the
   score is elapsed seconds and the arcade keeps the LOWEST.

   The first reveal is always safe: defects are placed only after it, away
   from that die and its eight neighbours, so a game can never end on the
   opening tap. Flagging works three ways because pointers differ — right-
   click, long-press (touch), or the explicit Flag-mode toggle. Keyboard:
   cells are buttons, arrow keys move between them, Enter reveals, F flags.

   Self-registers into window.SEMICON_ARCADE; builds only inside `root`, talks
   to the host only through `ctx`, clears every timer in unmount().
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  var SIZE = 9;        /* dies per side */
  var DEFECTS = 10;    /* hidden defects per wafer */
  var EDGE = 4.6;      /* wafer radius in die units, measured from the centre die */
  var PRESS_MS = 450;  /* long-press threshold for touch flagging */

  /* module-level handles so unmount() can guarantee a clean stop */
  var clockTimer = null;
  var pressTimer = null;
  function clearTimers() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
  }

  /* a die is on the wafer when its centre lies inside the circle */
  function onWafer(r, c) {
    var m = (SIZE - 1) / 2;
    return Math.sqrt((r - m) * (r - m) + (c - m) * (c - m)) <= EDGE;
  }

  var CSS = `
    .game--sweeper .sw-tools { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
    .game--sweeper .sw-flagmode[aria-pressed="true"] {
      color: var(--on-accent); background: linear-gradient(135deg, var(--accent), var(--accent-3));
      border-color: transparent; box-shadow: var(--shadow-accent);
    }
    .game--sweeper .sw-wafer {
      position: relative; width: min(100%, 420px); margin: 0 auto; aspect-ratio: 1;
      border-radius: 50%; padding: 3.5%;
      background: radial-gradient(circle at 38% 32%, var(--surface-2), var(--surface) 70%);
      border: 1px solid var(--hairline-2); box-shadow: inset 0 0 0 6px var(--surface), inset 0 0 0 7px var(--hairline);
    }
    .game--sweeper .sw-grid {
      display: grid; grid-template-columns: repeat(9, 1fr); gap: 3px; width: 100%; height: 100%;
      touch-action: manipulation; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none;
    }
    .game--sweeper .sw-cell {
      display: grid; place-items: center; aspect-ratio: 1; min-width: 0; padding: 0; border: 0;
      font: inherit; font-family: var(--font-display); font-weight: 700; font-size: clamp(11px, 3.2vw, 17px);
      line-height: 1; border-radius: 22%; color: var(--text); cursor: pointer;
      background: var(--surface-2); border: 1px solid var(--hairline);
      box-shadow: inset 0 1px 0 var(--inner-hi); -webkit-tap-highlight-color: transparent;
      transition: background .15s var(--ease), transform .15s var(--ease);
    }
    .game--sweeper .sw-cell:hover:not(.is-open) { background: var(--accent-soft); border-color: var(--accent-line); }
    .game--sweeper .sw-cell:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; z-index: 1; }
    .game--sweeper .sw-cell--off { visibility: hidden; pointer-events: none; }
    .game--sweeper .sw-cell.is-open { background: var(--surface); border-color: var(--hairline-2); box-shadow: none; cursor: default; }
    .game--sweeper .sw-cell.is-defect { background: #d9484f; border-color: #d9484f; color: #fff; }
    .game--sweeper .sw-cell.is-boom { animation: sw-boom .35s var(--ease-out); }
    .game--sweeper.is-reduced .sw-cell.is-boom { animation: none; }
    .game--sweeper .sw-cell.is-flag { color: var(--accent); background: var(--accent-soft); border-color: var(--accent-line); }
    .game--sweeper .sw-cell.is-wrongflag { color: #d9484f; text-decoration: line-through; }
    .game--sweeper .sw-cell .material-symbols-rounded { font-size: clamp(13px, 3.6vw, 20px); }
    .game--sweeper .sw-cell.n1 { color: var(--accent); }
    .game--sweeper .sw-cell.n2 { color: #2a9d5c; }
    .game--sweeper .sw-cell.n3 { color: #d9484f; }
    .game--sweeper .sw-cell.n4 { color: #8b5cf6; }
    .game--sweeper .sw-cell.n5, .game--sweeper .sw-cell.n6, .game--sweeper .sw-cell.n7, .game--sweeper .sw-cell.n8 { color: #b45309; }
    [data-theme="dark"] .game--sweeper .sw-cell.n1 { color: var(--accent-3); }
    [data-theme="dark"] .game--sweeper .sw-cell.is-flag { color: var(--accent-3); }
    @keyframes sw-boom { 0% { transform: scale(1); } 40% { transform: scale(1.25); } 100% { transform: scale(1); } }
    .game--sweeper .sw-overlay .sw-icon { font-size: 44px; color: var(--accent-3); }
    .game--sweeper .sw-overlay .sw-icon--bad { color: #d9484f; }
    .game--sweeper .sw-overlay b { color: var(--accent); font-family: var(--font-display); }
    .game--sweeper .sw-overlay .sw-sub { color: var(--text-mute); font-size: .9rem; }
  `;

  var TITLE = { en: "Wafer Sweeper", zh: "晶圓掃雷" };

  SEMICON_ARCADE.register({
    id: "sweeper",
    icon: "bug_report",
    title: TITLE,
    desc:  { en: "Minesweeper on a wafer map — clear every good die without hitting a hidden defect.",
             zh: "晶圓版踩地雷——揭開所有良品晶粒，別踩到暗藏的缺陷。" },
    scoreLabel: { en: "Best time (s)", zh: "最快（秒）" },
    lowerIsBetter: true,

    mount: function (root, ctx) {
      var t = ctx.t, esc = ctx.esc;
      ctx.injectStyle(CSS);

      /* ---- state ---- */
      var cells = [];        /* cells[r][c] = { on, defect, open, flag, n } */
      var els = [];          /* els[r][c] = the <button>, or null for off-wafer dies */
      var placed = false;    /* defects are laid out on the first reveal */
      var over = false;      /* won or lost */
      var flags = 0, opened = 0, dieCount = 0, seconds = 0;
      var flagMode = false;
      var suppressClick = false; /* a long-press already handled this pointer sequence */
      var lastPointer = "mouse"; /* pointerType of the current sequence; touch long-press also fires contextmenu on Android */

      var S = {
        left:   { en: "Defects left", zh: "剩餘缺陷" },
        time:   { en: "Time", zh: "時間" },
        best:   { en: "Best", zh: "最快" },
        restart:{ en: "New wafer", zh: "換片晶圓" },
        flag:   { en: "Flag mode", zh: "插旗模式" },
        flagOn: { en: "Flag mode on: tapping marks a defect.", zh: "插旗模式：點擊會標記缺陷。" },
        hint:   { en: "Tap to reveal a die. Right-click, long-press or use Flag mode to mark a suspected defect.",
                  zh: "點擊揭開晶粒；右鍵、長按或開啟插旗模式可標記可疑缺陷。" },
        hidden: { en: "hidden", zh: "未揭開" },
        flagged:{ en: "flagged", zh: "已插旗" },
        defect: { en: "defect", zh: "缺陷" },
        clear:  { en: "clear", zh: "無缺陷" },
        nearby: { en: "nearby", zh: "個相鄰缺陷" },
        die:    { en: "Die", zh: "晶粒" },
        win:    { en: "Wafer cleared!", zh: "整片晶圓清完！" },
        lose:   { en: "Defect hit", zh: "踩到缺陷了" },
        winSub: { en: "Every good die is revealed.", zh: "所有良品晶粒都揭開了。" },
        loseSub:{ en: "That die was defective. The rest of the map is now shown.", zh: "那顆晶粒是缺陷，整片圖已揭開。" },
        again:  { en: "Play again", zh: "再玩一次" },
        secs:   { en: "s", zh: " 秒" }
      };

      function bestText() { var b = ctx.getBest(); return b == null ? "—" : String(b); }

      /* ---- chrome ---- */
      root.innerHTML =
        '<div class="game game--sweeper' + (ctx.reduceMotion ? " is-reduced" : "") + '">' +
          '<div class="game__head">' +
            '<div class="game__stats">' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.left)) + '</span>' +
                '<span class="game__stat-val sw-left">' + DEFECTS + '</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.time)) + '</span>' +
                '<span class="game__stat-val sw-time">0</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.best)) + '</span>' +
                '<span class="game__stat-val sw-best">' + esc(bestText()) + '</span></div>' +
            '</div>' +
            '<button class="game__btn game__btn--ghost sw-restart" type="button">' +
              '<span class="material-symbols-rounded" aria-hidden="true">refresh</span>' +
              '<span>' + esc(t(S.restart)) + '</span>' +
            '</button>' +
          '</div>' +
          '<div class="sw-tools">' +
            '<button class="game__btn game__btn--ghost sw-flagmode" type="button" aria-pressed="false">' +
              '<span class="material-symbols-rounded" aria-hidden="true">flag</span>' +
              '<span>' + esc(t(S.flag)) + '</span>' +
            '</button>' +
          '</div>' +
          '<div class="game__board">' +
            '<div class="sw-wafer"><div class="sw-grid" role="grid" aria-label="' + esc(t(TITLE)) + '"></div></div>' +
          '</div>' +
          '<p class="game__msg sw-msg" aria-live="polite">' + esc(t(S.hint)) + '</p>' +
        '</div>';

      var leftEl = root.querySelector(".sw-left");
      var timeEl = root.querySelector(".sw-time");
      var bestEl = root.querySelector(".sw-best");
      var msgEl = root.querySelector(".sw-msg");
      var boardEl = root.querySelector(".game__board");
      var gridEl = root.querySelector(".sw-grid");
      var flagBtn = root.querySelector(".sw-flagmode");

      /* ---- helpers ---- */
      function each(fn) { for (var r = 0; r < SIZE; r++) for (var c = 0; c < SIZE; c++) if (cells[r][c].on) fn(r, c, cells[r][c]); }
      function neighbours(r, c) {
        var out = [];
        for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          var rr = r + dr, cc = c + dc;
          if (rr < 0 || cc < 0 || rr >= SIZE || cc >= SIZE) continue;
          if (cells[rr][cc].on) out.push([rr, cc]);
        }
        return out;
      }
      function label(r, c, cell) {
        var pos = t(S.die) + " " + (r + 1) + "-" + (c + 1) + ", ";
        if (cell.flag) return pos + t(S.flagged);
        if (!cell.open) return pos + t(S.hidden);
        if (cell.defect) return pos + t(S.defect);
        return pos + (cell.n ? cell.n + " " + t(S.nearby) : t(S.clear));
      }
      function paint(r, c) {
        var cell = cells[r][c], el = els[r][c];
        el.className = "sw-cell" + (cell.open ? " is-open" : "") + (cell.flag ? " is-flag" : "") +
          (cell.open && cell.defect ? " is-defect" : "") + (cell.open && !cell.defect && cell.n ? " n" + cell.n : "");
        el.innerHTML = cell.flag ? '<span class="material-symbols-rounded" aria-hidden="true">flag</span>' :
          (cell.open && cell.defect) ? '<span class="material-symbols-rounded" aria-hidden="true">bug_report</span>' :
          (cell.open && cell.n) ? String(cell.n) : "";
        el.setAttribute("aria-label", label(r, c, cell));
      }

      function startClock() {
        if (clockTimer) return;
        clockTimer = setInterval(function () { seconds++; timeEl.textContent = String(seconds); }, 1000);
      }
      function stopClock() { if (clockTimer) { clearInterval(clockTimer); clockTimer = null; } }

      /* lay out defects away from the first-revealed die and its neighbours */
      function placeDefects(r0, c0) {
        var safe = {};
        safe[r0 + "," + c0] = true;
        neighbours(r0, c0).forEach(function (p) { safe[p[0] + "," + p[1]] = true; });
        var pool = [];
        each(function (r, c) { if (!safe[r + "," + c]) pool.push([r, c]); });
        for (var i = pool.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
        }
        pool.slice(0, DEFECTS).forEach(function (p) { cells[p[0]][p[1]].defect = true; });
        each(function (r, c, cell) {
          cell.n = neighbours(r, c).filter(function (p) { return cells[p[0]][p[1]].defect; }).length;
        });
        placed = true;
      }

      function reveal(r, c) {
        var cell = cells[r][c];
        if (over || cell.open || cell.flag) return;
        if (!placed) { placeDefects(r, c); startClock(); }
        if (cell.defect) { lose(r, c); return; }
        /* iterative flood fill from zero-count dies */
        var stack = [[r, c]];
        while (stack.length) {
          var p = stack.pop(), cur = cells[p[0]][p[1]];
          if (cur.open || cur.flag || cur.defect) continue;
          cur.open = true; opened++;
          paint(p[0], p[1]);
          if (cur.n === 0) neighbours(p[0], p[1]).forEach(function (q) { if (!cells[q[0]][q[1]].open) stack.push(q); });
        }
        if (opened === dieCount - DEFECTS) win();
      }

      function toggleFlag(r, c) {
        var cell = cells[r][c];
        if (over || cell.open) return;
        cell.flag = !cell.flag;
        flags += cell.flag ? 1 : -1;
        leftEl.textContent = String(DEFECTS - flags);
        paint(r, c);
      }

      function revealAll(hitR, hitC) {
        each(function (r, c, cell) {
          if (cell.defect && !cell.flag) { cell.open = true; paint(r, c); }
          else if (cell.flag && !cell.defect) { els[r][c].classList.add("is-wrongflag"); }
        });
        els[hitR][hitC].classList.add("is-boom");
      }

      function lose(r, c) {
        over = true; stopClock();
        cells[r][c].open = true; paint(r, c);
        revealAll(r, c);
        overlay(false);
      }
      function win() {
        over = true; stopClock();
        var best = ctx.setBest(seconds);
        bestEl.textContent = String(best);
        /* flag whatever is left so the map reads as finished */
        each(function (r, c, cell) { if (cell.defect && !cell.flag) { cell.flag = true; paint(r, c); } });
        leftEl.textContent = "0";
        overlay(true);
      }

      function overlay(won) {
        var ov = document.createElement("div");
        ov.className = "game__overlay sw-overlay";
        ov.setAttribute("role", "dialog");
        ov.setAttribute("aria-label", t(won ? S.win : S.lose));
        ov.innerHTML =
          '<span class="material-symbols-rounded sw-icon' + (won ? "" : " sw-icon--bad") + '" aria-hidden="true">' +
            (won ? "verified" : "bug_report") + '</span>' +
          '<h3>' + esc(t(won ? S.win : S.lose)) + '</h3>' +
          '<p>' + esc(t(won ? S.winSub : S.loseSub)) + '</p>' +
          (won ? '<p>' + esc(t(S.time)) + ' <b>' + esc(String(seconds)) + esc(t(S.secs)) + '</b> · ' +
                 esc(t(S.best)) + ' ' + esc(bestText()) + esc(t(S.secs)) + '</p>' : "") +
          '<button class="game__btn sw-again" type="button">' +
            '<span class="material-symbols-rounded" aria-hidden="true">replay</span>' +
            '<span>' + esc(t(S.again)) + '</span>' +
          '</button>';
        boardEl.appendChild(ov);
        var again = ov.querySelector(".sw-again");
        again.addEventListener("click", newGame);
        again.focus();
      }

      /* ---- board ---- */
      function buildGrid() {
        var html = "";
        cells = []; els = []; dieCount = 0;
        for (var r = 0; r < SIZE; r++) {
          cells.push([]); els.push([]);
          html += '<div role="row">';
          for (var c = 0; c < SIZE; c++) {
            var on = onWafer(r, c);
            cells[r].push({ on: on, defect: false, open: false, flag: false, n: 0 });
            els[r].push(null);
            if (on) { dieCount++; html += '<button class="sw-cell" type="button" role="gridcell" data-r="' + r + '" data-c="' + c + '"></button>'; }
            else html += '<span class="sw-cell sw-cell--off" aria-hidden="true"></span>';
          }
          html += "</div>";
        }
        gridEl.innerHTML = html;
        [].slice.call(gridEl.querySelectorAll("button.sw-cell")).forEach(function (el) {
          var r = Number(el.getAttribute("data-r")), c = Number(el.getAttribute("data-c"));
          els[r][c] = el; paint(r, c);
        });
      }

      function newGame() {
        clearTimers();
        var ov = boardEl.querySelector(".game__overlay"); if (ov) ov.remove();
        placed = false; over = false; flags = 0; opened = 0; seconds = 0;
        leftEl.textContent = String(DEFECTS);
        timeEl.textContent = "0";
        bestEl.textContent = bestText();
        msgEl.textContent = t(flagMode ? S.flagOn : S.hint);
        buildGrid();
      }

      /* ---- input: delegated on the persistent grid ---- */
      function cellOf(e) {
        var el = e.target.closest ? e.target.closest("button.sw-cell") : null;
        return el && gridEl.contains(el) ? el : null;
      }
      gridEl.addEventListener("click", function (e) {
        var el = cellOf(e); if (!el) return;
        if (suppressClick) { suppressClick = false; return; }
        var r = Number(el.getAttribute("data-r")), c = Number(el.getAttribute("data-c"));
        if (flagMode) toggleFlag(r, c); else reveal(r, c);
      });
      gridEl.addEventListener("contextmenu", function (e) {
        var el = cellOf(e); if (!el) return;
        e.preventDefault();
        /* on touch the long-press timer already flagged this die; a second toggle
           here (Android fires contextmenu at ~500ms too) would undo it */
        if (lastPointer === "touch") return;
        toggleFlag(Number(el.getAttribute("data-r")), Number(el.getAttribute("data-c")));
      });
      /* long-press = flag (touch has no right button) */
      gridEl.addEventListener("pointerdown", function (e) {
        lastPointer = e.pointerType || "mouse"; /* before the button check: a mouse right-click must still reach contextmenu */
        var el = cellOf(e); if (!el || e.button !== 0) return;
        suppressClick = false; /* every new pointer sequence starts clean, so a swallowed click can never eat the next tap */
        if (pressTimer) clearTimeout(pressTimer);
        pressTimer = setTimeout(function () {
          pressTimer = null; suppressClick = true;
          toggleFlag(Number(el.getAttribute("data-r")), Number(el.getAttribute("data-c")));
        }, PRESS_MS);
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (evt) {
        gridEl.addEventListener(evt, function () { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } });
      });
      /* keyboard: arrows roam the wafer, F flags (Enter/Space reveal via the button) */
      gridEl.addEventListener("keydown", function (e) {
        var el = cellOf(e); if (!el) return;
        var r = Number(el.getAttribute("data-r")), c = Number(el.getAttribute("data-c"));
        var dr = 0, dc = 0;
        if (e.key === "ArrowUp") dr = -1; else if (e.key === "ArrowDown") dr = 1;
        else if (e.key === "ArrowLeft") dc = -1; else if (e.key === "ArrowRight") dc = 1;
        else if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFlag(r, c); return; }
        else return;
        e.preventDefault();
        /* step until the next on-wafer die in that direction */
        for (var k = 1; k < SIZE; k++) {
          var rr = r + dr * k, cc = c + dc * k;
          if (rr < 0 || cc < 0 || rr >= SIZE || cc >= SIZE) break;
          if (els[rr][cc]) { els[rr][cc].focus(); break; }
        }
      });

      flagBtn.addEventListener("click", function () {
        flagMode = !flagMode;
        flagBtn.setAttribute("aria-pressed", flagMode ? "true" : "false");
        if (!over) msgEl.textContent = t(flagMode ? S.flagOn : S.hint);
      });
      root.querySelector(".sw-restart").addEventListener("click", newGame);

      newGame();
    },

    unmount: function () { clearTimers(); }
  });
})();
