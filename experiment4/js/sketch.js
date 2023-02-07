/*
*   Author: Aaron Gonzales
*   Last Edited: 02/06/2023
*
*   Description: An image, sound and video based experiment in p5js created for 
*   UCSC's CMPM 169 - Creative Coding.
*/

let myCanvas;
let video;
let p1
let cutoutSize;
let eyeW;
let eyeH;
let mouthW;
let mouthH;
let tracker = null;
let positions = null;
let photos = null;
let p; // Current photo in the array

function preload() {
    p1 = loadImage("assets/raichu.jpg")
    p2 = loadImage("assets/newgarf.png")
    p3 = loadImage("assets/lincoln.jpg")
}

function setup() {
    let myCanvas = createCanvas(600, 600);
    myCanvas.parent("canvas-container");
    p = 0;

    // Capture video from the webcam
    video = createCapture(VIDEO);
    video.size(600, 600);
    video.hide();

    // Set sizes for eyes and mouth
    cutoutSize = 60;
    eyeW = 50;
    eyeH = 30;

    mouthW = 60;
    mouthH = 30;

    // Initialize Eye Tracker using clmtrackr
    // https://www.auduno.com/clmtrackr/docs/reference.html
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(video.elt);

    // Set up array of photo options
    photos = [];
    const lincoln = {
        pic: p3,
        eyeLX: 140,
        eyeLY: 190,
        eyeRX: 225,
        eyeRY: 190,
    }
    photos.push(lincoln);

    const raichu = {
        pic: p1,
        eyeLX: 320,
        eyeLY: 241,
        eyeRX: 443,
        eyeRY: 241,
        addMouth: true,
        mouthX: 390,
        mouthY: 325
    }
    photos.push(raichu);

    const garf = {
        pic: p2,
        eyeLX: 155,
        eyeLY: 100,
        eyeRX: 250,
        eyeRY: 105,
        addMouth: false
    }
    photos.push(garf);


}

function draw() {
    image(photos[p].pic, 0, 0, 600, 600);

    // Find and track eyes and mouth
    positions = tracker.getCurrentPosition();
    if (positions.length > 0) {   
        const eye1 = {
            browX: positions[19][0],
            browY: positions[19][1]
        };

        const eye2 = {
            browX: positions[18][0],
            browY: positions[18][1]
        };

        const mouth = {
            cornerX: positions[45][0],
            cornerY: positions[45][1]
        }

        // Draw left eye
        photos[p].pic.copy(video, eye1.browX, eye1.browY, eyeW, eyeH, 
            photos[p].eyeLX, photos[p].eyeLY, cutoutSize, cutoutSize - 20);
        // Draw right eye
        photos[p].pic.copy(video, eye2.browX, eye2.browY, eyeW, eyeH, 
            photos[p].eyeRX, photos[p].eyeRY, cutoutSize, cutoutSize - 20);
        //Draw mouth
        if (photos[p].addMouth) {
            photos[p].pic.copy(video, mouth.cornerX - 5, mouth.cornerY, mouthW, mouthH, 
                photos[p].mouthX, photos[p].mouthY, cutoutSize, cutoutSize - 20);
        }
        
    }
}

function mousePressed() {
    if (p < photos.length - 1) {
        p += 1;
    } else {
        p = 0;
    }
}
