'use strict'
/**
 * Check if is is mobile or dekstop browser.
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}
/**
 * Fit Image for p5 image()
 */
// OTHER IMAGE MODES NOT WORKING
export function fitImage(
  p5Image,
  x,
  y,
  w,
  h,
  {
    fitMode = 'cover' /* "contain" | "fill" */,
    alignY = 'center' /* "left" | "right" | 0-1 */,
    alignX = 'center' /* "top" | "bottom" | 0-1 */,
    p5Canvas = window,
  } = {}
) {
  const alignments = {
    ['center']: 0.5,
    ['top']: 0,
    ['bottom']: 1,
    ['left']: 0,
    ['right']: 1,
  }

  let dx = x,
    dy = y,
    dw = w,
    dh = h
  const iw = p5Image.width,
    ih = p5Image.height
  let sx = 0,
    sy = 0,
    sw = iw,
    sh = ih
  let ir = ih / iw,
    dr = dh / dw

  alignX = alignX in alignments ? alignments[alignX] : alignX
  alignY = alignY in alignments ? alignments[alignY] : alignY

  // console.log(p5Canvas._renderer._imageMode === CORNERS)

  switch (fitMode) {
    case 'contain':
      let b = 0

      if (p5Canvas._renderer._imageMode === 'corners') {
        w = w - x
        h = h - y
        dr = Math.abs(h) / Math.abs(w)
        b = 1
      }

      if (dr > ir) {
        let p = w * ir
        let o = (h - p) * alignY
        dy = y + o
        dh = p + dy * b
      } else {
        let p = h / ir
        let o = (w - p) * alignX

        dx = x + o
        dw = p + dx * b
      }

      break
    case 'cover':
      if (p5Canvas._renderer._imageMode === 'corners') {
        w = w - x
        h = h - y
        dr = Math.abs(h) / Math.abs(w)
      }

      if (dr > ir) {
        sw = ih / dr
        sx = (iw - sw) * alignX
      } else {
        sh = iw * dr
        sy = (ih - sh) * alignY
      }
      break
    case 'fill':
    default:
  }

  return p5Canvas.image(p5Image, dx, dy, dw, dh, sx, sy, sw, sh)
}

export function noop() {}

export async function delay(millis = 0) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, millis))
}

/**
 * Fit Image for p5 image()
 */
export class Spring {
  constructor(options = {}) {
    const defaults = {
      position: 0,
      velocity: 0,
      drag: 0.75,
      strength: 0.1,
    }

    Object.assign(this, defaults, options)
  }

  follow(target) {
    let force = target - this.position
    force *= this.strength

    this.velocity *= this.drag
    this.velocity += force

    this.position += this.velocity

    return this.position
  }

  valueOf() {
    return this.position
  }
}

export function screenToWorld(x, y, opts = {}) {
  let { ctx, matrix, pixelDensity = globalThis.devicePixelRatio } = opts

  matrix = matrix || ctx.getTransform()
  const imatrix = matrix.invertSelf()

  x *= pixelDensity
  y *= pixelDensity

  return {
    x: x * imatrix.a + y * imatrix.c + imatrix.e,
    y: x * imatrix.b + y * imatrix.d + imatrix.f,
  }
}

export function p5screenToWorld(x, y, p5Canvas = globalThis) {
  const ctx = p5Canvas._renderer.drawingContext
  const pixelDensity = p5Canvas._renderer._pixelsState._pixelDensity
  return screenToWorld(x, y, { ctx, pixelDensity })
}

export function DeferredPromise() {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  p._state = 'pending'

  p._resolve = (a) => {
    p._state = 'resolved'
    res.call(a)
  }

  p._reject = (a) => {
    p._state = 'rejected'
    rej.call(a)
  }

  return p
}

export function map(num, start1, stop1, start2, stop2) {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

export function lerp(a, b, t) {
  return t * (b - a) + a
}
/**
 * Inverse lerp returns a fraction t, based on a value between a and b
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number} between 0 and 1
 */
export function invLerp(a, b, t) {
  return (t - a) / (b - a)
}
/**
 * Exponential Lerp, distance between 0.125 and 0.25 is now exactly the same as the distance between 4 and 8
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number}
 */
export function eerp(a, b, t) {
  return a * Math.pow(b / a, t)
} // @freyaholmer, @khyperia
/**
 * Lerp for Scale/Zooming {@link https://gamedev.stackexchange.com/questions/4093/zooming-and-panning-a-camera-simultaneously-causes-a-swooping-effect more}.
 * @param {number} a start
 * @param {number} b end
 * @param {number} t amount
 * @returns {number}
 */
export function lerpScale(a, b, t) {
  return 1 / (t * (1 / b - 1 / a) + 1 / a)
}
/**
 * Constrains a number to a range
 * @param {number} num start
 * @param {number} [a=0] min
 * @param {number} [b=1] max
 * @returns {number}
 */
export function clamp(num, a = 0, b = 1) {
  if (a > b) [a, b] = [b, a]
  return Math.min(Math.max(num, a), b)
}
/**
 * Javascript remainder, but works with negative numbers too.
 * @param {number} num
 * @param {number} mod
 * @returns {number}
 */
export function mod(num, mod) {
  return ((num % mod) + mod) % mod
}
/**
 * Get closest integer dividend
 * @param {number} num dividend
 * @param {number} mod divisor
 * @returns {number}
 */
export function quotient(num, m) {
  return ~~(num / m) * m
}
/**
 * Distance between two points
 * @param {number} x1 point1 x coordinate
 * @param {number} y1 point1 y coordinate
 * @param {number} x2 point2 x coordinate
 * @param {number} y2 point2 y coordinate
 * @returns {number}
 */
export function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

//needs to be refactored, or https://www.f-sp.com/entry/2017/04/07/002913
export function smoothDamp(
  current,
  target,
  refVelocity,
  maxSpeed = 10,
  smoothTime = 0.2,
  deltaTime
) {
  let num = 2 / (smoothTime || 0.00001)
  let num2 = num * deltaTime
  let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2)
  let num4 = current - target
  let num5 = target
  let num6 = maxSpeed * smoothTime
  num4 = Math.min(Math.max(num4, -num6), num6)
  target = current - num4
  let num7 = (refVelocity.value + num * num4) * deltaTime
  refVelocity.value = (refVelocity.value - num * num7) * num3
  let num8 = target + (num4 + num7) * num3
  if (num5 - current > 0 === num8 > num5) {
    num8 = num5
    refVelocity.value = (num8 - num5) / deltaTime
  }
  return num8
}

//
/**
 * Shift ES6 Maps like Array.shift()
 * @param {Map<String, Object>} map point1 x coordinate
 * @returns {number}
 */
export function shiftMap(map) {
  const result = map.entries().next().value
  if (result === undefined) return null
  map.delete(result[0])
  return result
}
//rename a ES6 MAP key
export function renameMap(map, oldKey, newKey) {
  map.set(newKey, map.get(oldKey)).delete(oldKey)
}

//push a number into an ordered array
export function pushToSortedArray(array, value) {
  let low = 0,
    high = array.length

  while (low < high) {
    let mid = (low + high) >>> 1
    if (array[mid] < value) low = mid + 1
    else high = mid
  }
  array.splice(low, 0, value)
  return array
}

export function range(start = 0, stop, step = 1) {
  if (stop === undefined) [start, stop] = [0, start]

  start -= step
  return {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: (start += step),
        done: start >= stop,
      }),
    }),
  }
}
