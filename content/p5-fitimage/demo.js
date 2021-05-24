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
  clear();
  image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'cover'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'contain'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'fill'));

  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'cover', 'top', 'right'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'cover', 'bottom', 'left'));
  // image(...UTILS.fitImage(MAIN_IMG, 0, 0, mouseX, mouseY, 'cover', '0.2', '0.8')); // 20% top and 80% left

  rect(0,0,mouseX, mouseY);
}