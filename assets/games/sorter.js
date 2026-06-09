/* =========================================================================
   multipage · games/sorter.js  —  晶圓分類反應 / Wafer Sorter

   A fast reaction mini-game. One wafer (GOOD or DEFECTIVE) appears in the
   centre of the board at a time; the player must route it before a shrinking
   timer runs out — LEFT = reject (defective), RIGHT = accept (good) — using
   either the two large on-screen buttons OR the keyboard ArrowLeft/ArrowRight.

   Self-registers into window.SEMICON_ARCADE. All visible text is bilingual via
   ctx.t({en,zh}); all colour comes from CSS variables (one restrained warning
   tone is centralised as a scoped custom property). unmount() tears down every
   timer / rAF and the single document keydown listener.
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  /* ---- tunables ---- */
  var MAX_LIVES     = 3;
  var START_WINDOW  = 1500;  /* ms allowed for the first wafer            */
  var FLOOR_WINDOW  = 500;   /* fastest the per-wafer window ever gets     */
  var WINDOW_STEP   = 50;    /* ms shaved off the window per wafer served  */
  var BASE_POINTS   = 10;    /* points for a correct sort, before combo    */
  var MAX_MULT      = 5;     /* combo multiplier cap                       */
  var FEEDBACK_MS   = 260;   /* gap between resolving a wafer and the next */
  var LOW_FRACTION  = 0.34;  /* timebar turns to the warning tone below it */

  /* ---- module-scope handles (must all be clearable in unmount) ---- */
  var rafId = 0, tickTimer = 0, feedbackTimer = 0;
  var keyHandler = null;
  var styledOnce = false;

  /* ---- live game state ---- */
  var ctx = null;
  var refs = null;
  var score = 0, lives = MAX_LIVES, combo = 0, served = 0;
  var running = false, waferActive = false, curType = null;
  var waferStart = 0, curWindow = START_WINDOW;

  /* =====================================================================
     teardown — kill timers + the document listener (called by unmount and
     defensively at the start of every mount)
     ===================================================================== */
  function clearTimers() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    if (tickTimer) { clearInterval(tickTimer); tickTimer = 0; }
    if (feedbackTimer) { clearTimeout(feedbackTimer); feedbackTimer = 0; }
  }
  function teardown() {
    clearTimers();
    if (keyHandler) { document.removeEventListener("keydown", keyHandler); keyHandler = null; }
  }

  /* =====================================================================
     one-time scoped styles (every selector prefixed .game--sorter)
     ===================================================================== */
  function injectCss() {
    if (styledOnce) return;
    styledOnce = true;
    ctx.injectStyle([
      /* single restrained warning tone, centralised (light + dark) */
      ".game--sorter{--sorter-warn:#e0552f;--sorter-warn-soft:rgba(224,85,47,.14);}",
      "[data-theme=\"dark\"] .game--sorter{--sorter-warn:#ff7d5c;--sorter-warn-soft:rgba(255,125,92,.18);}",

      ".game--sorter .game__stat-val{display:inline-flex;align-items:center;gap:6px;}",
      ".game--sorter .heart{font-size:18px;color:var(--sorter-warn);opacity:.26;" +
        "font-variation-settings:'FILL' 0;transition:opacity .2s var(--ease);}",
      ".game--sorter .heart--on{opacity:1;font-variation-settings:'FILL' 1;}",

      ".game--sorter .board{display:flex;flex-direction:column;gap:14px;min-height:300px;}",
      ".game--sorter .timebar{width:100%;height:8px;border-radius:var(--radius-pill);" +
        "background:var(--chip-bg);overflow:hidden;border:1px solid var(--hairline-2);}",
      ".game--sorter .timebar__fill{height:100%;width:100%;border-radius:inherit;" +
        "transform-origin:left center;background:linear-gradient(90deg,var(--accent-2),var(--accent));}",
      ".game--sorter .timebar__fill.is-low{background:linear-gradient(90deg,var(--sorter-warn),var(--accent-3));}",

      ".game--sorter .stage{position:relative;flex:1;display:flex;align-items:center;" +
        "justify-content:center;min-height:200px;}",
      ".game--sorter .combo{position:absolute;top:0;left:0;font-family:var(--font-display);" +
        "font-weight:700;font-size:1rem;color:var(--accent-2);padding:4px 10px;border-radius:var(--radius-pill);" +
        "background:var(--chip-bg);border:1px solid var(--hairline);opacity:0;transition:opacity .18s var(--ease);}",
      ".game--sorter .combo.show{opacity:1;}",
      ".game--sorter .binhint{position:absolute;top:50%;transform:translateY(-50%);display:flex;" +
        "align-items:center;gap:4px;font-size:.72rem;font-weight:700;letter-spacing:.04em;" +
        "text-transform:uppercase;color:var(--text-mute);pointer-events:none;}",
      ".game--sorter .binhint--l{left:0;}",
      ".game--sorter .binhint--r{right:0;}",
      ".game--sorter .binhint .material-symbols-rounded{font-size:18px;}",

      ".game--sorter .wafer{position:relative;width:clamp(108px,32vw,146px);aspect-ratio:1;" +
        "border-radius:50%;display:grid;place-items:center;border:1px solid var(--hairline);" +
        "box-shadow:var(--shadow-lg),inset 0 1px 0 var(--inner-hi);}",
      ".game--sorter .wafer::after{content:\"\";position:absolute;inset:12%;border-radius:50%;" +
        "background:repeating-radial-gradient(circle at 50% 50%,transparent 0 7px," +
        "color-mix(in srgb,currentColor 18%,transparent) 7px 8px);opacity:.5;pointer-events:none;}",
      ".game--sorter .wafer .material-symbols-rounded{position:relative;z-index:1;font-size:clamp(40px,12vw,56px);}",
      ".game--sorter .wafer--good{color:var(--accent-2);border-color:var(--accent-line);" +
        "background:radial-gradient(circle at 35% 28%,color-mix(in srgb,var(--accent-2) 30%,var(--surface-solid)),var(--surface-solid));}",
      ".game--sorter .wafer--bad{color:var(--sorter-warn);border-color:color-mix(in srgb,var(--sorter-warn) 42%,transparent);" +
        "background:radial-gradient(circle at 35% 28%,var(--sorter-warn-soft),var(--surface-solid));}",

      ".game--sorter .controls{display:flex;gap:12px;}",
      ".game--sorter .sortbtn{flex:1;min-width:0;min-height:60px;display:inline-flex;align-items:center;" +
        "justify-content:center;gap:8px;cursor:pointer;font:inherit;font-weight:700;font-size:1rem;" +
        "padding:12px 14px;border-radius:var(--radius);color:var(--on-accent);border:1px solid transparent;" +
        "box-shadow:var(--shadow-accent);transition:transform .15s var(--ease),filter .15s var(--ease);}",
      ".game--sorter .sortbtn .material-symbols-rounded{font-size:24px;}",
      ".game--sorter .sortbtn:hover{transform:translateY(-2px);}",
      ".game--sorter .sortbtn:active{transform:translateY(0) scale(.97);}",
      ".game--sorter .sortbtn--reject{background:linear-gradient(135deg,var(--sorter-warn),var(--accent-3));}",
      ".game--sorter .sortbtn--accept{background:linear-gradient(135deg,var(--accent-2),var(--accent));}",
      ".game--sorter .sortbtn:disabled{opacity:.5;cursor:default;transform:none;box-shadow:var(--shadow);}",

      ".game--sorter .overlay-score{font-family:var(--font-display);font-weight:700;" +
        "font-size:clamp(2rem,9vw,3rem);color:var(--accent);line-height:1;}",

      "@media (prefers-reduced-motion:no-preference){",
      "  .game--sorter .wafer.pop{animation:sorter-pop .24s var(--ease-out);}",
      "  .game--sorter .board.flash-good{animation:sorter-good .3s var(--ease);}",
      "  .game--sorter .board.flash-bad{animation:sorter-bad .34s var(--ease);}",
      "}",
      "@keyframes sorter-pop{from{transform:scale(.72);opacity:0;}to{transform:scale(1);opacity:1;}}",
      "@keyframes sorter-good{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent-2) 60%,transparent);}" +
        "100%{box-shadow:var(--shadow-lg),inset 0 1px 0 var(--inner-hi);}}",
      "@keyframes sorter-bad{0%,60%{transform:translateX(0);}15%{transform:translateX(-7px);}" +
        "45%{transform:translateX(7px);}100%{transform:translateX(0);}}",

      ".game--sorter .controls{flex-wrap:nowrap;}",
      "@media (max-width:360px){.game--sorter .sortbtn{font-size:.92rem;}}"
    ].join("\n"));
  }

  /* =====================================================================
     small helpers
     ===================================================================== */
  function t(o) { return ctx.t(o); }

  function windowFor(n) {
    return Math.max(FLOOR_WINDOW, START_WINDOW - n * WINDOW_STEP);
  }

  function fmtBest() {
    var b = ctx.getBest();
    return (b == null) ? "—" : String(b);
  }

  function heartsHtml() {
    var out = "";
    for (var i = 0; i < MAX_LIVES; i++) {
      out += '<span class="material-symbols-rounded heart' + (i < lives ? " heart--on" : "") +
             '" aria-hidden="true">favorite</span>';
    }
    return out;
  }

  /* =====================================================================
     DOM scaffold (built once per mount) — dynamic parts updated in place
     so the click/keydown wiring is never lost
     ===================================================================== */
  function buildDom(root) {
    root.innerHTML =
      '<div class="game game--sorter">' +
        '<div class="game__head">' +
          '<div class="game__stats">' +
            '<div class="game__stat"><span class="game__stat-label">' + ctx.esc(t({ en: "Score", zh: "分數" })) + '</span>' +
              '<span class="game__stat-val" id="so-score">0</span></div>' +
            '<div class="game__stat"><span class="game__stat-label">' + ctx.esc(t({ en: "Lives", zh: "生命" })) + '</span>' +
              '<span class="game__stat-val" id="so-lives">' + heartsHtml() + '</span></div>' +
            '<div class="game__stat"><span class="game__stat-label">' + ctx.esc(t({ en: "Best", zh: "最佳" })) + '</span>' +
              '<span class="game__stat-val" id="so-best">' + ctx.esc(fmtBest()) + '</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="game__board">' +
          '<div class="board" id="so-board">' +
            '<div class="timebar"><div class="timebar__fill" id="so-bar"></div></div>' +
            '<div class="stage">' +
              '<span class="combo" id="so-combo" aria-hidden="true"></span>' +
              '<span class="binhint binhint--l"><span class="material-symbols-rounded">chevron_left</span>' +
                ctx.esc(t({ en: "Reject", zh: "不良" })) + '</span>' +
              '<span class="binhint binhint--r">' + ctx.esc(t({ en: "Accept", zh: "良品" })) +
                '<span class="material-symbols-rounded">chevron_right</span></span>' +
              '<div class="wafer" id="so-wafer" role="img" aria-label=""></div>' +
            '</div>' +
          '</div>' +
          '<div class="game__overlay" id="so-overlay"></div>' +
        '</div>' +

        '<div class="controls">' +
          '<button type="button" class="sortbtn sortbtn--reject" id="so-reject" disabled ' +
            'aria-label="' + ctx.esc(t({ en: "Reject defective wafer (Arrow Left)", zh: "拒收不良晶圓(左方向鍵)" })) + '">' +
            '<span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>' +
            ctx.esc(t({ en: "Reject", zh: "不良" })) + '</button>' +
          '<button type="button" class="sortbtn sortbtn--accept" id="so-accept" disabled ' +
            'aria-label="' + ctx.esc(t({ en: "Accept good wafer (Arrow Right)", zh: "收取良品晶圓(右方向鍵)" })) + '">' +
            ctx.esc(t({ en: "Accept", zh: "良品" })) +
            '<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span></button>' +
        '</div>' +

        '<p class="game__msg" id="so-msg"></p>' +
      '</div>';

    refs = {
      score:   root.querySelector("#so-score"),
      lives:   root.querySelector("#so-lives"),
      best:    root.querySelector("#so-best"),
      board:   root.querySelector("#so-board"),
      bar:     root.querySelector("#so-bar"),
      combo:   root.querySelector("#so-combo"),
      wafer:   root.querySelector("#so-wafer"),
      overlay: root.querySelector("#so-overlay"),
      reject:  root.querySelector("#so-reject"),
      accept:  root.querySelector("#so-accept"),
      msg:     root.querySelector("#so-msg")
    };

    refs.reject.addEventListener("click", function () { sort("defective"); });
    refs.accept.addEventListener("click", function () { sort("good"); });
  }

  /* =====================================================================
     view updates
     ===================================================================== */
  function updateStats() {
    refs.score.textContent = String(score);
    refs.lives.innerHTML = heartsHtml();
    refs.best.textContent = fmtBest();
  }
  function setControls(on) {
    refs.reject.disabled = !on;
    refs.accept.disabled = !on;
  }
  function setBar(frac) {
    var f = Math.max(0, Math.min(1, frac));
    refs.bar.style.transform = "scaleX(" + f + ")";
    if (f <= LOW_FRACTION) refs.bar.classList.add("is-low");
    else refs.bar.classList.remove("is-low");
  }
  function showCombo() {
    if (combo > 1) {
      refs.combo.textContent = "x" + Math.min(combo, MAX_MULT);
      refs.combo.classList.add("show");
    } else {
      refs.combo.classList.remove("show");
    }
  }
  function flashBoard(kind) {
    if (ctx.reduceMotion) return;
    refs.board.classList.remove("flash-good", "flash-bad");
    /* force reflow so the animation can retrigger */
    void refs.board.offsetWidth;
    refs.board.classList.add(kind === "good" ? "flash-good" : "flash-bad");
  }
  function renderWafer(type) {
    var good = type === "good";
    refs.wafer.className = "wafer " + (good ? "wafer--good" : "wafer--bad") +
      (ctx.reduceMotion ? "" : " pop");
    refs.wafer.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">' +
      (good ? "album" : "broken_image") + "</span>";
    refs.wafer.setAttribute("aria-label",
      good ? t({ en: "Good wafer", zh: "良品晶圓" }) : t({ en: "Defective wafer", zh: "不良晶圓" }));
    refs.wafer.style.visibility = "visible";
  }
  function hideWafer() {
    refs.wafer.style.visibility = "hidden";
    refs.wafer.innerHTML = "";
  }

  /* =====================================================================
     overlays — start screen + game over
     ===================================================================== */
  function showOverlay(kind) {
    var html;
    if (kind === "start") {
      html =
        '<span class="material-symbols-rounded" aria-hidden="true" style="font-size:42px;color:var(--accent)">swap_horiz</span>' +
        "<h3>" + ctx.esc(t({ en: "Wafer Sorter", zh: "晶圓分類反應" })) + "</h3>" +
        "<p>" + ctx.esc(t({
          en: "Send each wafer to the right bin before time runs out. Good → Accept, cracked → Reject.",
          zh: "在時間用完前把每片晶圓送進正確的桶。良品 → 收取,破裂 → 拒收。"
        })) + "</p>" +
        '<button type="button" class="game__btn" id="so-action">' +
          '<span class="material-symbols-rounded" aria-hidden="true">play_arrow</span>' +
          ctx.esc(t({ en: "Start", zh: "開始" })) + "</button>";
    } else {
      html =
        "<h3>" + ctx.esc(t({ en: "Game Over", zh: "遊戲結束" })) + "</h3>" +
        '<div class="overlay-score">' + score + "</div>" +
        "<p>" + ctx.esc(t({ en: "Best", zh: "最佳" })) + ": " + ctx.esc(fmtBest()) + "</p>" +
        '<button type="button" class="game__btn" id="so-action">' +
          '<span class="material-symbols-rounded" aria-hidden="true">replay</span>' +
          ctx.esc(t({ en: "Play again", zh: "再玩一次" })) + "</button>";
    }
    refs.overlay.innerHTML = html;
    refs.overlay.style.display = "flex";
    var act = refs.overlay.querySelector("#so-action");
    if (act) act.addEventListener("click", start);
  }
  function hideOverlay() {
    refs.overlay.style.display = "none";
    refs.overlay.innerHTML = "";
  }

  /* =====================================================================
     core loop
     ===================================================================== */
  function start() {
    clearTimers();
    score = 0; lives = MAX_LIVES; combo = 0; served = 0;
    running = true;
    updateStats();
    hideOverlay();
    showCombo();
    refs.msg.textContent = t({ en: "← Reject  ·  Accept →", zh: "← 不良  ·  良品 →" });
    nextWafer();
  }

  function nextWafer() {
    clearTimers();
    if (!running) return;
    refs.board.classList.remove("flash-good", "flash-bad");
    curType = Math.random() < 0.5 ? "good" : "defective";
    curWindow = windowFor(served);
    served++;
    waferActive = true;
    setControls(true);
    setBar(1);
    renderWafer(curType);
    startCountdown(curWindow);
  }

  function startCountdown(windowMs) {
    waferStart = (window.performance && performance.now) ? performance.now() : Date.now();
    if (ctx.reduceMotion) {
      /* coarse, step-wise countdown — no smooth animation */
      tickTimer = setInterval(function () {
        var elapsed = now() - waferStart;
        setBar(1 - elapsed / windowMs);
        if (elapsed >= windowMs) { clearTimers(); onTimeout(); }
      }, 120);
    } else {
      var loop = function () {
        var elapsed = now() - waferStart;
        setBar(1 - elapsed / windowMs);
        if (elapsed >= windowMs) { rafId = 0; onTimeout(); return; }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }
  }
  function now() {
    return (window.performance && performance.now) ? performance.now() : Date.now();
  }

  function sort(choice) {
    if (!running || !waferActive) return;
    waferActive = false;
    clearTimers();
    setControls(false);
    if (choice === curType) resolveCorrect();
    else resolveMiss(t({ en: "Wrong bin — life lost", zh: "放錯桶 — 失去一命" }));
  }

  function onTimeout() {
    if (!running || !waferActive) return;
    waferActive = false;
    setControls(false);
    resolveMiss(t({ en: "Too slow — life lost", zh: "太慢了 — 失去一命" }));
  }

  function resolveCorrect() {
    combo++;
    var mult = Math.min(combo, MAX_MULT);
    var gained = BASE_POINTS * mult;
    score += gained;
    updateStats();
    showCombo();
    flashBoard("good");
    refs.msg.textContent = t({ en: "Sorted! ", zh: "分類正確! " }) + "+" + gained +
      "  ·  " + t({ en: "Combo", zh: "連擊" }) + " x" + mult;
    scheduleNext();
  }

  function resolveMiss(reason) {
    combo = 0;
    lives--;
    updateStats();
    showCombo();
    flashBoard("bad");
    refs.msg.textContent = reason;
    if (lives <= 0) { gameOver(); return; }
    scheduleNext();
  }

  function scheduleNext() {
    setBar(1);
    feedbackTimer = setTimeout(function () { feedbackTimer = 0; nextWafer(); }, FEEDBACK_MS);
  }

  function gameOver() {
    running = false;
    waferActive = false;
    clearTimers();
    setControls(false);
    hideWafer();
    refs.combo.classList.remove("show");
    ctx.setBest(score);
    updateStats();
    showOverlay("over");
  }

  /* =====================================================================
     keyboard — single document listener, added on mount, removed on unmount
     ===================================================================== */
  function onKey(e) {
    var k = e.key;
    if (k === "ArrowLeft") { e.preventDefault(); sort("defective"); }
    else if (k === "ArrowRight") { e.preventDefault(); sort("good"); }
    else if ((k === "Enter" || k === " ") && !running) {
      e.preventDefault(); start();
    }
  }

  /* =====================================================================
     registration
     ===================================================================== */
  SEMICON_ARCADE.register({
    id: "sorter",
    icon: "swap_horiz",
    title: { en: "Wafer Sorter", zh: "晶圓分類反應" },
    desc:  { en: "Snap-judge good vs. cracked wafers before the clock runs out.",
             zh: "在時間歸零前,快速判斷良品與破裂晶圓並左右分類。" },
    scoreLabel: { en: "Best", zh: "最佳" },
    lowerIsBetter: false,

    mount: function (root, c) {
      ctx = c;
      teardown();           /* defensive: clear anything from a prior mount */
      injectCss();
      running = false; waferActive = false; combo = 0;
      score = 0; lives = MAX_LIVES; served = 0;
      buildDom(root);
      hideWafer();
      setBar(1);
      setControls(false);
      refs.msg.textContent = t({ en: "Press Start to begin.", zh: "按開始進行遊戲。" });
      showOverlay("start");
      keyHandler = onKey;
      document.addEventListener("keydown", keyHandler);
    },

    unmount: function () {
      teardown();
      running = false; waferActive = false;
      refs = null; ctx = null;
    }
  });
})();
