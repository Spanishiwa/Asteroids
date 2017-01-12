/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _game_view = __webpack_require__(7);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  var game = new _game2.default();
	  canvas.width = game.settings.DIM_X;
	  canvas.height = game.settings.DIM_Y;
	
	  var ctx = canvas.getContext("2d");
	  game.shipImg = new Image();
	  game.asteroidImg = new Image();
	  game.bulletImg = new Image();
	  game.backgroundImg = new Image();
	
	  game.shipImg.src = './dist/spaceship.png';
	  game.asteroidImg.src = './dist/asteroid.png';
	  game.bulletImg.src = './dist/bullet.jpeg';
	  game.backgroundImg.src = './dist/space.jpg';
	
	  new _game_view2.default(game, ctx).start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _asteroid = __webpack_require__(2);
	
	var _asteroid2 = _interopRequireDefault(_asteroid);
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(4);
	
	var _ship = __webpack_require__(5);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	var _bullet = __webpack_require__(6);
	
	var _bullet2 = _interopRequireDefault(_bullet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var collisionSound1 = new Audio('dist/collision.wav');
	var collisionSound2 = new Audio('dist/collision.wav');
	var collisionSound3 = new Audio('dist/collision.wav');
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.asteroids = [];
	    this.ship = new _ship2.default({ game: this });
	    this.bullets = [];
	    this.addAsteroids();
	    this.nextCollisionSound = 0;
	    this.collisionSounds = [collisionSound1, collisionSound2, collisionSound3];
	  }
	
	  _createClass(Game, [{
	    key: 'allObjects',
	    value: function allObjects() {
	      return [].concat(this.asteroids, this.ship, this.bullets);
	    }
	  }, {
	    key: 'add',
	    value: function add(obj) {
	      if (obj instanceof _bullet2.default) {
	        this.bullets.push(obj);
	        return;
	      } else if (obj instanceof _asteroid2.default) {
	        this.asteroids.push(obj);
	        return;
	      } else {
	        alert('error unknown obj added to game');
	      }
	    }
	  }, {
	    key: 'addAsteroids',
	    value: function addAsteroids() {
	      var num = this.settings.NUM_ASTEROIDS;
	      for (var i = 0; i < num; i += 1) {
	        this.asteroids.push(new _asteroid2.default({ game: this }));
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      // ctx.clearRect(0, 0, this.settings.DIM_X, this.settings.DIM_Y);
	      // ctx.fillStyle = this.settings.BG_COLOR;
	      // ctx.fillRect(0, 0, this.settings.DIM_X, this.settings.DIM_Y);
	      ctx.drawImage(this.backgroundImg, 0, 0);
	
	      this.allObjects().forEach(function (obj) {
	        obj.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects(delta) {
	      this.allObjects().forEach(function (obj) {
	        obj.move(delta);
	      });
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos) {
	      var x = _util.util.wrap(pos[0], this.settings.DIM_X);
	      var y = _util.util.wrap(pos[1], this.settings.DIM_Y);
	
	      return [x, y];
	    }
	  }, {
	    key: 'randomPos',
	    value: function randomPos() {
	      var x = this.settings.DIM_X * Math.random();
	      var y = this.settings.DIM_Y * Math.random();
	
	      return [x, y];
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.allObjects().length; i += 1) {
	        for (var j = 0; j < this.allObjects().length; j += 1) {
	          var obj1 = this.allObjects()[i];
	          var obj2 = this.allObjects()[j];
	
	          if (i !== j && obj1.isCollidedWith(obj2)) {
	            var collision = obj1.collideWith(obj2);
	            if (collision) {
	              this.collisionSounds[this.nextCollisionSound % 3].play();
	              this.nextCollisionSound += 1;
	              return;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step(delta) {
	      this.moveObjects(delta);
	      this.checkCollisions();
	    }
	  }, {
	    key: 'remove',
	    value: function remove(obj) {
	      if (obj instanceof _asteroid2.default) {
	        this.asteroids.splice(this.asteroids.indexOf(obj), 1);
	        return;
	      } else if (obj instanceof _bullet2.default) {
	        this.bullets.splice(this.bullets.indexOf(obj), 1);
	        return;
	      }
	    }
	  }, {
	    key: 'isOutOfBounds',
	    value: function isOutOfBounds(pos) {
	      var xOut = pos[0] < 0 || pos[0] > this.settings.DIM_X;
	      var yOut = pos[1] < 0 || pos[1] > this.settings.DIM_Y;
	
	      return xOut || yOut;
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos) {
	      var wrapX = _util.util.wrap(pos[0], this.settings.DIM_X);
	      var wrapY = _util.util.wrap(pos[1], this.settings.DIM_Y);
	
	      return [wrapX, wrapY];
	    }
	  }, {
	    key: 'settings',
	    get: function get() {
	      return {
	        DIM_X: 1000,
	        DIM_Y: 600,
	        NUM_ASTEROIDS: 10,
	        BG_COLOR: "#000000"
	      };
	    }
	  }]);
	
	  return Game;
	}();
	
	// static run() {
	//   console.log("Pretend I'm running the game now askdjfhaksldfh aklsjdfh!");
	// }
	
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(4);
	
	var _ship = __webpack_require__(5);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Asteroid = function (_MovingObject) {
	  _inherits(Asteroid, _MovingObject);
	
	  function Asteroid() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Asteroid);
	
	    options.color = _util.defaults.color;
	    options.pos = options.pos || options.game.randomPos();
	    options.radius = _util.defaults.radius;
	    options.vel = options.vel || _util.util.randVec(_util.defaults.speed);
	    return _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, options));
	  }
	
	  _createClass(Asteroid, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.game.asteroidImg, this.pos[0], this.pos[1], 55, 40);
	    }
	  }, {
	    key: 'collideWith',
	    value: function collideWith(otherObject) {
	      if (otherObject instanceof _ship2.default) {
	        otherObject.relocate();
	        return true;
	      } else if (otherObject instanceof Asteroid) {
	        return;
	      } else {
	        this.remove();
	        otherObject.remove();
	        return true;
	      }
	    }
	  }]);
	
	  return Asteroid;
	}(_moving_object2.default);
	
	exports.default = Asteroid;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	    this.isWrappable = true;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'collideWith',
	    value: function collideWith(otherObject) {}
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }, {
	    key: 'move',
	    value: function move(timeDelta) {
	      var velocityScale = timeDelta % 10 / 12,
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
	  }, {
	    key: 'isCollidedWith',
	    value: function isCollidedWith(otherMovingObject) {
	      var centerDist = _util.util.dist(this.pos, otherMovingObject.pos);
	      var radiusDist = this.radius + otherMovingObject.radius;
	
	      return radiusDist > centerDist;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(obj) {
	      this.game.remove(this);
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var util = {
	  dir: function dir(vec) {
	    var norm = util.norm(vec);
	    return util.scale(vec, 1 / norm);
	  },
	  dist: function dist(pos1, pos2) {
	    var _ref = [pos1[0], pos1[1]],
	        x1 = _ref[0],
	        y1 = _ref[1];
	    var _ref2 = [pos2[0], pos2[1]],
	        x2 = _ref2[0],
	        y2 = _ref2[1];
	
	
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  },
	  norm: function norm(vec) {
	    return util.dist([0, 0], vec);
	  },
	  randVec: function randVec(length) {
	    var deg = 2 * Math.PI * Math.random();
	    return util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  scale: function scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	  wrap: function wrap(coord, max) {
	    if (coord < 0) {
	      return max - coord % max;
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  }
	};
	
	var defaults = {
	  color: "#505050",
	  radius: 25,
	  speed: 4
	};
	
	exports.util = util;
	exports.defaults = defaults;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _bullet = __webpack_require__(6);
	
	var _bullet2 = _interopRequireDefault(_bullet);
	
	var _util = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var thrustSound1 = new Audio('dist/thrust.wav');
	var fireSound1 = new Audio('dist/fire.wav');
	var fireSound2 = new Audio('dist/fire.wav');
	var fireSound3 = new Audio('dist/fire.wav');
	var fireSound4 = new Audio('dist/fire.wav');
	var fireSound5 = new Audio('dist/fire.wav');
	var fireSound6 = new Audio('dist/fire.wav');
	
	var Ship = function (_MovingObject) {
	  _inherits(Ship, _MovingObject);
	
	  function Ship(options) {
	    _classCallCheck(this, Ship);
	
	    options.radius = 15;
	    options.vel = options.vel || [0, 0];
	    options.color = "#800000";
	    options.pos = options.pos || options.game.randomPos();
	
	    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, options));
	
	    _this.nextSound = 0;
	    _this.fireSounds = [fireSound1, fireSound2, fireSound3, fireSound4, fireSound5, fireSound6];
	    return _this;
	  }
	
	  _createClass(Ship, [{
	    key: 'relocate',
	    value: function relocate() {
	      this.pos = this.game.randomPos();
	      this.vel = [0, 0];
	    }
	  }, {
	    key: 'power',
	    value: function power(impulse) {
	      this.vel[0] += impulse[0];
	      this.vel[1] += impulse[1];
	      thrustSound1.play();
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.game.shipImg, this.game.ship.pos[0], this.game.ship.pos[1], 35, 35);
	    }
	  }, {
	    key: 'fireBullet',
	    value: function fireBullet() {
	      var norm = _util.util.norm(this.vel);
	      var relVel = _util.util.scale(_util.util.dir(this.vel), 15);
	      var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];
	
	      var bullet = new _bullet2.default({
	        pos: this.pos,
	        vel: bulletVel,
	        color: this.color,
	        game: this.game
	      });
	
	      this.fireSounds[this.nextSound % 6].play();
	      this.nextSound += 1;
	      this.game.add(bullet);
	      return;
	    }
	  }]);
	
	  return Ship;
	}(_moving_object2.default);
	
	exports.default = Ship;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bullet = function (_MovingObject) {
	  _inherits(Bullet, _MovingObject);
	
	  function Bullet(options) {
	    _classCallCheck(this, Bullet);
	
	    options.radius = options.radius || 5;
	
	    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, options));
	
	    _this.isWrappable = false;
	    return _this;
	  }
	
	  _createClass(Bullet, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.game.bulletImg, this.pos[0], this.pos[1], 15, 15);
	    }
	  }]);
	
	  return Bullet;
	}(_moving_object2.default);
	
	exports.default = Bullet;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(game, ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.game = game;
	
	    document.addEventListener("keydown", this.handleKeyEvent.bind(this));
	  }
	
	  _createClass(GameView, [{
	    key: "handleKeyEvent",
	    value: function handleKeyEvent(event) {
	      var inputDir = event.keyCode;
	
	      switch (inputDir) {
	        case 32:
	          this.game.ship.fireBullet();
	          break;
	        case 37:
	          this.game.ship.power(KEYPRESS_COORDS.left);
	          break;
	        case 38:
	          this.game.ship.power(KEYPRESS_COORDS.down);
	          break;
	        case 39:
	          this.game.ship.power(KEYPRESS_COORDS.right);
	          break;
	        case 40:
	          this.game.ship.power(KEYPRESS_COORDS.up);
	          break;
	        default:
	          return;
	      }
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.lastTime = 0;
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }, {
	    key: "animate",
	    value: function animate(time) {
	      var timeDelta = time - this.lastTime;
	
	      this.game.step(timeDelta);
	      this.game.draw(this.ctx);
	      this.lastTime = time;
	
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;
	
	
	var KEYPRESS_COORDS = {
	  up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0]
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map