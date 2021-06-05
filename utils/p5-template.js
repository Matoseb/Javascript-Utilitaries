import * as UTILS from './p5.utils.js'
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/libs/dat.gui.module.js'

const PARAMS = {
  skewx: 30,
  skewy: 0,
  angle: 30,
}

let div
let g;

window.setup = () => {
  const gui = new GUI()

  gui.add(PARAMS, 'skewx').min(-75).max(75)
  gui.add(PARAMS, 'skewy').min(-75).max(75)
  gui.add(PARAMS, 'angle').min(0).max(360)

  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  fill('#eee')
  rectMode(CENTER)
}

window.draw = () => {
  const { skewx, skewy, angle } = PARAMS
  push()
  clear()
  translate(width / 2, height / 2)

  push();
  rotate(-angle)
  UTILS.skew(angle, 0)
  scale(1, 0.86062)
  rect(0, 0, 100, 100)
  pop();

  push();
  translate(0,100)
  rotate(30)
  translate(-50, 0)
  UTILS.skew(angle, 0)
  scale(1, 0.86062)
  rect(0, 0, 100, 100)
  pop();

  push();
  translate(0,100)
  rotate(-30)
  translate(50, 0)
  UTILS.skew(-angle, 0)
  scale(1, 0.86062)
  rect(0, 0, 100, 100)
  pop();


  pop()
}