// sketch.js - purpose and description here
// Author: Aaron Gonzales
// Date: 02/21/2023

let generatedText;

let grammar = 
{
    "origin": ["There once was a person named #name#. Every day, without fail, they felt #mood#."],
    "name": ["Aaron", "Amy", "Misha"],
    "mood": ["Zesty", "Furious", "Happy", "Hangry"]
}

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent("canvas-container");
    textSize(20);
    textAlign(CENTER, CENTER);
    generatedText = loadGrammar();

}

function draw() {
    clear();
    text(generatedText, width / 2, height / 2);
}

function loadGrammar() {
    var grammarObj = tracery.createGrammar(grammar);
    return grammarObj.flatten('#origin#');
}

function mouseClicked() {
    generatedText = loadGrammar();
}