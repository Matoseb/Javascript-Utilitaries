export function fitImage() {}

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
export function skew(x, y, { ctx }) {
  return ctx.transform(1, Math.tan(y), Math.tan(x), 1, 0, 0)
}
