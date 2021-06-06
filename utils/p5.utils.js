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

export class asyncLoader {
  constructor(p5Object = p5) {
    p5Object.prototype.registerPromisePreload({
      method: 'load',
      target: this,
      addCallbacks: false,
    })
  }

  async load(callback) {
    return await callback()
  }
}

export function grid(
  x1,
  y1,
  w,
  h,
  columns = 1,
  rows = 1,
  p5Canvas = globalThis
) {
  let x2, y2

  switch (p5Canvas._renderer._rectMode) {
    case p5Canvas.CENTER:
      x1 -= w * 0.5
      y1 -= h * 0.5
      x2 = x1 + w
      y2 = y1 + h
      break
    case p5Canvas.CORNERS:
      x2 = w
      y2 = h
      break
    case p5Canvas.RADIUS:
      x1 -= w
      y1 -= h
      x2 = x1 + w
      y2 = y1 + h
      break
  }

  for (let row = 0; row <= rows; row++) {
    const y = p5Canvas.map(row, 0, rows, y1, y2)
    p5Canvas.line(x1, y, x2, y)
  }

  for (let column = 0; column <= columns; column++) {
    const x = p5Canvas.map(column, 0, columns, x1, x2)
    p5Canvas.line(x, y1, x, y2)
  }
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
    fitMode = 'cover' /* "contain" | "fill" | "scale-down" | "none" */,
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
  let ir = Math.abs(ih / iw),
    dr = Math.abs(dh / dw)

  if (ir === 0 || dr === 0) return

  alignX = alignments[alignX] ?? alignX
  alignY = alignments[alignY] ?? alignY

  switch (fitMode) {
    case 'contain':
      if (p5Canvas._renderer._imageMode === 'corners') {
        w = x - w
        h = y - h
        dr = Math.abs(h / w)

        if (dr > ir) {
          let p = w * ir
          dy = y - (h + p) * 0.5 - (Math.abs(p) - Math.abs(h)) * (alignY - 0.5)
          dh = p + dy
        } else {
          let p = h / ir
          dx = x - (w + p) * 0.5 - (Math.abs(p) - Math.abs(w)) * (alignX - 0.5)
          dw = p + dx
        }
      } else if (p5Canvas._renderer._imageMode === 'center') {
        if (dr > ir) {
          let p = w * ir
          dh = p + dy
          dy = y + (Math.abs(dh) - Math.abs(h)) * (0.5 - alignY)
        } else {
          let p = h / ir
          dw = p + dx
          dx = x + (Math.abs(dw) - Math.abs(w)) * (0.5 - alignX)
        }
      } else {
        if (dr > ir) {
          let p = w * ir
          dh = p
          dy = y + (h - p) * 0.5 - (Math.abs(p) - Math.abs(h)) * (alignY + 0.5)
        } else {
          let p = h / ir
          dw = p
          dx = x + (w - p) * 0.5 - (Math.abs(p) - Math.abs(w)) * (alignX + 0.5)
        }
      }

      break
    case 'cover':
      if (p5Canvas._renderer._imageMode === 'corners') {
        w = Math.abs(w - x)
        h = Math.abs(h - y)
        dr = h / w
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
