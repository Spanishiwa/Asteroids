import { util, defaults } from './util.js';
import { MovingObject } from './moving_object.js';

export default class Asteroid extends MovingObject {
  constructor(options) {
    this.color = util.defaults.color;
    this.radius = util.defaults.radius;
    this.vel = options.vel || util.randVec(util.defaults.speed);

    super(options);
  }
}
