// sketch.js - A coding experiment using face tracking and 3d objects in p5js
// Author: Aaron Gonzales
// Date: 02/14/23

let video
let eyeL
let eyeR
let lips
let tracker = null
let positions = null

function preload() {
  eyeL = loadModel('assets/3DEye.obj');
  eyeR = loadModel('assets/3DEye.obj');
  lips = loadModel('assets/lips2.0.obj');
}


// setup() function is called once when the program starts
function setup() {
    let myCanvas = createCanvas(800, 800, WEBGL);
    myCanvas.parent('canvas-container');
    // Capture video from the webcam
    video = createCapture(VIDEO);
    video.size(600, 600);
    video.hide();

    // Initialize Eye Tracker using clmtrackr
    // https://www.auduno.com/clmtrackr/docs/reference.html
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(video.elt);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(230, 112, 132);
    noStroke();
    pointLight(60, 60, 60, 30, 0,  400);
    specularMaterial(255);

    // Find and track center of each eye
    positions = tracker.getCurrentPosition();
    if (positions.length > 0) { 
        const eye1 = {
            centerX: positions[27][0],
            centerY: positions[27][1]
        };

        const eye2 = {
            centerX: positions[32][0],
            centerY: positions[32][1]
        };

        const mouth = {
            centerX: positions[57][0],
            centerY: positions[57][1]
        };
    

        // Draw eyes and mouth
        scale(-1.0, 1.0);
        scale(50.0);
        translate(-12, -18);

        // Eye 1
        push();
        translate(eye1.centerX * 0.05, eye1.centerY * 0.05);
        model(eyeL);
        // Draw pupil
        fill(0, 0, 0);
        translate(-0.5, 0, 2);
        sphere(0.3);
        pop();

        // Eye 2
        push();
        translate((eye2.centerX * 0.05) - 7 , eye2.centerY * 0.05);
        model(eyeR);
        // Draw pupil
        fill(0, 0, 0);
        translate(-0.05, 0, 2);
        sphere(0.3);
        pop();

        // Mouth
        push();
        specularMaterial(255, 10, 64);
        translate(-19, -20, -20); // Positional tweaking
        translate(mouth.centerX * 0.1, mouth.centerY * 0.1);
        model(lips); 
        pop();
    }
}
