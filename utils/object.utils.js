export function noop() {}

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

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime() //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
