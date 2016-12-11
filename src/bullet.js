import MovingObject from './moving_object';

export default class Bullet extends MovingObject {
  constructor(options) {
    options.radius = options.radius || 2;
    super(options);
    this.isWrappable = false;
  }
}
