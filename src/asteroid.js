import MovingObject from './moving_object.js';
import {util, defaults} from './util.js';


export default class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPos();
    options.color = defaults.color;
    options.radius = defaults.radius;
    options.vel = options.vel || util.randVec(defaults.speed);
    super(options);

  }

}
