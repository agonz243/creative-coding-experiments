// sketch.js - A "Worry Simulator" that I created to visually convey the pressure of
//             modern day anxieties. Text is generated using Tracery.js
//
// Forked from "3D Typography Study" by Zoulei on openprocessing.org
// https://openprocessing.org/sketch/691190
//
// Author: Aaron Gonzales
// Last Edited: 02/21/2023

let str;
let str_arr = [];
let font;

let grammar = 
{
    "origin": ["#negativity#"],
    "negativity": ["When will you #issue#?", "I need to #issue# before it's too late.", "I'll never #issue#",
                    "#people.capitalize# must think I'm #trait#", "I'm so #trait#"],
    "issue": ["get a job", "get married", "have kids", "move out", "make friends"],
    "people": ["everyone", "my friends", "my family"],
    "trait": ["stupid", "weird", "boring", "annoying"]
}

function preload() {
    font = loadFont("./fonts/TypewriterInked.ttf");
}

function setup() {
    let canvas = createCanvas(1500, 800, WEBGL);
    canvas.parent("canvas-container");

    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(100);
    fill(255,255,255);
    //translate(0, 0, 50);

    // Resize canvas if the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvas.width, canvas.height);
    });

    // Generate strings and add them to an array as Type objects
    for (let i = 0; i < 10; i++) {
      let x = random(-width / 2, width / 2);
      let y = random(-height / 2, height / 2);
      let z = random(-width*5, width/2);
      str_arr.push(new Type(loadGrammar(), x, y, z));
    }

}

function draw() {
    background(0, 0, 0);

    // For evert string in the array, display it on screen with animation
	//orbitControl();
    for (let i = 0; i < str_arr.length; i++) {
        str_arr[i].update();
        str_arr[i].display();
    }
}

function loadGrammar() {
    var grammarObj = tracery.createGrammar(grammar);
    return grammarObj.flatten('#origin#');
}


class Type {
    constructor(_str, _x, _y, _z) {
      this.str = _str;
      this.x = _x;
      this.y = _y;
      this.z = _z;
    }
  
    update() {
      this.z += 30;
      if(this.z > width/8){
          this.z = -width*5;
      }
    }
  
    display() {
      push();
      translate(this.x, this.y, this.z);
      text(this.str, 0, 0);
      pop();
    }
  }
