import {Game} from './game.js';
import {GameView} from './game_view.js';

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementsbyTagName("canvas")[0];
  canvas.width = Game.settings.DIM_X;
  canvas.height = Game.settings.DIM_Y;

  let ctx = canvas.getContext("2d");
  let game = new Game();
  new GameView(game, ctx).start();
});
