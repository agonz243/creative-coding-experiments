// sketch.js - purpose and description here
// Author: Your Name
// Date:

let video
let eyeL
let eyeR
let tracker = null
let positions = null

function preload() {
  eyeL = loadModel('assets/3DEye.obj');
  eyeR = loadModel('assets/3DEye.obj');
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
    background(220);

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
    

        // Scale the eyeballs so they are visible
        scale(-1.0, 1.0);
        scale(50.0);
        translate(-12, -18);

        push();
        translate(eye1.centerX * 0.05, eye1.centerY * 0.05);
        model(eyeL); 
        pop();

        push();
        translate((eye2.centerX * 0.05) - 7 , eye2.centerY * 0.05);
        model(eyeR);
        pop();   
    }
}
