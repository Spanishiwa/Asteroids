import MovingObject from './moving_object';

export default class Bullet extends MovingObject {
  constructor(options) {
    options.radius = options.radius || 10;
    super(options);
    this.isWrappable = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.game.bulletImg, this.pos[0], this.pos[1], 25, 25
    );
  }
}
