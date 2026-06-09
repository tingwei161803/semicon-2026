/* =========================================================================
   multipage · games/memory.js — 晶片記憶配對 / Chip Memory Match

   A concentration game: 6 pairs (12 cards) of semiconductor-themed Material
   Symbols laid face-down on a responsive grid. Flip two; matches stay, misses
   flip back. Win by clearing the board. Faster + fewer moves = higher score.

   Self-registers into window.SEMICON_ARCADE. Builds entirely inside the empty
   `root` it is handed, talks to the host only through `ctx`, and tears down all
   timers in unmount(). See docs/superpowers/specs/…-arcade-design.md.
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  /* ---- module-level timer handles so unmount() can guarantee a clean stop ---- */
  var clockTimer = null; /* setInterval: the elapsed-seconds clock */
  var flipTimer = null;  /* setTimeout: pending flip-back of a non-matching pair */

  function clearTimers() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    if (flipTimer) { clearTimeout(flipTimer); flipTimer = null; }
  }

  /* Six distinct semiconductor-flavoured icons, each with a bilingual label so
     screen readers announce a meaning rather than the raw glyph name. */
  var ICONS = [
    { icon: "memory",   label: { en: "Memory",       zh: "記憶體" } },
    { icon: "layers",   label: { en: "Layers",       zh: "堆疊層" } },
    { icon: "lightbulb", label: { en: "Innovation",  zh: "創新" } },
    { icon: "database", label: { en: "Data",         zh: "資料" } },
    { icon: "bolt",     label: { en: "Power",        zh: "電源" } },
    { icon: "hub",      label: { en: "Network",      zh: "網路" } }
  ];

  /* Fisher–Yates on a copy — never mutate the source deck. */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  var CSS = `
    .game--memory .m-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: clamp(8px, 2.4vw, 14px);
    }
    @media (max-width: 430px) { .game--memory .m-grid { grid-template-columns: repeat(3, 1fr); } }

    .game--memory .m-card {
      position: relative; aspect-ratio: 3 / 4; padding: 0; border: 0;
      background: transparent; cursor: pointer; font: inherit;
      perspective: 720px; border-radius: var(--radius-sm);
    }
    .game--memory .m-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .game--memory .m-card.is-matched { cursor: default; }

    .game--memory .m-card__inner {
      position: absolute; inset: 0; transform-style: preserve-3d;
      transition: transform .45s var(--ease);
    }
    .game--memory.is-reduced .m-card__inner { transition: none; }
    .game--memory .m-card.is-flipped .m-card__inner { transform: rotateY(180deg); }

    .game--memory .m-card__face {
      position: absolute; inset: 0; display: grid; place-items: center;
      border-radius: var(--radius-sm); border: 1px solid var(--hairline);
      box-shadow: var(--shadow), inset 0 1px 0 var(--inner-hi);
      backface-visibility: hidden; -webkit-backface-visibility: hidden;
    }
    .game--memory .m-card__back {
      background: linear-gradient(135deg, var(--surface-2), var(--surface));
      color: var(--text-mute);
    }
    .game--memory .m-card__back .material-symbols-rounded { font-size: clamp(20px, 6vw, 30px); opacity: .5; }
    .game--memory .m-card__front {
      transform: rotateY(180deg);
      background: var(--accent-soft); border-color: var(--accent-line); color: var(--accent);
    }
    [data-theme="dark"] .game--memory .m-card__front { color: var(--accent-3); }
    .game--memory .m-card__front .material-symbols-rounded { font-size: clamp(26px, 8vw, 40px); }

    .game--memory .m-card.is-matched .m-card__front {
      background: linear-gradient(135deg, var(--accent), var(--accent-3));
      border-color: transparent; color: var(--on-accent);
    }
    .game--memory .m-card.is-matched { opacity: .9; }

    .game--memory .m-overlay .m-trophy { font-size: 44px; color: var(--accent-3); }
    .game--memory .m-overlay .m-sub { color: var(--text-mute); font-size: .9rem; }
    .game--memory .m-overlay b { color: var(--accent); font-family: var(--font-display); }
  `;

  SEMICON_ARCADE.register({
    id: "memory",
    icon: "style",
    title: { en: "Chip Memory Match", zh: "晶片記憶配對" },
    desc:  { en: "Flip cards to pair up semiconductor tech icons.", zh: "翻牌配對半導體技術圖示。" },
    scoreLabel: { en: "Best", zh: "最佳" },
    lowerIsBetter: false,

    mount: function (root, ctx) {
      var t = ctx.t, esc = ctx.esc;
      var PAIRS = ICONS.length; /* 6 pairs → 12 cards */
      var FLIP_BACK_MS = ctx.reduceMotion ? 320 : 700;

      ctx.injectStyle(CSS);

      /* ---- game state ---- */
      var deck = [];        /* shuffled array of ICONS entries */
      var first = null;     /* { card, idx } of the first card flipped this turn */
      var lock = false;     /* true while a non-match is animating back */
      var moves = 0, matched = 0, seconds = 0;
      var started = false, won = false;

      /* ---- localized helpers ---- */
      function unitS(n) { return n + t({ en: "s", zh: " 秒" }); }
      function bestText() { var b = ctx.getBest(); return b == null ? "—" : String(b); }
      function lbl(o, suffix) { return t(o) + (suffix ? " " + t(suffix) : ""); }

      var HIDDEN = { en: "Face-down card", zh: "未翻開的卡片" };
      var SUF_UP = { en: "(revealed)", zh: "(已翻開)" };
      var SUF_OK = { en: "(matched)", zh: "(已配對)" };

      /* ---- static chrome (built once; the board grid is repainted per game) ---- */
      root.innerHTML =
        '<div class="game game--memory' + (ctx.reduceMotion ? " is-reduced" : "") + '">' +
          '<div class="game__head">' +
            '<div class="game__stats">' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t({ en: "Moves", zh: "步數" })) + '</span>' +
                '<span class="game__stat-val m-moves">0</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t({ en: "Time", zh: "時間" })) + '</span>' +
                '<span class="game__stat-val m-time">0</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t({ en: "Best", zh: "最佳" })) + '</span>' +
                '<span class="game__stat-val m-best">' + esc(bestText()) + '</span></div>' +
            '</div>' +
            '<button class="game__btn game__btn--ghost m-restart" type="button" ' +
              'aria-label="' + esc(t({ en: "Restart game", zh: "重新開始" })) + '">' +
              '<span class="material-symbols-rounded" aria-hidden="true">refresh</span>' +
              '<span>' + esc(t({ en: "Restart", zh: "重玩" })) + '</span>' +
            '</button>' +
          '</div>' +
          '<div class="game__board"></div>' +
          '<p class="game__msg">' + esc(t({ en: "Find all matching pairs.", zh: "找出所有配對。" })) + '</p>' +
        '</div>';

      var movesEl = root.querySelector(".m-moves");
      var timeEl = root.querySelector(".m-time");
      var bestEl = root.querySelector(".m-best");
      var boardEl = root.querySelector(".game__board");

      /* ---- timer ---- */
      function startClock() {
        if (started) return;
        started = true;
        clockTimer = setInterval(function () {
          seconds++;
          timeEl.textContent = String(seconds);
        }, 1000);
      }
      function stopClock() {
        if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
      }

      /* ---- card face transitions ---- */
      function reveal(card, idx) {
        card.classList.add("is-flipped");
        card.setAttribute("aria-label", lbl(deck[idx].label, SUF_UP));
      }
      function conceal(card) {
        card.classList.remove("is-flipped");
        card.setAttribute("aria-label", t(HIDDEN));
      }
      function markMatched(card, idx) {
        card.classList.add("is-matched");
        card.setAttribute("aria-label", lbl(deck[idx].label, SUF_OK));
      }

      function onCardClick(card) {
        if (won || lock) return;                            /* ignore while resolving / after win */
        if (card.classList.contains("is-matched")) return;  /* already cleared */
        if (card.classList.contains("is-flipped")) return;  /* guard double-flip of same card */

        var idx = Number(card.getAttribute("data-idx"));
        startClock();
        reveal(card, idx);

        if (first === null) { first = { card: card, idx: idx }; return; }

        /* second card of the turn */
        moves++;
        movesEl.textContent = String(moves);
        var a = first, b = { card: card, idx: idx };
        first = null;

        if (deck[a.idx].icon === deck[b.idx].icon) {
          markMatched(a.card, a.idx);
          markMatched(b.card, b.idx);
          matched++;
          if (matched === PAIRS) finish();
        } else {
          lock = true;
          flipTimer = setTimeout(function () {
            conceal(a.card);
            conceal(b.card);
            lock = false;
            flipTimer = null;
          }, FLIP_BACK_MS);
        }
      }

      function finish() {
        won = true;
        stopClock();
        var score = Math.max(100, 2000 - moves * 40 - seconds * 8);
        var best = ctx.setBest(score);
        bestEl.textContent = String(best);
        showOverlay(score, best);
      }

      function showOverlay(score, best) {
        var ov = document.createElement("div");
        ov.className = "game__overlay m-overlay";
        ov.setAttribute("role", "dialog");
        ov.setAttribute("aria-label", t({ en: "You cleared the board", zh: "配對完成" }));
        ov.innerHTML =
          '<span class="material-symbols-rounded m-trophy" aria-hidden="true">emoji_events</span>' +
          '<h3>' + esc(t({ en: "Solved!", zh: "配對完成!" })) + '</h3>' +
          '<p>' + esc(t({ en: "Score", zh: "分數" })) + ' <b>' + esc(String(score)) + '</b> · ' +
                  esc(t({ en: "Best", zh: "最佳" })) + ' ' + esc(String(best)) + '</p>' +
          '<p class="m-sub">' + esc(t({ en: "Moves", zh: "步數" })) + ' ' + esc(String(moves)) + ' · ' +
                  esc(t({ en: "Time", zh: "時間" })) + ' ' + esc(unitS(seconds)) + '</p>' +
          '<button class="game__btn m-again" type="button">' +
            '<span class="material-symbols-rounded" aria-hidden="true">replay</span>' +
            '<span>' + esc(t({ en: "Play again", zh: "再玩一次" })) + '</span>' +
          '</button>';
        boardEl.appendChild(ov);
        var again = ov.querySelector(".m-again");
        again.addEventListener("click", newGame);
        again.focus();
      }

      /* ---- render the shuffled board (also wipes any win overlay) ---- */
      function renderBoard() {
        var cells = deck.map(function (entry, i) {
          return '<button class="m-card" type="button" data-idx="' + i + '" ' +
            'aria-label="' + esc(t(HIDDEN)) + '">' +
            '<span class="m-card__inner">' +
              '<span class="m-card__face m-card__back" aria-hidden="true">' +
                '<span class="material-symbols-rounded">blur_on</span></span>' +
              '<span class="m-card__face m-card__front" aria-hidden="true">' +
                '<span class="material-symbols-rounded">' + esc(entry.icon) + '</span></span>' +
            '</span>' +
          '</button>';
        }).join("");
        boardEl.innerHTML = '<div class="m-grid">' + cells + '</div>';
      }

      function newGame() {
        clearTimers();
        first = null; lock = false; won = false;
        moves = 0; matched = 0; seconds = 0; started = false;
        movesEl.textContent = "0";
        timeEl.textContent = "0";
        bestEl.textContent = bestText();
        deck = shuffle(ICONS.concat(ICONS)); /* two of each → 6 pairs, then shuffle */
        renderBoard();
      }

      /* delegated card clicks (one listener on the persistent board; cards are
         buttons so Enter/Space work for keyboard players for free) */
      boardEl.addEventListener("click", function (e) {
        var card = e.target.closest ? e.target.closest(".m-card") : null;
        if (card && boardEl.contains(card)) onCardClick(card);
      });
      root.querySelector(".m-restart").addEventListener("click", newGame);

      newGame();
    },

    /* The arcade calls this on Back / language switch / page leave. The only
       leak-prone resources are the two timers; all DOM listeners live inside
       `root` and are discarded when the host clears it. */
    unmount: function () {
      clearTimers();
    }
  });
})();
