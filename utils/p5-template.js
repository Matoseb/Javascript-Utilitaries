import * as UTILS from './p5.utils.js'
import { delay } from './async.utils.js'
import { cssDuoTone } from './color.utils.js'
// import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/libs/dat.gui.module.js'

const PARAMS = {
  skewx: 30,
  skewy: 0,
  angle: 30,
}

// window.onload = () => {
//   const img = new Image()
//   img.src = '../resources/grid-tv.jpg'
//   document.body.appendChild(img)
//   img.style.filter = cssDuoTone('white', 'red');
//   console.log()
// }
let g, img

window.preload = () => {
  img = loadImage('../resources/grid-tv.jpg')
}

window.setup = () => {
  // console.log(p[1])
  // const gui = new GUI()

  // gui.add(PARAMS, 'skewx').min(-75).max(75)
  // gui.add(PARAMS, 'skewy').min(-75).max(75)
  // gui.add(PARAMS, 'angle').min(0).max(360)
  noFill()
  createCanvas(windowWidth, windowHeight)
  imageMode(CORNERS)
  rectMode(CORNERS)
  // g = createGraphics(windowWidth, windowHeight)
}

window.draw = () => {
  background(255)

  let x, y
  ;({ x, y } = UTILS.screenToWorld(mouseX, mouseY))
  // ;({ x, y } = { x: mouseX, y: mouseY })

  UTILS.fitImage(img, (width / 3) * 2, height / 2, x, y, {
    fitMode: 'contain',
    alignX: 0.5,
    alignY: 0,
  })
  rect((width / 3) * 2, height / 2, x, y)

  // image(img, width / 3, height / 2, x, y)
  // rect(width / 3, height / 2, x, y)

  // UTILS.grid(0,100,mouseX,mouseY, 2, 2)
}
