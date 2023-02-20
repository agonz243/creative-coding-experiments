// sketch.js - purpose and description here
// Author: Aaron Gonzales
// Date: 02/21/2023

let generatedText;

let grammar = 
{
    "origin": ["#negativity#"],
    "negativity": ["When will you #issue#?", "I need to #issue# before it's too late.", "I'll never #issue#",
                    "#people.capitalize# must think I'm #trait#", "I'm so #trait#"],
    "issue": ["get a job", "get married", "have kids", "move out", "make friends"],
    "people": ["everyone", "my friends", "my family"],
    "trait": ["stupid", "weird", "boring", "annoying"]
}

function setup() {
    let canvas = createCanvas(800, 800);
    background(0, 0, 0);
    canvas.parent("canvas-container");

    // Resize canvas if the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvas.width, canvas.height);
    });

    textSize(20);
    fill(255);
    textAlign(CENTER, CENTER);
    generatedText = loadGrammar();

}

function draw() {
    background(0, 0, 0);
    text(generatedText, width / 2, height / 2);
}

function loadGrammar() {
    var grammarObj = tracery.createGrammar(grammar);
    return grammarObj.flatten('#origin#');
}

function mouseClicked() {
    console.log("Generated Text")
    generatedText = loadGrammar();
}