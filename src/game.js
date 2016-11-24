import { Asteroid } from './asteroid.js';
import { MovingObject } from './moving_object.js';

let settings = {
  DIM_X: 5,
  DIM_Y: 5,
  NUM_ASTEROIDS: 10
};

export default class Game {
  constructor() {
    this.asteroids = [];
  }

  addAsteroids(NUM_ASTEROIDS) {
    for(let i = 0; i < NUM_ASTEROIDS; i += 1) {
      this.asteroids.push(new Asteroid);
    }
  }
}






// static run() {
//   console.log("Pretend I'm running the game now askdjfhaksldfh aklsjdfh!");
// }
