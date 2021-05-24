function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke('red');
  noFill();
}

function draw() {
  clear();

  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  
  const scaleFactor = map(sin(frameCount * 0.01), -1, 1, 1, 4);
  scale(scaleFactor);

  drawGrid(-250, -250, 500, 500, 10, 10);

  const correctMouse = UTILS.screenToWorld(mouseX, mouseY);
  fill('blue');
  ellipse(correctMouse.x, correctMouse.y, 20);
}

function drawGrid(x1, y1, w, h, columns, rows) {
  const x2 = x1 + w;
  const y2 = y1 + h;

  for (let column = 0; column <= columns; column++) {
    const x = map(column, 0, columns, x1, x2);
    line(x, y1, x, y2);
  }

  for (let row = 0; row <= rows; row++) {
    const y = map(row, 0, rows, y1, y2);
    line(x1, y, x2, y);
  }
}
