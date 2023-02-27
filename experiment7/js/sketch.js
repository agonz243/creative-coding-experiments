// sketch.js -
//
// Author: Aaron Gonzales
// Last Edited: 02/27/2023

let testText;
let midX;
let midY;
let textArr;
let t;
let shootings;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvas-container");
  background(0);
  textAlign(CENTER, CENTER);
  rectMode(CENTER)

  // Set variables for middle of screen
  midX = width / 2;
  midY = height / 2;

  // Variables used for displaying statistics
  shootings = 0;

  t = 0; // Current text index to access in text array
  textArr = ["Hello there, how are you?", "I'd Like to show you something", 
  "Indulge me, if you will. As I give you a glimpse...", "...of life as a Black or Hispanic American",
  "Since, 2015 The Washington Post has tracked " + shootings + " fatal police shootings",
  "45%"]
  currText = new FadeText(textArr[t], midX, midY, 32)
}

function draw() {
  background(0);

  // Display text and fade in/out as necessary
  currText.display();
  if (!currText.faded) {
    currText.fadeIn();
  } else {
    currText.fadeOut();
  }

  // When one sentence is faded out, fade in the next
  if (currText.opacity <= 0 && t < textArr.length - 1) {
    t += 1;
    console.log(textArr[t]);
    currText.str = textArr[t];
    currText.faded = !currText.faded;
  }

  // Handle the rising count for the 5th panel
  if (t == 4 && shootings < 8229) {
    constrain(shootings, 0, 8229);
    shootings += 10;
    textArr[t] = "Since, 2015 The Washington Post has tracked " + shootings + " fatal police shootings in the US"
    currText.str = textArr[t];
  }

  if (t == 5 && currText.s < 200) {
    currText.s += 0.5;
    console.log(currText.s)
  }
}

function mouseClicked() {
  currText.faded = true;
}

class FadeText {
  constructor(_str, _x, _y, _size) {
    this.str = _str;
    this.x = _x;
    this.y = _y;
    this.s = _size
    this.opacity = 1;
    this.faded = false; // Whether the text should be fading in or out
  }

  display() {
    push();
    textSize(this.s);
    fill(255, 255, 255, this.opacity);
    text(this.str, this.x, this.y, 700, 300);
    pop();
  }

  fadeOut() {
    if (this.opacity > 0) {
      this.opacity -= 2;
    }
  }

  fadeIn() {
    if (this.opacity < 200) {
      this.opacity += 2;
    }
  }
}
