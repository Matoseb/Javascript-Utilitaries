'use strict';

const UTILS = {
  isMobile: function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
  },

  fitImage: function (
    p5Image,
    x,
    y,
    w,
    h,
    fit = 'cover' /* "contain" | "fill" */,
    ay = 'center' /* "left" | "right" | 0-1 */,
    ax = 'center' /* "top" | "bottom" | 0-1 */
  ) {
    const alignments = {
      ['center']: 0.5,
      ['top']: 0,
      ['bottom']: 1,
      ['left']: 0,
      ['right']: 1,
    };

    let dx = x,
      dy = y,
      dw = w,
      dh = h;
    const iw = p5Image.width,
      ih = p5Image.height;
    let sx = 0,
      sy = 0,
      sw = iw,
      sh = ih;
    let ir = ih / iw,
      dr = dh / dw;

    ax = ax in alignments ? alignments[ax] : ax;
    ay = ay in alignments ? alignments[ay] : ay;

    switch (fit) {
      case 'contain':
        let b = 0;

        if (_curElement._imageMode === CORNERS) {
          w = abs(w - x);
          h = abs(h - y);
          dr = h / w;
          b = 1;
        }

        if (dr > ir) {
          let p = w * ir;
          let o = (h - p) * ay;
          dy = y + o;
          dh = p + dy * b;
        } else {
          let p = h / ir;
          let o = (w - p) * ax;
          dx = x + o;
          dw = p + dx * b;
        }

        break;
      case 'cover':
        if (dr > ir) {
          sw = ih / dr;
          sx = (iw - sw) * ax;
        } else {
          sh = iw * dr;
          sy = (ih - sh) * ay;
        }
        break;
      case 'fill':
      default:
    }

    return [p5Image, dx, dy, dw, dh, sx, sy, sw, sh];
  },

  noop: function () {},

  delay: async function (millis = 0) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, millis);
    });
  },

  Spring: class {
    constructor(options = {}) {
      const defaults = {
        position: 0,
        velocity: 0,
        drag: 0.75,
        strength: 0.1,
      };

      Object.assign(this, defaults, options);
    }

    follow(target) {
      let force = target - this.position;
      force *= this.strength;

      this.velocity *= this.drag;
      this.velocity += force;

      this.position += this.velocity;

      return this.position;
    }

    valueOf() {
      return this.position;
    }
  },

  //needs refactoring
  screenToWorld: function (x, y, opts = {}) {

    opts = {
      pixelDensity: window.devicePixelRatio,
      ctx: drawingContext,
      matrix: undefined,
      ...opts
    };

    const matrix = opts.matrix || opts.ctx.getTransform();
    const imatrix = matrix.invertSelf();

    x *= opts.pixelDensity;
    y *= opts.pixelDensity;

    return {
      x: x * imatrix.a + y * imatrix.c + imatrix.e,
      y: x * imatrix.b + y * imatrix.d + imatrix.f,
    };
  },

  DeferredPromise: function () {
    let res;
    let rej;
    let p = new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });

    p._state = 'pending';

    p._resolve = (a) => {
      p._state = 'resolved';
      res.call(a);
    };

    p._reject = (a) => {
      p._state = 'rejected';
      rej.call(a);
    };

    return p;
  },

  map: function (num, start1, stop1, start2, stop2) {
    return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  },

  lerp: function (start, stop, amt) {
    return amt * (stop - start) + start;
  },

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },

  trueModulo: function (num, mod) {
    return ((num % mod) + mod) % mod; //modulo operator, same as js remainder. but works with negative numbers.
  },

  quotient: function (n, m) {
    return ~~(n / m) * m;
  },

  dist: function (x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  },

  //needs to be refactored, or https://www.f-sp.com/entry/2017/04/07/002913
  smoothDamp: function (
    current,
    target,
    refVelocity,
    maxSpeed = 10,
    smoothTime = 0.2,
    deltaTime
  ) {
    let num = 2 / (smoothTime || 0.00001);
    let num2 = num * deltaTime;
    let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
    let num4 = current - target;
    let num5 = target;
    let num6 = maxSpeed * smoothTime;
    num4 = this.clamp(num4, -num6, num6);
    target = current - num4;
    let num7 = (refVelocity.value + num * num4) * deltaTime;
    refVelocity.value = (refVelocity.value - num * num7) * num3;
    let num8 = target + (num4 + num7) * num3;
    if (num5 - current > 0 === num8 > num5) {
      num8 = num5;
      refVelocity.value = (num8 - num5) / deltaTime;
    }
    return num8;
  },

  //shift ES6 MAP just like Array.shift()
  shiftMap: function (map) {
    let result = map.entries().next().value;
    if (result !== undefined) {
      map.delete(result[0]);
      return result[1];
    }
  },
  //rename a ES6 MAP key
  renameMap: function (map, oldKey, newKey) {
    map.set(newKey, map.get(oldKey));
    return map.delete(oldKey);
  },

  //push a number into an ordered array
  arraySortedPush: function (array, value) {
    let low = 0,
      high = array.length;

    while (low < high) {
      let mid = (low + high) >>> 1;
      if (array[mid] < value) low = mid + 1;
      else high = mid;
    }
    array.splice(low, 0, value);
    return array;
  },
};
