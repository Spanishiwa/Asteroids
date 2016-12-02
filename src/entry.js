import Game from './game.js';
import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementsByTagName("canvas")[0];
  let game = new Game();
  canvas.width = game.settings.DIM_X;
  canvas.height = game.settings.DIM_Y;

  let ctx = canvas.getContext("2d");
  new GameView(game, ctx).start();
});
