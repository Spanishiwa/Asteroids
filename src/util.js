let util = {
  dist(pos1, pos2) {
    let [x1, y1] = [pos1[0], pos1[1]];
    let [x2, y2] = [pos1[0], pos1[1]];

    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  },

  norm(vec) {
    return util.dist([0,0], vec);
  },

  randVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return (coord % max);
    } else {
      return coord;
    }
  }
};

let defaults = {
  color: "#505050",
  radius: 25,
  speed: 4
};

export {util, defaults};
