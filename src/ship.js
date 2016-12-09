import MovingObject from './moving_object';

export default class Ship extends MovingObject{
  constructor(options) {
    options.radius = 15;
    options.vel = options.vel || [0,0];
    options.color = "#800000";
    options.pos = options.pos || options.game.randomPos();
    super(options);
  }

  relocate() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  }
}
