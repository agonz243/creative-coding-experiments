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
    scale(150, -150, 150);

    push();
    translate(-1, 0);
    model(eyeL); 
    pop();

    push();
    translate(1, 0);
    model(eyeR);
    pop();   

    // Find and track eyes and mouth
    positions = tracker.getCurrentPosition();
    if (positions.length > 0) { 
    }
    
}
