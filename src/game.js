import Asteroid from './asteroid';
import MovingObject from './moving_object';
import {util} from './util';
import Ship from './ship.js';
import Bullet from './bullet';
const collisionSound1 = new Audio('dist/collision.wav');
const collisionSound2 = new Audio('dist/collision.wav');
const collisionSound3 = new Audio('dist/collision.wav');
const winningSound = new Audio('dist/winnerSound.wav');

export default class Game {
  constructor() {
    this.asteroids = [];
    this.ship = new Ship({game: this});
    this.bullets = [];
    this.addAsteroids();
    this.nextCollisionSound = 0;
    this.collisionSounds = [collisionSound1, collisionSound2, collisionSound3];
  }

  get settings() {
    return {
      DIM_X: 1000,
      DIM_Y: 600,
      NUM_ASTEROIDS: 10,
      BG_COLOR: "#000000"
    };
  }

  allObjects() {
    return [].concat(this.asteroids, this.ship, this.bullets);
  }

  add(obj) {
    if (obj instanceof Bullet) {
      this.bullets.push(obj);
      return;
    }
    else if (obj instanceof Asteroid) {
      this.asteroids.push(obj);
      return;
    }
    else {
      alert('error unknown obj added to game');
    }
  }

  addAsteroids() {
    const num = this.settings.NUM_ASTEROIDS;
    for(let i = 0; i < num; i += 1) {
      this.asteroids.push(new Asteroid ({game: this}) );
    }
  }

  draw(ctx) {
    // ctx.clearRect(0, 0, this.settings.DIM_X, this.settings.DIM_Y);
    // ctx.fillStyle = this.settings.BG_COLOR;
    // ctx.fillRect(0, 0, this.settings.DIM_X, this.settings.DIM_Y);
    ctx.drawImage(this.backgroundImg,0,0);

    this.allObjects().forEach( (obj) => {
      obj.draw(ctx);
    });
  }


  moveObjects(delta) {
    this.allObjects().forEach(obj => {
      obj.move(delta);
    });
  }

  wrap(pos) {
    let x = util.wrap(pos[0], this.settings.DIM_X);
    let y = util.wrap(pos[1], this.settings.DIM_Y);

    return [x, y];
  }

  randomPos() {
    let x = (this.settings.DIM_X * Math.random());
    let y = (this.settings.DIM_Y * Math.random());

    return [x, y];
  }

  checkCollisions() {
    for (let i = 0; i < this.allObjects().length; i += 1) {
      for (let j = 0; j < this.allObjects().length; j += 1) {
          const obj1 = this.allObjects()[i];
          const obj2 = this.allObjects()[j];

          if (i !== j && obj1.isCollidedWith(obj2)) {
            const collision = obj1.collideWith(obj2);
            if (collision) {
              this.collisionSounds[this.nextCollisionSound%3].play();
              this.nextCollisionSound += 1;
              return;
            }
        }
      }
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  remove(obj) {
    if (obj instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
      if (this.asteroids.length === 0) {
        winningSound.play();
      }
      return;
    }
    else if (obj instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
      return;
    }
  }

  isOutOfBounds(pos) {
    let xOut = pos[0] < 0 || pos[0] > this.settings.DIM_X;
    let yOut = pos[1] < 0 || pos[1] > this.settings.DIM_Y;

    return (xOut || yOut);
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
