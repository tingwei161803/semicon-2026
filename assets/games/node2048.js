/* =========================================================================
   multipage · games/node2048.js  —  節點合成 2048 / Node Shrink 2048

   A 2048 clone on a 4x4 grid where tiles are PROCESS NODES that shrink as
   they merge: 28nm → 14nm → 10nm → 7nm → 5nm → 3nm → 2nm → 1.4nm → 1nm.
   Two equal nodes slid together fuse into the next-smaller node. Reaching
   2nm is the win milestone (you may keep playing). Arrow keys / WASD and
   touch swipe both work. Self-registers into window.SEMICON_ARCADE.

   Contract: see docs/superpowers/specs/2026-06-09-mini-games-arcade-design.md
   ========================================================================= */
(function () {
  "use strict";
  if (!window.SEMICON_ARCADE) return;

  /* ---- node tiers (1-based "value" v → TIERS[v-1]); 0 means empty cell ---- */
  var TIERS = ["28nm", "14nm", "10nm", "7nm", "5nm", "3nm", "2nm", "1.4nm", "1nm"];
  var WIN_VALUE = 7; /* "2nm" — first reach triggers the celebration */
  var SIZE = 4;
  var SWIPE_MIN = 24; /* px before a touch counts as a swipe */

  /* listeners that live OUTSIDE root (or that we want torn down explicitly).
     Held at module scope so unmount() can always reach them. Only one game is
     ever mounted at a time, so a single instance is sufficient. */
  var keyHandler = null;
  var boardEl = null;
  var touchHandlers = null;

  /* ----------------------------- styles ------------------------------ */
  function tierRamp() {
    /* Derive a per-tier colour ramp purely from accent CSS vars via
       color-mix, so it adapts to light/dark. NO hardcoded hex anywhere. */
    var css = "";
    for (var v = 1; v <= TIERS.length; v++) {
      var pct = Math.min(20 + (v - 1) * 9, 94);          /* fill strength 20→94 */
      var hue = 100 - Math.round((v - 1) / (TIERS.length - 1) * 55); /* shift accent→accent-3 */
      var ink = pct >= 52 ? "var(--on-accent)" : "var(--text)";
      var base = "color-mix(in srgb, var(--accent) " + hue + "%, var(--accent-3))";
      css +=
        ".game--node2048 .n2048-tile.t" + v + "{" +
          "background:color-mix(in srgb, " + base + " " + pct + "%, var(--surface-solid));" +
          "color:" + ink + ";" +
          "border-color:color-mix(in srgb, var(--accent) " + Math.min(pct + 12, 100) + "%, transparent);" +
        "}";
    }
    return css;
  }

  function styles() {
    return (
      ".game--node2048 .game__board{container-type:inline-size;}" +
      ".game--node2048 .n2048-grid{" +
        "display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);" +
        "gap:clamp(6px,2.4cqw,12px);width:100%;aspect-ratio:1/1;touch-action:none;}" +
      ".game--node2048 .n2048-cell{" +
        "border-radius:var(--radius-sm);" +
        "background:color-mix(in srgb, var(--text) 6%, transparent);" +
        "border:1px solid var(--hairline);}" +
      ".game--node2048 .n2048-tile{" +
        "width:100%;height:100%;display:grid;place-items:center;border-radius:var(--radius-sm);" +
        "border:1px solid var(--hairline);font-family:var(--font-display);font-weight:700;" +
        "font-variant-numeric:tabular-nums;font-size:clamp(.72rem,7cqw,1.5rem);line-height:1;" +
        "box-shadow:var(--shadow),inset 0 1px 0 var(--inner-hi);}" +
      ".game--node2048 .n2048-tile.is-long{font-size:clamp(.6rem,5.2cqw,1.2rem);letter-spacing:-.02em;}" +
      ".game--node2048 .n2048-hint{display:flex;gap:7px;justify-content:center;align-items:center;flex-wrap:wrap;}" +
      ".game--node2048 .n2048-hint .material-symbols-rounded{font-size:18px;color:var(--accent);}" +
      ".game--node2048 .game__overlay .n2048-acts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}" +
      "@media (prefers-reduced-motion: no-preference){" +
        ".game--node2048 .n2048-tile.is-new{animation:n2048-pop .18s var(--ease-out) both;}" +
        ".game--node2048 .n2048-tile.is-merged{animation:n2048-merge .2s var(--ease-out) both;}}" +
      "@keyframes n2048-pop{from{transform:scale(.3);opacity:0;}to{transform:scale(1);opacity:1;}}" +
      "@keyframes n2048-merge{0%{transform:scale(1);}40%{transform:scale(1.18);}100%{transform:scale(1);}}" +
      tierRamp()
    );
  }

  /* --------------------------- grid helpers -------------------------- */
  function emptyGrid() {
    var g = [];
    for (var r = 0; r < SIZE; r++) {
      g.push([0, 0, 0, 0]);
    }
    return g;
  }

  /* coordinate lanes for a direction: each lane is ordered from the edge the
     tiles slide toward (front) to the far edge (back). */
  function lanesFor(dir) {
    var lanes = [];
    for (var k = 0; k < SIZE; k++) {
      var lane = [];
      for (var j = 0; j < SIZE; j++) {
        if (dir === "left") lane.push({ r: k, c: j });
        else if (dir === "right") lane.push({ r: k, c: SIZE - 1 - j });
        else if (dir === "up") lane.push({ r: j, c: k });
        else lane.push({ r: SIZE - 1 - j, c: k }); /* down */
      }
      lanes.push(lane);
    }
    return lanes;
  }

  /* slide one lane's values toward the front; each tile merges at most once. */
  function slideValues(vals) {
    var nz = vals.filter(function (v) { return v !== 0; });
    var out = [], merges = [], gained = 0, i = 0;
    while (i < nz.length) {
      if (i + 1 < nz.length && nz[i] === nz[i + 1]) {
        var m = nz[i] + 1;            /* fuse into the next (smaller) node */
        out.push(m);
        merges.push(out.length - 1);  /* output index that resulted from a merge */
        gained += Math.pow(2, m);     /* classic 2048-style doubling score */
        i += 2;
      } else {
        out.push(nz[i]);
        i += 1;
      }
    }
    while (out.length < SIZE) out.push(0);
    return { line: out, merges: merges, gained: gained };
  }

  /* pure move: returns a fresh grid plus what happened (never mutates input). */
  function applyMove(grid, dir) {
    var lanes = lanesFor(dir);
    var ng = emptyGrid();
    var moved = false, gained = 0, merged = [];
    lanes.forEach(function (lane) {
      var vals = lane.map(function (c) { return grid[c.r][c.c]; });
      var res = slideValues(vals);
      gained += res.gained;
      res.line.forEach(function (v, idx) {
        var c = lane[idx];
        ng[c.r][c.c] = v;
        if (grid[c.r][c.c] !== v) moved = true;
      });
      res.merges.forEach(function (idx) { merged.push(lane[idx]); });
    });
    return { grid: ng, moved: moved, gained: gained, merged: merged };
  }

  function spawnTile(grid) {
    var empties = [];
    for (var r = 0; r < SIZE; r++) {
      for (var c = 0; c < SIZE; c++) {
        if (grid[r][c] === 0) empties.push({ r: r, c: c });
      }
    }
    if (!empties.length) return null;
    var spot = empties[Math.floor(Math.random() * empties.length)];
    grid[spot.r][spot.c] = Math.random() < 0.9 ? 1 : 2; /* mostly 28nm, sometimes 14nm */
    return spot;
  }

  function canMove(grid) {
    for (var r = 0; r < SIZE; r++) {
      for (var c = 0; c < SIZE; c++) {
        if (grid[r][c] === 0) return true;
        if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
        if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
      }
    }
    return false;
  }

  function reachedWin(grid) {
    for (var r = 0; r < SIZE; r++) {
      for (var c = 0; c < SIZE; c++) {
        if (grid[r][c] >= WIN_VALUE) return true;
      }
    }
    return false;
  }

  function key(c) { return c.r + "," + c.c; }

  /* ------------------------------- mount ----------------------------- */
  function mount(root, ctx) {
    cleanup(); /* defensive: never double-bind global listeners */
    ctx.injectStyle(styles());

    var t = ctx.t, esc = ctx.esc;
    var animate = !ctx.reduceMotion;

    /* state */
    var grid = emptyGrid();
    var score = 0;
    var best = ctx.getBest() || 0;
    var won = false;
    var over = false;

    /* --- build static chrome --- */
    root.innerHTML =
      '<div class="game game--node2048">' +
        '<div class="game__head">' +
          '<div class="game__stats">' +
            '<div class="game__stat">' +
              '<span class="game__stat-label">' + esc(t({ en: "Score", zh: "分數" })) + "</span>" +
              '<span class="game__stat-val" id="n2048Score">0</span>' +
            "</div>" +
            '<div class="game__stat">' +
              '<span class="game__stat-label">' + esc(t({ en: "Best", zh: "最佳" })) + "</span>" +
              '<span class="game__stat-val" id="n2048Best">' + esc(String(best)) + "</span>" +
            "</div>" +
          "</div>" +
          '<button class="game__btn game__btn--ghost" id="n2048New" type="button">' +
            '<span class="material-symbols-rounded" aria-hidden="true">restart_alt</span>' +
            "<span>" + esc(t({ en: "New game", zh: "新遊戲" })) + "</span>" +
          "</button>" +
        "</div>" +
        '<div class="game__board">' +
          '<div class="n2048-grid" id="n2048Grid" role="grid" ' +
            'aria-label="' + esc(t({ en: "Node 2048 board", zh: "節點 2048 棋盤" })) + '"></div>' +
        "</div>" +
        '<p class="game__msg n2048-hint">' +
          '<span class="material-symbols-rounded" aria-hidden="true">swipe</span>' +
          "<span>" + esc(t({
            en: "Arrow keys / WASD or swipe to merge nodes. Goal: reach 2nm.",
            zh: "方向鍵 / WASD 或滑動來合成節點,目標:微縮到 2nm。"
          })) + "</span>" +
        "</p>" +
      "</div>";

    var gridEl = root.querySelector("#n2048Grid");
    var boardWrap = root.querySelector(".game__board");
    var scoreEl = root.querySelector("#n2048Score");
    var bestEl = root.querySelector("#n2048Best");

    /* --- rendering --- */
    function renderBoard(newSet, mergeSet) {
      var html = "";
      for (var r = 0; r < SIZE; r++) {
        for (var c = 0; c < SIZE; c++) {
          var v = grid[r][c];
          var inner = "";
          if (v > 0) {
            var label = TIERS[v - 1] || "?";
            var cls = "n2048-tile t" + v + (label.length >= 5 ? " is-long" : "");
            if (animate && newSet && newSet[key({ r: r, c: c })]) cls += " is-new";
            if (animate && mergeSet && mergeSet[key({ r: r, c: c })]) cls += " is-merged";
            inner = '<div class="' + cls + '" role="gridcell" aria-label="' + esc(label) + '">' + esc(label) + "</div>";
          }
          html += '<div class="n2048-cell">' + inner + "</div>";
        }
      }
      gridEl.innerHTML = html;
    }

    function updateStats() {
      scoreEl.textContent = String(score);
      bestEl.textContent = String(best);
    }

    function clearOverlay() {
      var ov = boardWrap.querySelector(".game__overlay");
      if (ov) ov.parentNode.removeChild(ov);
    }

    function showOverlay(opts) {
      clearOverlay();
      var ov = document.createElement("div");
      ov.className = "game__overlay";
      ov.setAttribute("role", "alertdialog");
      ov.setAttribute("aria-label", opts.title);
      var acts = '<button class="game__btn" type="button" data-act="restart">' +
        '<span class="material-symbols-rounded" aria-hidden="true">restart_alt</span>' +
        "<span>" + esc(t({ en: "New game", zh: "再玩一次" })) + "</span></button>";
      if (opts.continue) {
        acts = '<button class="game__btn game__btn--ghost" type="button" data-act="continue">' +
          '<span class="material-symbols-rounded" aria-hidden="true">play_arrow</span>' +
          "<span>" + esc(t({ en: "Keep going", zh: "繼續挑戰" })) + "</span></button>" + acts;
      }
      ov.innerHTML =
        "<h3>" + esc(opts.title) + "</h3>" +
        "<p>" + esc(opts.body) + "</p>" +
        '<div class="n2048-acts">' + acts + "</div>";
      boardWrap.appendChild(ov);
      var cont = ov.querySelector('[data-act="continue"]');
      var rest = ov.querySelector('[data-act="restart"]');
      if (cont) cont.addEventListener("click", clearOverlay);
      if (rest) rest.addEventListener("click", newGame);
    }

    /* --- game flow --- */
    function newGame() {
      grid = emptyGrid();
      score = 0;
      won = false;
      over = false;
      var a = spawnTile(grid);
      var b = spawnTile(grid);
      var ns = {};
      if (a) ns[key(a)] = 1;
      if (b) ns[key(b)] = 1;
      clearOverlay();
      updateStats();
      renderBoard(ns, null);
    }

    function doMove(dir) {
      if (over) return;
      if (boardWrap.querySelector(".game__overlay")) return; /* paused on win prompt */
      var res = applyMove(grid, dir);
      if (!res.moved) return;
      grid = res.grid;
      score += res.gained;

      var mergeSet = {};
      res.merged.forEach(function (c) { mergeSet[key(c)] = 1; });

      var spot = spawnTile(grid);
      var newSet = {};
      if (spot) newSet[key(spot)] = 1;

      best = ctx.setBest(score) || best; /* persist + reflect best live */
      updateStats();
      renderBoard(newSet, mergeSet);

      if (!won && reachedWin(grid)) {
        won = true;
        showOverlay({
          title: t({ en: "2nm reached!", zh: "達到 2nm!" }),
          body: t({
            en: "You shrank a node to 2nm. Keep going for an even smaller process.",
            zh: "你已微縮到 2nm!繼續挑戰更先進的製程。"
          }),
          continue: true
        });
        return;
      }

      if (!canMove(grid)) {
        over = true;
        ctx.setBest(score);
        showOverlay({
          title: t({ en: "Game over", zh: "遊戲結束" }),
          body: t({ en: "Score", zh: "分數" }) + " " + score +
            "  ·  " + t({ en: "Best", zh: "最佳" }) + " " + best
        });
      }
    }

    /* --- input: keyboard (global) --- */
    keyHandler = function (e) {
      var k = e.key;
      var dir = null;
      var isArrow = false;
      if (k === "ArrowLeft") { dir = "left"; isArrow = true; }
      else if (k === "ArrowRight") { dir = "right"; isArrow = true; }
      else if (k === "ArrowUp") { dir = "up"; isArrow = true; }
      else if (k === "ArrowDown") { dir = "down"; isArrow = true; }
      else if (k === "a" || k === "A") dir = "left";
      else if (k === "d" || k === "D") dir = "right";
      else if (k === "w" || k === "W") dir = "up";
      else if (k === "s" || k === "S") dir = "down";
      if (!dir) return;
      if (isArrow) e.preventDefault(); /* stop page scroll — arrows only, while mounted */
      doMove(dir);
    };
    window.addEventListener("keydown", keyHandler);

    /* --- input: touch swipe (on the board element) --- */
    boardEl = boardWrap;
    var start = null;
    touchHandlers = {
      start: function (e) {
        if (!e.touches || !e.touches.length) return;
        start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      },
      move: function (e) {
        if (start && e.cancelable) e.preventDefault(); /* keep gesture on the board */
      },
      end: function (e) {
        if (!start) return;
        var tt = e.changedTouches && e.changedTouches[0];
        if (!tt) { start = null; return; }
        var dx = tt.clientX - start.x, dy = tt.clientY - start.y;
        start = null;
        var ax = Math.abs(dx), ay = Math.abs(dy);
        if (Math.max(ax, ay) < SWIPE_MIN) return;
        doMove(ax > ay ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
      }
    };
    boardEl.addEventListener("touchstart", touchHandlers.start, { passive: true });
    boardEl.addEventListener("touchmove", touchHandlers.move, { passive: false });
    boardEl.addEventListener("touchend", touchHandlers.end);
    boardEl.addEventListener("touchcancel", touchHandlers.end);

    /* New game button + first deal */
    root.querySelector("#n2048New").addEventListener("click", newGame);
    newGame();
  }

  /* ------------------------------ unmount ---------------------------- */
  function cleanup() {
    if (keyHandler) {
      window.removeEventListener("keydown", keyHandler);
      keyHandler = null;
    }
    if (boardEl && touchHandlers) {
      boardEl.removeEventListener("touchstart", touchHandlers.start);
      boardEl.removeEventListener("touchmove", touchHandlers.move);
      boardEl.removeEventListener("touchend", touchHandlers.end);
      boardEl.removeEventListener("touchcancel", touchHandlers.end);
    }
    boardEl = null;
    touchHandlers = null;
  }

  /* ----------------------------- register ---------------------------- */
  SEMICON_ARCADE.register({
    id: "node2048",
    icon: "grid_4x4",
    title: { en: "Node Shrink 2048", zh: "節點合成 2048" },
    desc: {
      en: "Merge process nodes and shrink 28nm all the way to 2nm in this 2048 twist.",
      zh: "合成製程節點,把 28nm 一路微縮到 2nm 的 2048 玩法。"
    },
    scoreLabel: { en: "Best", zh: "最佳" },
    lowerIsBetter: false,
    mount: mount,
    unmount: cleanup
  });
})();
