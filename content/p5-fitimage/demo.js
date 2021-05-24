let MAIN_IMG;

function preload() {
  MAIN_IMG = loadImage('https://utils.matoseb.com/resources/grid-tv.jpg');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  stroke('red');
  noFill();
}

function draw() {
  image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'cover'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'contain'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'fill'));

  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'fill', 'top', 'right'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'fill', 'top', 'right'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'fill', '0.2', '0.9')); // 20%, 90%

  rect(0,0,mouseX, mouseY);
}