import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const game = new Game();
  canvas.width = game.settings.DIM_X;
  canvas.height = game.settings.DIM_Y;

  const ctx = canvas.getContext("2d");
  game.img = new Image();
  game.img.onload = function () {
    ctx.drawImage(game.img, game.ship.pos[0], game.ship.pos[1], 20, 20);
  };
  game.img.src = './dist/spaceship.png';
  new GameView(game, ctx).start();
});
