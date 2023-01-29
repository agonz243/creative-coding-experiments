let angle = 0;

function setup() {
	createCanvas(600, 600);
}

function draw() {

	clear()

	// Create grid of circles
	for (let x = 0; x < width; x += 25) {
		for (let y = 0; y < height; y += 25) {
			ellipse(x, y, 10, 10);
		}
	}







	/*
	clear()
	let radius = 20;
	let circleX = mouseX + radius * cos(angle);
	let circleY = mouseY + radius * sin(angle);

	ellipse(circleX, circleY, 10, 10);
	angle += 0.05;
	*/
}
