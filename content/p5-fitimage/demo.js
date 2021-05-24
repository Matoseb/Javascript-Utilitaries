let MAIN_IMG;

function preload() {
  MAIN_IMG = loadImage('https://via.placeholder.com/500x500');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY)); // ... is a spread operator
}