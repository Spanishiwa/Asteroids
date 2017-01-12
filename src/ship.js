import MovingObject from './moving_object';
import Bullet from './bullet';
import {util} from './util';
const thrustSound1 = new Audio('dist/thrust.wav');
const fireSound1 = new Audio('dist/fire.wav');
const fireSound2 = new Audio('dist/fire.wav');
const fireSound3 = new Audio('dist/fire.wav');
const fireSound4 = new Audio('dist/fire.wav');
const fireSound5 = new Audio('dist/fire.wav');
const fireSound6 = new Audio('dist/fire.wav');

export default class Ship extends MovingObject{
  constructor(options) {
    options.radius = 15;
    options.vel = options.vel || [0,0];
    options.color = "#800000";
    options.pos = options.pos || options.game.randomPos();
    super(options);
    this.nextSound = 0;
    this.fireSounds = [fireSound1, fireSound2, fireSound3, fireSound4, fireSound5, fireSound6];
  }

  relocate() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    thrustSound1.play();
  }

  draw(ctx) {
    ctx.drawImage(
      this.game.shipImg, this.game.ship.pos[0],
      this.game.ship.pos[1], 35, 35
    );
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

    this.fireSounds[this.nextSound%6].play();
    this.nextSound += 1;
    this.game.add(bullet);
    return;
  }
}
