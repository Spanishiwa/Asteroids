import {util} from './util';
import Game from './game';

export default class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }

  collideWith(otherObject) {

  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta % 10 / 12,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove(this);
      }
    }
  }

  isCollidedWith(otherMovingObject) {
    let centerDist = util.dist(this.pos, otherMovingObject.pos);
    let radiusDist = this.radius + otherMovingObject.radius;

    return radiusDist < centerDist;
  }

  remove(asteroid) {
    this.game.remove(asteroid);
  }
}
