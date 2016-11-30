import {Asteroid} from './asteroid.js';
import {MovingObject} from './moving_object.js';
import {util} from './util.js';

let settings = {
  DIM_X: 1000,
  DIM_Y: 600,
  NUM_ASTEROIDS: 10,
  BG_COLOR: "302e2e"
};

export default class Game {
  constructor() {
    this.asteroids = [];

    this.addAsteroids();
  }

  addAsteroids(NUM_ASTEROIDS) {
    for(let i = 0; i < NUM_ASTEROIDS; i += 1) {
      this.asteroids.push(new Asteroid ({game: this}) );
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, settings.DIM_X, settings.DIM_Y);
    ctx.fillStyle = settings.BG_COLOR;
    ctx.fillRect(0, 0, settings.DIM_X, settings.DIM_Y);

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
    let x = util.wrap(pos[0], settings.DIM_X);
    let y = util.wrap(pos[1], settings.DIM_Y);

    return [x, y];
  }

  randomPos() {
    let x = settings.DIM_X * Math.random();
    let y = settings.DIM_Y * Math.random();

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
}






// static run() {
//   console.log("Pretend I'm running the game now askdjfhaksldfh aklsjdfh!");
// }
