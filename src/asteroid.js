import { util, defaults } from './util.js';
import { MovingObject } from './moving_object.js';

export default class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos;
    options.color = util.defaults.color;
    options.radius = util.defaults.radius;
    options.vel = options.vel || util.randVec(util.defaults.speed);
    super(options);

  }
}
