// Setup
function setup() {
  createCanvas(800,800);
  background(0);
}

// Define Ellipse class
class Wavellipse {

  constructor(w, h) {
    this.h = h
    this.w = w
    
    this.h_start = h
    this.w_start = w

    this.locked = true
  }
  
  draw() {
    if (this.locked) {
      ellipse(height / 2, width / 2, this.w, this.h)
    } else {
      ellipse(mouseX, mouseY, this.w, this.h)
    }
    
  } 
  
  // The ellipse remembers the shape of its soul
  homeostasis() {
    
    // Revert to original shape over time
    if (wavyEllipse.h < wavyEllipse.h_start) {
      wavyEllipse.h += 2
    } 
    
    if (wavyEllipse.w > wavyEllipse.w_start) {
      wavyEllipse.w -= 2
    }
    
    if (wavyEllipse.h > wavyEllipse.h_start) {
      wavyEllipse.h -= 2
    }
  }

}

// Instantiate ellipse object
let wavyEllipse = new Wavellipse(50, 100)


// Draw stuff continuously
function draw() {
  wavyEllipse.draw()
  
  // If down is pressed, squash and stretch
  if (keyIsDown(40)) {
    wavyEllipse.h -= 1
    wavyEllipse.w += 1
    
  }
  
  // If Up is pressed, stretch vertically
  if (keyIsDown(38)) {
    wavyEllipse.h += 1
    wavyEllipse.w += 0.5
  }
  
  
  if (!keyIsPressed) {
    wavyEllipse.homeostasis()
  }
}


// Check for single key presses
function keyPressed() {
  
  // If R is pressed, reset canvas
  if (keyCode === 82) {
    background(0)
  }
  
  // If T is pressed, activate trail mode
  if (keyCode === 84) {
    wavyEllipse.locked = !wavyEllipse.locked
  }
}