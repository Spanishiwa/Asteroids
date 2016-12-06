import Asteroid from './asteroid.js';
import MovingObject from './moving_object.js';
import {util} from './util.js';

export default class Game {
  constructor() {
    this.asteroids = [];
    this.addAsteroids(this.settings.NUM_ASTEROIDS);
  }

  get settings() {
    return {
      DIM_X: 1000,
      DIM_Y: 600,
      NUM_ASTEROIDS: 10,
      BG_COLOR: "302e2e"
    };
  }

  addAsteroids(num) {
    for(let i = 0; i < num; i += 1) {
      this.asteroids.push(new Asteroid ({game: this}) );
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.settings.DIM_X, this.settings.DIM_Y);
    ctx.fillStyle = this.settings.BG_COLOR;
    ctx.fillRect(0, 0, this.settings.DIM_X, this.settings.DIM_Y);

    this.asteroids.forEach(asteroid => {
      asteroid.draw(ctx);
    });
  }

  moveObjects() {
    this.asteroids.forEach(asteroid => {
      asteroid.move();
    });
  }

  wrap(pos) {
    let x = util.wrap(pos[0], this.settings.DIM_X);
    let y = util.wrap(pos[1], this.settings.DIM_Y);

    return [x, y];
  }

  randomPos() {
    let x = this.settings.DIM_X * Math.random();
    let y = this.settings.DIM_Y * Math.random();

    return [x, y];
  }

  checkCollisions() {
    for (let i = 0; i < this.asteroids.length; i += 1) {
      for (let j = (i+1); j < this.asteroids.length; j += 1) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          alert("COLLISION");
        }
      }
    }
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  remove(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

  isOutOfBounds(pos) {
    let xIn = pos[0] < 0 || pos[0] > this.settings.DIM_X;
    let yIn = pos[1] < 0 || pos[1] > this.settings.DIM_Y;

    return (xIn && yIn);
  }

  wrap(pos) {
    let wrapX = util.wrap(pos[0], this.settings.DIM_X);
    let wrapY = util.wrap(pos[1], this.settings.DIM_Y);

    return [wrapX, wrapY];
  }
}






// static run() {
//   console.log("Pretend I'm running the game now askdjfhaksldfh aklsjdfh!");
// }
