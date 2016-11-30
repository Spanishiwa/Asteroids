import {Game} from './game.js';

export default class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    setInterval( function() {
      Game.step();
      Game.draw(GameView.ctx);
    }, 20);
  }
}
