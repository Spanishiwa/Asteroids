import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const game = new Game();
  canvas.width = game.settings.DIM_X;
  canvas.height = game.settings.DIM_Y;

  const ctx = canvas.getContext("2d");
  game.shipImg = new Image();
  game.asteroidImg = new Image();
  game.bulletImg = new Image();
  game.backgroundImg = new Image();

  game.shipImg.src = './dist/spaceship.png';
  game.asteroidImg.src = './dist/asteroid.png';
  game.bulletImg.src = './dist/bullet.jpeg';
  game.backgroundImg.src = './dist/space.jpg';

  new GameView(game, ctx);
});
