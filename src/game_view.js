import {Game} from './game.js';

export default class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.game.step();
    this.game.draw(this.ctx);
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
