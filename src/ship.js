import MovingObject from './moving_object';
import Bullet from './bullet';
import {util} from './util';

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
    const norm = util.norm(this.vel);
    const relVel = util.scale(util.dir(this.vel), 15);
    const bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    const bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
    return;
  }
}
