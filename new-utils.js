'use strict';
/**
 * Check if is is mobile or dekstop browser.
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
}
/**
 * Fit Image for p5 image()
 */
function fitImage(
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
        w = Math.abs(w - x);
        h = Math.abs(h - y);
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
}

function noop() {}

async function delay(millis = 0) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, millis));
}

/**
 * Fit Image for p5 image()
 */
class Spring {
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
}

//   //needs refactoring
function screenToWorld(x, y, opts = {}) {
  opts = {
    pixelDensity: window.devicePixelRatio,
    ctx: drawingContext,
    matrix: undefined,
    ...opts,
  };

  const matrix = opts.matrix || opts.ctx.getTransform();
  const imatrix = matrix.invertSelf();

  x *= opts.pixelDensity;
  y *= opts.pixelDensity;

  return {
    x: x * imatrix.a + y * imatrix.c + imatrix.e,
    y: x * imatrix.b + y * imatrix.d + imatrix.f,
  };
}

function DeferredPromise() {
  let res;
  let rej;
  const p = new Promise((resolve, reject) => {
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
}

function map(num, start1, stop1, start2, stop2) {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function lerp(a, b, t) {
  return t * (b - a) + a;
}
/**
 * Inverse lerp returns a fraction t, based on a value between a and b
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number} between 0 and 1
 */
function invLerp(a, b, t) {
  return (t - a) / (b - a);
}
/**
 * Exponential Lerp, distance between 0.125 and 0.25 is now exactly the same as the distance between 4 and 8
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number}
 */
function eerp(a, b, t) {
  return a * Math.pow(b / a, t);
} // @freyaholmer, @khyperia
/**
 * Lerp for Scale/Zooming {@link https://gamedev.stackexchange.com/questions/4093/zooming-and-panning-a-camera-simultaneously-causes-a-swooping-effect more}.
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number}
 */
function lerpScale(a, b, t) {
  return 1 / (t * (1 / b - 1 / a) + 1 / a);
}
/**
 * Constrains a number to a range
 * @param {number} num start
 * @param {number} [a=0] min
 * @param {number} [b=1] max
 * @returns {number}
 */
function clamp(num, a = 0, b = 1) {
  if (a > b) [a, b] = [b, a];
  return Math.min(Math.max(num, a), b);
}
/**
 * Javascript remainder, but works with negative numbers too.
 * @param {number} num
 * @param {number} mod
 * @returns {number}
 */
function mod(num, mod) {
  return ((num % mod) + mod) % mod;
}
/**
 * Get closest integer dividend
 * @param {number} num dividend
 * @param {number} mod divisor
 * @returns {number}
 */
function quotient(num, m) {
  return ~~(num / m) * m;
}
/**
 * Distance between two points
 * @param {number} x1 point1 x coordinate
 * @param {number} y1 point1 y coordinate
 * @param {number} x2 point2 x coordinate
 * @param {number} y2 point2 y coordinate
 * @returns {number}
 */
function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

//needs to be refactored, or https://www.f-sp.com/entry/2017/04/07/002913
function smoothDamp(
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
  num4 = Math.min(Math.max(num4, -num6), num6);
  target = current - num4;
  let num7 = (refVelocity.value + num * num4) * deltaTime;
  refVelocity.value = (refVelocity.value - num * num7) * num3;
  let num8 = target + (num4 + num7) * num3;
  if (num5 - current > 0 === num8 > num5) {
    num8 = num5;
    refVelocity.value = (num8 - num5) / deltaTime;
  }
  return num8;
}

//shift ES6 MAP just like Array.shift()
function shiftMap(map) {
  const result = map.entries().next().value;
  if (result !== undefined) {
    map.delete(result[0]);
    return result[1];
  }
}
//rename a ES6 MAP key
function renameMap(map, oldKey, newKey) {
  map.set(newKey, map.get(oldKey)).delete(oldKey);
}

//push a number into an ordered array
function pushToSortedArray(array, value) {
  let low = 0,
    high = array.length;

  while (low < high) {
    let mid = (low + high) >>> 1;
    if (array[mid] < value) low = mid + 1;
    else high = mid;
  }
  array.splice(low, 0, value);
  return array;
}

const UTILS = {
  isMobile,
  fitImage,
  noop,
  delay,
  Spring,
  screenToWorld,
  DeferredPromise,
  map,
  lerp,
  invLerp,
  eerp,
  lerpScale,
  clamp,
  mod,
  quotient,
  dist,
  smoothDamp,
  shiftMap,
  renameMap,
  pushToSortedArray,
};

globalThis.UTILS = UTILS;

export default UTILS;
