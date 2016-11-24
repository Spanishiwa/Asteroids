let util = {
  dist: function(pos1, pos2) {
    let [x1, y1] = [pos1[0], pos1[1]];
    let [x2, y2] = [pos1[0], pos1[1]];

    return Math.sqrt((x2-x1)(x2-x1) + (y2-y1)(y2-y1));
  },

  norm: function(vec) {
    return util.dist([0,0], vec);
  }
};

export { util };
