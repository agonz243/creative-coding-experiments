// sketch.js - An interactive showcase of disproportionate
//             police shootings in the U.S.
// Author: Aaron Gonzales
// Last Edited: 03/01/2023

let testText;
let midX;
let midY;
let textArr;
let t;
let canClick = true;
let shootings;
let t5Text;

let person3;
let person6;
let person9;
let graphic1;
let graphic2;
let graphic3;

function preload() {
  graphic_b = loadImage("./assets/graphic_b.png");
  graphic_h = loadImage("./assets/graphic_h.png");
  graphic_w = loadImage("./assets/graphic_w.png");
}

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
  "Despite making up only 32.5 % of the population...", "45%", "This is, no doubt, disproportionate",
  "White Americans are shot at a rate of 2.3 per million of the population, per year...",
  "Hispanic Americans, at a rate of 2.6 per million...", 
  "and Black Americans at a rate of 5.9 per million",
  "We must refute the idea that Black or Hispanic Americans commit more crime",
  "Instead, we must accept that deeply rooted issues exist within our Police Forces",
  "Be part of the solution...", "Follow the facts...", "and think for yourself", "Thank you."]
  currText = new FadeText(textArr[t], midX, midY, 32)

  // Create fading graphics
  graphic1 = new FadeImage(graphic_w, 200, 275, 30, 170);
  graphic2 = new FadeImage(graphic_h, 400, 255, 30, 200);
  graphic3 = new FadeImage(graphic_b, 600, 50, 30, 410);
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

  // Handle enlarging percentage and fading text
  if (t == 6 && currText.s < 200) {
    canClick = false;
    currText.s += 0.5;
  } else if (t == 6 && currText.s >= 200 && currText.y > midY - 30) {
    currText.y -= 0.5;
    t5Text = new FadeText("Of victims were black or hispanic", midX, midY + 10, 25)
    t5Text.opacity = 0;
    t5Text.y = midY + 60;
  } else if (t == 6 && currText.s >= 200 && currText.y <= midY - 30) {
    t5Text.display()
    t5Text.fadeIn();
    canClick = true;
  }

  if (t == 7) {
    t5Text.display();
    t5Text.fadeOut();
    currText.s = 32;
    currText.y = midY;
  }

  if (t == 8 || t == 9 || t == 10) {
    currText.y = midY + 200;
    
    graphic1.display();
    if (graphic1.opacity > 0) {
      canClick = false;
    } else {
      canClick = true;
    }
  }

  if (t == 9 || t == 10) {
    graphic2.display();
    if (graphic2.opacity > 0) {
      canClick = false;
    } else {
      canClick = true;
    }
  }

  if (t == 10) {
    graphic3.display();
    if (graphic3.opacity > 0) {
      canClick = false;
    } else {
      canClick = true;
    }
  }

  if (t == 11) {
    graphic1.display();
    graphic2.display();
    graphic3.display();
    graphic1.faded = true;
    graphic2.faded = true;
    graphic3.faded = true;

    if (graphic1.opacity >= 300 && currText.y > midY) {
      currText.y -= 1;
    }
  }
}

function mouseClicked() {
  if (canClick) {
    currText.faded = true;
  }
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

class FadeImage {
  constructor(_img, _x, _y, _width, _height) {
    this.img = _img;
    this.x = _x;
    this.y = _y;
    this.w = _width;
    this.h = _height;
    this.opacity = 300;
    this.faded = false; // Whether or not the image should be faded
  }

  display() {
    if (this.opacity < 300) {
      push()
      translate(this.x, this.y);
      image(this.img, 0, 0, this.w, this.h);
      fill(0, 0, 0, this.opacity);
      rect(0, 0, this.w * 2, this.h * 2);
      pop();
    }

    if (this.faded) {
      this.fadeOut();
    } else {
      this.fadeIn();
    }
  }

  fadeIn() {
    if (this.opacity > 0) {
      this.opacity -= 3;
    }
  }

  fadeOut() {
    if (this.opacity < 300) {
      this.opacity += 3;
    }
  }
}
