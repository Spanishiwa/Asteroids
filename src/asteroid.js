import {MovingObject} from './moving_object.js';
import {util, defaults} from './util.js';


class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPos();
    options.color = util.defaults.color;
    options.radius = util.defaults.radius;
    options.vel = options.vel || util.randVec(util.defaults.speed);
    super(options);

  }

}

export { Asteroid };
