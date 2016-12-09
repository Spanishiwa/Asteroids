import MovingObject from './moving_object';

export default class Ship {
  constructor(options) {
    options.radius = 15;
    options.vel = options.vel || [0,0];
    options.color = "#800000";
    options.pos = options.pos || options.game.randomPos();
  }
}
