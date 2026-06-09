/* =========================================================================
   multipage · games/quiz.js  —  論壇快問快答 / Forum Quiz

   A multiple-choice quiz whose questions are GENERATED AT MOUNT TIME from the
   site's own content in window.SITE_PAGES (read live, never duplicated here):

     • category  — "which forum belongs to the <track>?"  (forums.categories + items)
     • date      — "on which day is <forum> held?"        (forums item.tags)
     • stat      — "how many <metric> at SEMICON 2026?"   (home hub stats)
     • zone      — "which spotlight zone is described?"    (zones bento tiles)

   Every question/option is a bilingual {en,zh} object so the whole game repaints
   when the site language toggles (the arcade re-mounts this game on lang switch).

   Self-registers via window.SEMICON_ARCADE. Owns ONLY this file.
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  var TOTAL = 8;            /* questions per round */

  /* module-scope handles so unmount() can always clean up (single instance) */
  var timer = null;
  var keyHandler = null;

  /* ---------------------------------------------------------------- utils */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* normalize any {en,zh} (or partial) into a complete bilingual pair */
  function L2(o) {
    if (!o) return { en: "", zh: "" };
    return { en: o.en || o.zh || "", zh: o.zh || o.en || "" };
  }

  function findPage(slug) {
    var pages = window.SITE_PAGES || [];
    for (var i = 0; i < pages.length; i++) if (pages[i] && pages[i].slug === slug) return pages[i];
    return null;
  }

  function commas(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  /* round to ~2 significant figures so distractors look like real, tidy numbers */
  function round2sig(x) {
    if (x <= 0) return 0;
    var d = Math.floor(Math.log10(x));
    var f = Math.pow(10, Math.max(0, d - 1));
    return Math.round(x / f) * f;
  }

  function clip(str, max) {
    if (!str) return "";
    str = String(str);
    if (str.length <= max) return str;
    return str.slice(0, max).replace(/\s+\S*$/, "") + "…";
  }

  /* "9/2" -> nice bilingual day label; unknown tags fall back to themselves */
  function dateLabel(tag) {
    var map = {
      "8/31": { en: "Aug 31", zh: "8/31" },
      "9/1":  { en: "Sep 1",  zh: "9/1" },
      "9/2":  { en: "Sep 2",  zh: "9/2" },
      "9/3":  { en: "Sep 3",  zh: "9/3" },
      "9/4":  { en: "Sep 4",  zh: "9/4" }
    };
    return map[tag] || { en: String(tag), zh: String(tag) };
  }

  /* a question's options: 1 correct + N distractors, all {en,zh}, then shuffled */
  function buildOptions(correct, distractors) {
    var opts = [{ text: L2(correct), correct: true }];
    distractors.forEach(function (d) { opts.push({ text: L2(d), correct: false }); });
    return shuffle(opts);
  }

  /* ----------------------------------------------- question generators */
  function catQuestions(forumsPage) {
    var qs = [];
    var cats = (forumsPage && forumsPage.categories) || [];
    var forums = (forumsPage && forumsPage.items) || [];
    cats.forEach(function (cat) {
      if (!cat || !cat.key) return;
      var inCat = forums.filter(function (f) { return f && f.title && f.category === cat.key; });
      var others = forums.filter(function (f) { return f && f.title && f.category !== cat.key; });
      if (inCat.length < 1 || others.length < 3) return;
      var correct = pick(inCat);
      var distractors = sample(others, 3).map(function (f) { return L2(f.title); });
      qs.push({
        prompt: {
          en: "Which forum belongs to the “" + (cat.en || cat.zh || cat.key) + "” track?",
          zh: "下列哪一場論壇屬於「" + (cat.zh || cat.en || cat.key) + "」領域？"
        },
        options: buildOptions(L2(correct.title), distractors)
      });
    });
    return qs;
  }

  function uniqueDates(forums) {
    var seen = {}, out = [];
    forums.forEach(function (f) {
      ((f && f.tags) || []).forEach(function (tg) {
        if (!seen[tg]) { seen[tg] = true; out.push(tg); }
      });
    });
    return out;
  }

  function dateQuestions(forumsPage) {
    var qs = [];
    var forums = (forumsPage && forumsPage.items) || [];
    var allDates = uniqueDates(forums);
    forums.forEach(function (f) {
      /* only single-day forums keep the answer unambiguous */
      if (!f || !f.title || !f.tags || f.tags.length !== 1) return;
      var correctDate = f.tags[0];
      var wrong = allDates.filter(function (dt) { return f.tags.indexOf(dt) === -1; });
      if (wrong.length < 3) return;
      var distractors = sample(wrong, 3).map(dateLabel);
      var ttl = L2(f.title);
      qs.push({
        prompt: {
          en: "On which day is the “" + ttl.en + "” held?",
          zh: "「" + ttl.zh + "」在哪一天舉行？"
        },
        options: buildOptions(dateLabel(correctDate), distractors)
      });
    });
    return qs;
  }

  function numberDistractors(n) {
    var factors = [0.4, 0.55, 0.7, 0.85, 1.15, 1.3, 1.6, 2, 2.5];
    var out = [], seen = {};
    seen[n] = true;
    shuffle(factors).forEach(function (f) {
      var v = round2sig(n * f);
      if (v > 0 && !seen[v]) { seen[v] = true; out.push(v); }
    });
    return out;
  }

  function statQuestions(homePage) {
    var qs = [];
    var stats = (homePage && homePage.stats) || [];
    stats.forEach(function (s) {
      if (!s || s.num == null || !s.label) return;
      var n = Number(s.num);
      if (!isFinite(n) || n <= 0) return;
      var suffix = s.suffix || "";
      var wrong = numberDistractors(n);
      if (wrong.length < 3) return;
      var correctText = commas(n) + suffix;
      var distractors = sample(wrong, 3).map(function (w) {
        var ww = commas(w) + suffix;
        return { en: ww, zh: ww };
      });
      var label = L2(s.label);
      qs.push({
        prompt: {
          en: "How many " + label.en.toLowerCase() + " are there at SEMICON Taiwan 2026?",
          zh: "SEMICON Taiwan 2026 有多少" + label.zh + "？"
        },
        options: buildOptions({ en: correctText, zh: correctText }, distractors)
      });
    });
    return qs;
  }

  function zoneQuestions(zonesPage) {
    var qs = [];
    var tiles = (zonesPage && zonesPage.tiles) || [];
    var usable = tiles.filter(function (tl) { return tl && tl.title && tl.body; });
    if (usable.length < 4) return qs;
    usable.forEach(function (tile) {
      var others = usable.filter(function (o) { return o !== tile; });
      if (others.length < 3) return;
      var distractors = sample(others, 3).map(function (o) { return L2(o.title); });
      var body = L2(tile.body);
      qs.push({
        prompt: {
          en: "Which spotlight zone does this describe? “" + clip(body.en, 120) + "”",
          zh: "下列敘述屬於哪一個特區？「" + clip(body.zh, 60) + "」"
        },
        options: buildOptions(L2(tile.title), distractors)
      });
    });
    return qs;
  }

  /* Assemble one round: round-robin across question types for guaranteed
     variety, defensive against any missing/empty data shape. */
  function buildRound(total) {
    var forumsPage = findPage("forums");
    var homePage = findPage("home");
    var zonesPage = findPage("zones");

    var buckets = [];
    [ catQuestions(forumsPage),
      dateQuestions(forumsPage),
      statQuestions(homePage),
      zoneQuestions(zonesPage) ].forEach(function (b) {
      if (b && b.length) buckets.push(shuffle(b));
    });

    var round = [], guard = 0;
    function anyLeft() { return buckets.some(function (b) { return b.length; }); }
    while (round.length < total && anyLeft() && guard < 999) {
      for (var i = 0; i < buckets.length && round.length < total; i++) {
        if (buckets[i].length) round.push(buckets[i].pop());
      }
      guard++;
    }
    return shuffle(round);
  }

  /* ---------------------------------------------------------------- game */
  function unmount() {
    if (timer) { clearTimeout(timer); timer = null; }
    if (keyHandler) { document.removeEventListener("keydown", keyHandler); keyHandler = null; }
  }

  function mount(root, ctx) {
    unmount(); /* clear anything left from a prior mount before re-binding */

    var t = ctx.t, esc = ctx.esc;
    var REVEAL_MS = ctx.reduceMotion ? 650 : 950;

    var T = {
      q:        { en: "Question",   zh: "題目" },
      score:    { en: "Score",      zh: "分數" },
      best:     { en: "Best",       zh: "最佳" },
      restart:  { en: "Restart",    zh: "重新開始" },
      hint:     { en: "Tap the answer — or press 1–4.", zh: "點選答案——或按 1–4。" },
      right:    { en: "Correct!",   zh: "答對了！" },
      wrong:    { en: "Not quite.", zh: "答錯了。" },
      answer:   { en: "Answer: ",   zh: "正解：" },
      optsAria: { en: "Answer options", zh: "答案選項" },
      finalCap: { en: "Final score", zh: "最終得分" },
      result:   { en: "You got {c} of {n} right.", zh: "答對 {c} / {n} 題。" },
      again:    { en: "Play again", zh: "再玩一次" },
      noData:   { en: "No quiz data available right now.", zh: "目前沒有可用的題目資料。" }
    };

    injectStyles(ctx);

    root.innerHTML =
      '<div class="game game--quiz">' +
        '<div class="game__head">' +
          '<div class="game__stats">' +
            '<div class="game__stat"><span class="game__stat-label">' + esc(t(T.q)) + '</span>' +
              '<span class="game__stat-val" data-q>—</span></div>' +
            '<div class="game__stat"><span class="game__stat-label">' + esc(t(T.score)) + '</span>' +
              '<span class="game__stat-val" data-score>0</span></div>' +
            '<div class="game__stat"><span class="game__stat-label">' + esc(t(T.best)) + '</span>' +
              '<span class="game__stat-val" data-best>—</span></div>' +
          '</div>' +
          '<button class="game__btn game__btn--ghost" type="button" data-restart ' +
            'aria-label="' + esc(t(T.restart)) + '">' +
            '<span class="material-symbols-rounded" aria-hidden="true">restart_alt</span>' +
            '<span>' + esc(t(T.restart)) + '</span>' +
          '</button>' +
        '</div>' +
        '<div class="game__board" data-board>' +
          '<div class="quiz__progress" aria-hidden="true"><span class="quiz__progress-bar" data-bar></span></div>' +
          '<p class="quiz__prompt" data-prompt aria-live="polite"></p>' +
          '<div class="quiz__options" data-options role="group" aria-label="' + esc(t(T.optsAria)) + '"></div>' +
          '<p class="game__msg" data-msg></p>' +
        '</div>' +
      '</div>';

    var qEl      = root.querySelector("[data-q]");
    var scoreEl  = root.querySelector("[data-score]");
    var bestEl   = root.querySelector("[data-best]");
    var barEl    = root.querySelector("[data-bar]");
    var promptEl = root.querySelector("[data-prompt]");
    var optionsEl = root.querySelector("[data-options]");
    var msgEl    = root.querySelector("[data-msg]");
    var boardEl  = root.querySelector("[data-board]");

    var questions = [];
    var qIndex = 0, correctCount = 0, score = 0, streak = 0, locked = false;

    function fmt(obj, map) {
      var s = t(obj);
      for (var k in map) if (map.hasOwnProperty(k)) s = s.split("{" + k + "}").join(map[k]);
      return s;
    }
    function showBest() {
      var b = ctx.getBest();
      bestEl.textContent = (b == null) ? "—" : String(b);
    }
    function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } }

    function showNoData() {
      qEl.textContent = "—";
      promptEl.textContent = t(T.noData);
      optionsEl.innerHTML = "";
      msgEl.textContent = "";
    }

    function renderQuestion() {
      clearTimer();
      locked = false;
      var q = questions[qIndex];
      qEl.textContent = (qIndex + 1) + " / " + questions.length;
      barEl.style.width = (qIndex / questions.length * 100) + "%";
      promptEl.textContent = t(q.prompt);
      msgEl.textContent = t(T.hint);
      optionsEl.innerHTML = "";
      q.options.forEach(function (opt, i) {
        var btn = document.createElement("button");
        btn.className = "quiz__opt";
        btn.type = "button";
        btn.setAttribute("data-i", String(i));
        var key = document.createElement("span");
        key.className = "quiz__opt-key"; key.setAttribute("aria-hidden", "true");
        key.textContent = String(i + 1);
        var txt = document.createElement("span");
        txt.className = "quiz__opt-text"; txt.textContent = t(opt.text);
        var mark = document.createElement("span");
        mark.className = "quiz__opt-mark material-symbols-rounded";
        mark.setAttribute("aria-hidden", "true");
        btn.appendChild(key); btn.appendChild(txt); btn.appendChild(mark);
        btn.addEventListener("click", function () { selectOption(i); });
        optionsEl.appendChild(btn);
      });
    }

    function selectOption(i) {
      if (locked) return;
      locked = true;
      var q = questions[qIndex];
      var chosen = q.options[i];
      var btns = optionsEl.querySelectorAll(".quiz__opt");
      var correctText = "";
      for (var k = 0; k < btns.length; k++) {
        var b = btns[k], o = q.options[k];
        b.disabled = true;
        var mk = b.querySelector(".quiz__opt-mark");
        if (o.correct) {
          correctText = t(o.text);
          b.classList.add("is-correct");
          if (mk) mk.textContent = "check";
        }
      }
      var pts = 0;
      if (chosen.correct) {
        streak += 1; correctCount += 1;
        pts = 100 + Math.min(streak - 1, 5) * 20;   /* small streak bonus, capped */
        score += pts;
        msgEl.textContent = t(T.right) + " +" + pts;
      } else {
        streak = 0;
        btns[i].classList.add("is-wrong");
        var wm = btns[i].querySelector(".quiz__opt-mark");
        if (wm) wm.textContent = "close";
        msgEl.textContent = t(T.wrong) + " " + t(T.answer) + correctText;
      }
      scoreEl.textContent = String(score);
      barEl.style.width = ((qIndex + 1) / questions.length * 100) + "%";
      timer = setTimeout(function () {
        qIndex += 1;
        if (qIndex >= questions.length) finish();
        else renderQuestion();
      }, REVEAL_MS);
    }

    function finish() {
      clearTimer();
      var best = ctx.setBest(score);
      showBest();
      var ov = document.createElement("div");
      ov.className = "game__overlay quiz__overlay";

      var cap = document.createElement("p");
      cap.className = "quiz__overlay-cap"; cap.textContent = t(T.finalCap);
      var h = document.createElement("h3"); h.textContent = String(score);
      var res = document.createElement("p");
      res.textContent = fmt(T.result, { c: correctCount, n: questions.length });
      var pb = document.createElement("p");
      pb.textContent = t(T.best) + " " + ((best == null) ? "—" : String(best));
      var btn = document.createElement("button");
      btn.className = "game__btn"; btn.type = "button";
      var bi = document.createElement("span");
      bi.className = "material-symbols-rounded"; bi.setAttribute("aria-hidden", "true");
      bi.textContent = "replay";
      var bt = document.createElement("span"); bt.textContent = t(T.again);
      btn.appendChild(bi); btn.appendChild(bt);
      btn.addEventListener("click", restart);

      ov.appendChild(cap); ov.appendChild(h); ov.appendChild(res);
      ov.appendChild(pb); ov.appendChild(btn);
      boardEl.appendChild(ov);
    }

    function restart() {
      clearTimer();
      var ov = boardEl.querySelector(".quiz__overlay");
      if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
      questions = buildRound(TOTAL);
      qIndex = 0; correctCount = 0; score = 0; streak = 0; locked = false;
      scoreEl.textContent = "0";
      if (!questions.length) { showNoData(); return; }
      renderQuestion();
    }

    /* keyboard: 1-9 selects the matching option while a question is live */
    keyHandler = function (e) {
      if (e.defaultPrevented || locked) return;
      var k = e.key;
      if (k >= "1" && k <= "9") {
        var idx = Number(k) - 1;
        var btns = optionsEl.querySelectorAll(".quiz__opt");
        if (idx < btns.length) { e.preventDefault(); selectOption(idx); }
      }
    };
    document.addEventListener("keydown", keyHandler);

    root.querySelector("[data-restart]").addEventListener("click", restart);

    showBest();
    questions = buildRound(TOTAL);
    if (!questions.length) { showNoData(); return; }
    renderQuestion();
  }

  /* -------------------------------------------------------------- styles */
  function injectStyles(ctx) {
    ctx.injectStyle(
      ".game--quiz .quiz__progress{height:6px;border-radius:var(--radius-pill);" +
        "background:var(--chip-bg);overflow:hidden;margin-bottom:clamp(14px,3.5vw,20px);}" +
      ".game--quiz .quiz__progress-bar{display:block;height:100%;width:0;border-radius:inherit;" +
        "background:linear-gradient(90deg,var(--accent),var(--accent-2));}" +
      ".game--quiz .quiz__prompt{margin:0 0 clamp(14px,3.5vw,20px);font-family:var(--font-display);" +
        "font-weight:700;font-size:clamp(1.1rem,3.6vw,1.4rem);line-height:1.4;color:var(--text);" +
        "letter-spacing:-.01em;}" +
      ".game--quiz .quiz__options{display:flex;flex-direction:column;gap:10px;}" +
      ".game--quiz .quiz__opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;" +
        "padding:14px 16px;min-height:56px;border-radius:var(--radius);background:var(--surface-2);" +
        "border:1px solid var(--hairline);color:var(--text);font:inherit;font-size:1rem;line-height:1.4;" +
        "cursor:pointer;box-shadow:inset 0 1px 0 var(--inner-hi);}" +
      ".game--quiz .quiz__opt-key{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;" +
        "width:26px;height:26px;border-radius:8px;font-family:var(--font-display);font-weight:700;" +
        "font-size:.85rem;color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent-line);}" +
      ".game--quiz .quiz__opt-text{flex:1 1 auto;min-width:0;overflow-wrap:anywhere;}" +
      ".game--quiz .quiz__opt-mark{flex:0 0 auto;width:22px;font-size:22px;}" +
      ".game--quiz .quiz__opt:disabled{cursor:default;}" +
      ".game--quiz .quiz__opt.is-correct{background:color-mix(in srgb,var(--accent-2) 18%,var(--surface-solid));" +
        "border-color:color-mix(in srgb,var(--accent-2) 60%,var(--hairline));color:var(--text);}" +
      ".game--quiz .quiz__opt.is-correct .quiz__opt-mark{color:var(--accent-2);}" +
      ".game--quiz .quiz__opt.is-correct .quiz__opt-key{color:var(--on-accent);background:var(--accent-2);" +
        "border-color:transparent;}" +
      ".game--quiz .quiz__opt.is-wrong{background:color-mix(in srgb,var(--text-mute) 14%,var(--surface-solid));" +
        "border-color:color-mix(in srgb,var(--text-mute) 30%,var(--hairline));color:var(--text-mute);}" +
      ".game--quiz .quiz__opt.is-wrong .quiz__opt-mark{color:var(--text-mute);}" +
      ".game--quiz .quiz__opt.is-wrong .quiz__opt-text{text-decoration:line-through;}" +
      ".game--quiz .quiz__opt:not(:disabled):hover,.game--quiz .quiz__opt:not(:disabled):focus-visible{" +
        "border-color:var(--accent-line);background:var(--accent-soft);}" +
      ".game--quiz .quiz__overlay-cap{margin:0;font-size:.7rem;font-weight:700;letter-spacing:.12em;" +
        "text-transform:uppercase;color:var(--text-mute);}" +
      ".game--quiz .quiz__overlay h3{font-family:var(--font-display);font-variant-numeric:tabular-nums;" +
        "background:linear-gradient(120deg,var(--accent),var(--accent-2));-webkit-background-clip:text;" +
        "background-clip:text;color:transparent;}" +
      "@media (prefers-reduced-motion:no-preference){" +
        ".game--quiz .quiz__progress-bar{transition:width .45s var(--ease-out);}" +
        ".game--quiz .quiz__opt{transition:border-color .18s var(--ease),background .18s var(--ease)," +
          "transform .18s var(--ease);}" +
        ".game--quiz .quiz__opt:not(:disabled):hover,.game--quiz .quiz__opt:not(:disabled):focus-visible{" +
          "transform:translateY(-1px);}" +
      "}"
    );
  }

  /* ------------------------------------------------------------ register */
  SEMICON_ARCADE.register({
    id: "quiz",
    icon: "quiz",
    title: { en: "Forum Quiz", zh: "論壇快問快答" },
    desc:  { en: "Trivia auto-built from the show's own forums, zones and stats.",
             zh: "用展會自己的論壇、特區與數據自動出題。" },
    scoreLabel: { en: "Best", zh: "最佳" },
    lowerIsBetter: false,
    mount: mount,
    unmount: unmount
  });
})();
