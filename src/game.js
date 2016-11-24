import { Asteroid } from './asteroid.js';
import { MovingObject } from './moving_object.js';

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

}






// static run() {
//   console.log("Pretend I'm running the game now askdjfhaksldfh aklsjdfh!");
// }
