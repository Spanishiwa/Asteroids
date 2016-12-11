import Game from './game';

export default class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.ship;
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(KEYPRESS_COORDS).forEach( (dir) => {
      const impulse = KEYPRESS_COORDS.dir;

      key(k, () => {ship.power(impulse); });
    });
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

const KEYPRESS_COORDS = {
  up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0]
};
