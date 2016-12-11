import MovingObject from './moving_object';
import Bullet from './bullet';

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

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  fireBullet() {
    const bullet = new Bullet({vel: this.vel});

    this.game.add(bullet);
    return;
  }
}
