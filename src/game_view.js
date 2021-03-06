import Game from './game';
const gameMusic = new Audio('dist/AceCombat6.mp3');

export default class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.gamePlaying = false;

    document.addEventListener("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    let inputDir = event.keyCode;

    switch (inputDir) {
      case (32):
        this.game.ship.fireBullet();
        break;
      case (37):
        this.game.ship.power(KEYPRESS_COORDS.left);
        break;
      case (38):
        this.game.ship.power(KEYPRESS_COORDS.down);
        break;
      case (39):
        this.game.ship.power(KEYPRESS_COORDS.right);
        break;
      case (40):
        this.game.ship.power(KEYPRESS_COORDS.up);
        break;
      case (13):
        if (!this.gamePlaying) {
          this.start();
          break;
        }
        else {
          location.reload();
          break;
        }
      case (49):
        gameMusic.pause();
        break;
      case (50):
        gameMusic.play();
        break;
      default:
        return;
    }
  }

  start() {
    gameMusic.play();
    this.gamePlaying = true;
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
