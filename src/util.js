let util = {
  dir(vec) {
    const norm = util.norm(vec);
    return util.scale(vec, 1 / norm);
  },

  dist(pos1, pos2) {
    const [x1, y1] = [pos1[0], pos1[1]];
    const [x2, y2] = [pos2[0], pos2[1]];

    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
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
