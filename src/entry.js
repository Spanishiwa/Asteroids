import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const game = new Game();
  canvas.width = game.settings.DIM_X;
  canvas.height = game.settings.DIM_Y;

  const ctx = canvas.getContext("2d");
  new GameView(game, ctx).start();
});
