// Some global variables
let angle;
let radius;
let circleX;
let circleY;

function setup() {
	createCanvas(600, 600);
	angle = 0;
	radius = 50;
}

function draw() {

	clear()

	// Create grid of circles
	for (let x = 0; x < width; x += 25) {
		for (let y = 0; y < height; y += 25) {

			// If a circle is within range, make it rotate around cursor
			if (distance(mouseX, mouseY, x, y) <= radius) {
				circleX = mouseX + radius * cos(angle + x + y);
				circleY = mouseY + radius * sin(angle + x + y);
				ellipse(circleX, circleY, 10, 10);

			} else { // Draw it within the grid
				ellipse(x, y, 10, 10);
			}
		}
	}

	// Constantly increment angle for rotation effect
	angle += 0.05;
}

// Function for calculating the distance between two points
// using the Pythagorean theorem
function distance(x1, y1, x2, y2) {
	return sqrt( sq((x2 - x1)) + sq((y2 - y1)) );
}
