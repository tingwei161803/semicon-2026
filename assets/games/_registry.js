/* =========================================================================
   multipage · games/_registry.js

   The MINI-GAME REGISTRY. Loaded on game.html BEFORE the individual game
   modules and BEFORE app.js. Each game file calls SEMICON_ARCADE.register({…})
   to self-register; app.js's "arcade" layout reads SEMICON_ARCADE.list() to
   build the launcher menu and SEMICON_ARCADE.get(id) to mount one game.

   This decoupling is what lets each game live in its own file and be developed
   in isolation — adding/removing a game is one <script> + one register() call,
   nothing else changes.

   A registered game object (see docs/superpowers/specs/…-arcade-design.md):
     { id, icon, title:{en,zh}, desc:{en,zh}, scoreLabel:{en,zh},
       lowerIsBetter?, mount(root, ctx), unmount() }
   ========================================================================= */
(function () {
  "use strict";

  var games = [];

  window.SEMICON_ARCADE = {
    /* register a game module; ignores missing id or duplicate registration */
    register: function (game) {
      if (!game || !game.id || typeof game.mount !== "function") return;
      for (var i = 0; i < games.length; i++) {
        if (games[i].id === game.id) return; /* first registration wins */
      }
      games.push(game);
    },
    /* a defensive copy, in registration (== load) order */
    list: function () { return games.slice(); },
    /* one game by id, or null */
    get: function (id) {
      for (var i = 0; i < games.length; i++) if (games[i].id === id) return games[i];
      return null;
    }
  };
})();
