import * as CANVAS from './canvas.utils.js'

export function rotateFromPoint(angle, pivotX, pivotY, p5Canvas = globalThis) {
  // console.log(p5Canvas._renderer._pInst._angleMode)
  p5Canvas.translate(pivotX, pivotY)
  p5Canvas.rotate(angle)
  p5Canvas.translate(-pivotX, -pivotY)
}

export function screenToWorld(x, y, p5Canvas = globalThis) {
  const ctx = p5Canvas._renderer.drawingContext
  const pixelDensity = p5Canvas._renderer._pixelsState._pixelDensity
  return CANVAS.screenToWorld(x, y, { ctx, pixelDensity })
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
