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
  // if (a > b) [a, b] = [b, a]
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

export function random(min = 1, max) {
  if (typeof min === 'object') {
    const arr = Object.values(min)
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
  }

  if (max === undefined) [min, max] = [0, min]

  return Math.random() * (max - min) + min
}
