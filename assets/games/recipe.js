/* =========================================================================
   multipage · games/recipe.js — 製程配方記憶 / Recipe Recall

   A Simon-style sequence memory game. Four process tools — deposit, expose,
   etch, implant — light up in a growing "recipe"; watch it, then run the
   same recipe back by tapping the tools in order. Each round adds one step
   and the playback gets a little quicker. One wrong tool ends the run; the
   score is the number of rounds completed and the arcade keeps the highest.

   Playback is driven by a chain of setTimeouts held in module scope so that
   unmount() can stop it mid-sequence. Input is locked while the recipe plays.
   Keyboard: the pads are buttons, and the keys 1–4 map to them left to right.

   Self-registers into window.SEMICON_ARCADE; builds only inside `root`, talks
   to the host only through `ctx`, clears every timer in unmount().
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  var timers = [];  /* every pending setTimeout of the playback / feedback chain */
  function later(fn, ms) { var id = setTimeout(function () { drop(id); fn(); }, ms); timers.push(id); return id; }
  function drop(id) { var i = timers.indexOf(id); if (i !== -1) timers.splice(i, 1); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  var PADS = [
    { key: "deposit", icon: "layers",       name: { en: "Deposit", zh: "沉積" }, hue: "var(--accent)" },
    { key: "expose",  icon: "flare",        name: { en: "Expose",  zh: "曝光" }, hue: "#f5b301" },
    { key: "etch",    icon: "content_cut",  name: { en: "Etch",    zh: "蝕刻" }, hue: "#2bd4d4" },
    { key: "implant", icon: "scatter_plot", name: { en: "Implant", zh: "植入" }, hue: "var(--accent-3)" }
  ];

  var CSS = `
    .game--recipe .rc-pads {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(10px, 3vw, 16px);
      width: min(100%, 400px); margin: 0 auto;
    }
    .game--recipe .rc-pad {
      position: relative; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 8px; padding: 0; border-radius: var(--radius); cursor: pointer; font: inherit; font-weight: 700;
      color: var(--text); background: var(--surface-2); border: 1px solid var(--hairline);
      box-shadow: var(--shadow), inset 0 1px 0 var(--inner-hi);
      transition: transform .12s var(--ease), background .12s var(--ease), box-shadow .12s var(--ease), border-color .12s var(--ease);
      -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    }
    .game--recipe .rc-pad:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .game--recipe .rc-pad[disabled] { cursor: default; }
    .game--recipe .rc-pad .material-symbols-rounded { font-size: clamp(30px, 9vw, 44px); color: var(--pad); transition: transform .12s var(--ease); }
    .game--recipe .rc-pad__name { font-size: .95rem; }
    .game--recipe .rc-pad__key {
      position: absolute; top: 10px; left: 12px; font-family: var(--font-display); font-size: .7rem;
      color: var(--text-mute); opacity: .8;
    }
    .game--recipe .rc-pad.is-lit {
      background: color-mix(in srgb, var(--pad) 26%, var(--surface)); border-color: var(--pad);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--pad) 22%, transparent), 0 10px 30px color-mix(in srgb, var(--pad) 30%, transparent);
      transform: scale(1.03);
    }
    .game--recipe.is-reduced .rc-pad.is-lit { transform: none; }
    .game--recipe .rc-pad.is-lit .material-symbols-rounded { transform: scale(1.12); }
    .game--recipe .rc-pad.is-bad { background: color-mix(in srgb, #d9484f 20%, var(--surface)); border-color: #d9484f; }
    .game--recipe .rc-progress { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; min-height: 10px; margin-top: 18px; }
    .game--recipe .rc-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--hairline-2); }
    .game--recipe .rc-dot.is-done { background: var(--accent); }
    .game--recipe .rc-dot.is-now { background: var(--accent-3); }
    .game--recipe .rc-start { display: flex; justify-content: center; }
    .game--recipe .rc-overlay .rc-icon { font-size: 44px; color: var(--accent-3); }
    .game--recipe .rc-overlay b { color: var(--accent); font-family: var(--font-display); }
    .game--recipe .rc-overlay .rc-sub { color: var(--text-mute); font-size: .9rem; }
  `;

  SEMICON_ARCADE.register({
    id: "recipe",
    icon: "sensors",
    title: { en: "Recipe Recall", zh: "製程配方記憶" },
    desc:  { en: "Watch the process recipe light up, then run it back in the same order. Each round adds a step.",
             zh: "看製程配方依序亮起，再照同樣順序按回去；每一輪多加一步。" },
    scoreLabel: { en: "Best", zh: "最佳" },
    lowerIsBetter: false,

    mount: function (root, ctx) {
      var t = ctx.t, esc = ctx.esc;
      ctx.injectStyle(CSS);

      var S = {
        round:  { en: "Round", zh: "回合" },
        best:   { en: "Best", zh: "最佳" },
        start:  { en: "Start", zh: "開始" },
        restart:{ en: "Restart", zh: "重來" },
        pads:   { en: "Process tools", zh: "製程機台" },
        idle:   { en: "Press Start. Watch the recipe, then tap the tools in the same order.",
                  zh: "按「開始」。看配方亮起的順序，再依序按下機台。" },
        watch:  { en: "Watch the recipe…", zh: "看好配方順序…" },
        go:     { en: "Your turn — run the recipe.", zh: "換你——照順序執行配方。" },
        good:   { en: "Recipe {n} done. One more step…", zh: "第 {n} 回合完成，再加一步…" },
        over:   { en: "Recipe broke", zh: "配方跑錯了" },
        overSub:{ en: "The next step was {x}. You completed {n} rounds.", zh: "下一步應該是「{x}」。你完成了 {n} 回合。" },
        again:  { en: "Try again", zh: "再試一次" },
        lit:    { en: "(lit)", zh: "（亮起）" }
      };
      function fmt(o, m) { var s = t(o); Object.keys(m).forEach(function (k) { s = s.replace("{" + k + "}", m[k]); }); return s; }
      function bestText() { var b = ctx.getBest(); return b == null ? "—" : String(b); }

      /* ---- state ---- */
      var seq = [];        /* pad indices in the current recipe */
      var pos = 0;         /* how far the player has echoed */
      var round = 0;       /* rounds completed */
      var playing = false; /* recipe is being shown; input locked */
      var running = false; /* a run is in progress (between Start and game over) */

      root.innerHTML =
        '<div class="game game--recipe' + (ctx.reduceMotion ? " is-reduced" : "") + '">' +
          '<div class="game__head">' +
            '<div class="game__stats">' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.round)) + '</span>' +
                '<span class="game__stat-val rc-round">0</span></div>' +
              '<div class="game__stat"><span class="game__stat-label">' + esc(t(S.best)) + '</span>' +
                '<span class="game__stat-val rc-best">' + esc(bestText()) + '</span></div>' +
            '</div>' +
            '<button class="game__btn rc-startbtn" type="button">' +
              '<span class="material-symbols-rounded" aria-hidden="true">play_arrow</span>' +
              '<span>' + esc(t(S.start)) + '</span>' +
            '</button>' +
          '</div>' +
          '<div class="game__board">' +
            '<div class="rc-pads" role="group" aria-label="' + esc(t(S.pads)) + '">' +
              PADS.map(function (p, i) {
                return '<button class="rc-pad" type="button" data-pad="' + i + '" style="--pad:' + p.hue + '" ' +
                  'aria-label="' + esc(t(p.name)) + '" disabled>' +
                  '<span class="rc-pad__key" aria-hidden="true">' + (i + 1) + '</span>' +
                  '<span class="material-symbols-rounded" aria-hidden="true">' + esc(p.icon) + '</span>' +
                  '<span class="rc-pad__name">' + esc(t(p.name)) + '</span>' +
                '</button>';
              }).join("") +
            '</div>' +
            '<div class="rc-progress" aria-hidden="true"></div>' +
          '</div>' +
          '<p class="game__msg rc-msg" aria-live="polite">' + esc(t(S.idle)) + '</p>' +
        '</div>';

      var roundEl = root.querySelector(".rc-round");
      var bestEl = root.querySelector(".rc-best");
      var msgEl = root.querySelector(".rc-msg");
      var boardEl = root.querySelector(".game__board");
      var progEl = root.querySelector(".rc-progress");
      var startBtn = root.querySelector(".rc-startbtn");
      var pads = [].slice.call(root.querySelectorAll(".rc-pad"));

      function setPads(enabled) { pads.forEach(function (b) { b.disabled = !enabled; }); }
      function paintProgress() {
        progEl.innerHTML = seq.map(function (_, i) {
          return '<span class="rc-dot' + (i < pos ? " is-done" : (i === pos && !playing ? " is-now" : "")) + '"></span>';
        }).join("");
      }
      /* playback speed: 520ms lit at the start, tightening to 260ms by round 14 */
      function stepMs() { return Math.max(260, 520 - round * 20); }

      function light(i, ms, cb) {
        var b = pads[i];
        b.classList.add("is-lit");
        b.setAttribute("aria-label", t(PADS[i].name) + " " + t(S.lit));
        later(function () {
          b.classList.remove("is-lit");
          b.setAttribute("aria-label", t(PADS[i].name));
          if (cb) later(cb, Math.round(ms * 0.35));
        }, ms);
      }

      function showRecipe() {
        playing = true; pos = 0;
        setPads(false);
        msgEl.textContent = t(S.watch);
        paintProgress();
        var i = 0, ms = stepMs();
        (function next() {
          if (i >= seq.length) {
            playing = false;
            setPads(true);
            msgEl.textContent = t(S.go);
            paintProgress();
            pads[0].focus();
            return;
          }
          light(seq[i++], ms, next);
        })();
      }

      function extend() {
        seq.push(Math.floor(Math.random() * PADS.length));
        later(showRecipe, round === 0 ? 400 : 900);
      }

      function press(i) {
        if (!running || playing) return;
        light(i, 180);
        if (i !== seq[pos]) { fail(i); return; }
        pos++;
        paintProgress();
        if (pos === seq.length) {
          round++;
          roundEl.textContent = String(round);
          var best = ctx.setBest(round);
          bestEl.textContent = String(best);
          msgEl.textContent = fmt(S.good, { n: round });
          setPads(false);
          extend();
        }
      }

      function fail(pressed) {
        running = false;
        setPads(false);
        pads[pressed].classList.add("is-bad");
        pads[seq[pos]].classList.add("is-lit");
        var expected = t(PADS[seq[pos]].name);
        later(function () {
          pads[pressed].classList.remove("is-bad");
          pads[seq[pos]].classList.remove("is-lit");
          var ov = document.createElement("div");
          ov.className = "game__overlay rc-overlay";
          ov.setAttribute("role", "dialog");
          ov.setAttribute("aria-label", t(S.over));
          ov.innerHTML =
            '<span class="material-symbols-rounded rc-icon" aria-hidden="true">sensors_off</span>' +
            '<h3>' + esc(t(S.over)) + '</h3>' +
            '<p>' + esc(fmt(S.overSub, { x: expected, n: round })) + '</p>' +
            '<p class="rc-sub">' + esc(t(S.best)) + ' <b>' + esc(bestText()) + '</b></p>' +
            '<button class="game__btn rc-again" type="button">' +
              '<span class="material-symbols-rounded" aria-hidden="true">replay</span>' +
              '<span>' + esc(t(S.again)) + '</span>' +
            '</button>';
          boardEl.appendChild(ov);
          var again = ov.querySelector(".rc-again");
          again.addEventListener("click", start);
          again.focus();
        }, 900);
      }

      function start() {
        clearTimers();
        var ov = boardEl.querySelector(".game__overlay"); if (ov) ov.remove();
        pads.forEach(function (b) { b.classList.remove("is-lit", "is-bad"); });
        seq = []; pos = 0; round = 0; playing = false; running = true;
        roundEl.textContent = "0";
        bestEl.textContent = bestText();
        startBtn.querySelector("span:last-child").textContent = t(S.restart);
        startBtn.querySelector(".material-symbols-rounded").textContent = "refresh";
        extend();
      }

      boardEl.addEventListener("click", function (e) {
        var el = e.target.closest ? e.target.closest(".rc-pad") : null;
        if (el && !el.disabled && boardEl.contains(el)) press(Number(el.getAttribute("data-pad")));
      });
      root.addEventListener("keydown", function (e) {
        var n = Number(e.key);
        if (n >= 1 && n <= PADS.length && running && !playing) { e.preventDefault(); press(n - 1); }
      });
      startBtn.addEventListener("click", start);
    },

    unmount: function () { clearTimers(); }
  });
})();
