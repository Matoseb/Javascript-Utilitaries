export function DeferredPromise() {
  let res, rej
  const p = new Promise(function (resolve, reject) {
    res = resolve.bind(this)
    rej = reject.bind(this)
  })

  p._state = 'pending'

  p._resolve = function (a) {
    p._state = 'resolved'
    res(a)
  }

  p._reject = function (a) {
    p._state = 'rejected'
    rej(a)
  }

  return p
}

export async function delay(millis = 0) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, millis))
}
