import MovingObject from './moving_object';
import {util, defaults} from './util';
import Ship from './ship';

export default class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = defaults.color;
    options.pos = options.pos || options.game.randomPos();
    options.radius = defaults.radius;
    options.vel = options.vel || util.randVec(defaults.speed);
    super(options);

  }

  draw(ctx) {
    ctx.drawImage(
      this.game.asteroidImg, this.pos[0], this.pos[1], 55, 40
    );
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    }
    else if (otherObject instanceof Asteroid) {
      return;
    }
    else {
      this.remove();
      otherObject.remove();
      return true;
    }
  }
}
