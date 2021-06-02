'use strict'
/**
 * Check if is is mobile or dekstop browser.
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}

export function noop() {}

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
export function optiPushToSortedArray(array, value) {
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

export function pushToSortedArray(array, value, compareFn) {
  array.push(value)
  return array.sort(compareFn)
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

export function getRange(start, stop, step) {
  return [...range(start, stop, step)]
}
export function reverse(arr) {
  return {
    [Symbol.iterator]() {
      let i = arr.length
      return {
        next: () => ({
          value: arr[--i],
          done: i < 0,
        }),
      }
    },
  }
}
