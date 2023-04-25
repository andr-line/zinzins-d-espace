// Get the canvas element from the HTML document
const canvas = document.getElementById('solarSystemCanvas');

// Get the 2D context of the canvas for drawing
const ctx = canvas.getContext('2d');

// Define a CelestialObject class to represent celestial objects in the solar system
class CelestialObject {
  constructor(name, radius, distance, color, orbitSpeed, parent = null) {
    // Initialize the properties of the object with the given parameters
    this.name = name;
    this.radius = radius;
    this.distance = distance;
    this.color = color;
    this.orbitSpeed = orbitSpeed;
    this.parent = parent;
    this.angle = 0;
  }

  // Define a method to draw the celestial object on the canvas
  draw() {
    // Calculate the x and y coordinates of the object's position based on its current angle and distance
    const xPos = this.parent
      ? this.parent.xPos + Math.cos(this.angle) * this.distance
      : canvas.width / 2 + Math.cos(this.angle) * this.distance;
    const yPos = this.parent
      ? this.parent.yPos + Math.sin(this.angle) * this.distance
      : canvas.height / 2 + Math.sin(this.angle) * this.distance;

    // Begin drawing a new path for the object
    ctx.beginPath();
    // Draw a circle at the object's position with the specified radius and color
    ctx.arc(xPos, yPos, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Save the object's position for future reference
    this.xPos = xPos;
    this.yPos = yPos;
  }

  // Define a method to update the object's angle based on its orbit speed
  update() {
    this.angle += this.orbitSpeed;
  }
}

// Create a new CelestialObject instance to represent the Sun
const sun = new CelestialObject('Sun', 50, 0, 'yellow', 0);

// Create an array of CelestialObject instances to represent the planets in the solar system
const planets = [
  new CelestialObject('Mercury', 5, 100, 'gray', 0.02),
  new CelestialObject('Venus', 10, 150, 'orange', 0.01),
  new CelestialObject('Earth', 12, 200, 'blue', 0.005),
  new CelestialObject('Mars', 8, 250, 'red', 0.0025),
  // Add more planets if desired
];

// Create an array of CelestialObject instances to represent the moons/satellites in the solar system
const satellites = [
  new CelestialObject('Moon', 4, 30, 'gray', 0.03, planets[2]), // Orbiting around Earth
  // Add more satellites if desired
];

// Define an animation loop to continuously update and draw the positions of the celestial objects
function animate() {
  // Clear the canvas before drawing the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the Sun in the center of the canvas
  sun.draw();

  // Update and draw each planet in the solar system
  for (const planet of planets) {
    planet.update();
    planet.draw();
  }

  // Update and draw each satellite/moon in the solar system
  for (const satellite of satellites) {
    satellite.update();
    satellite.draw();
  }

  // Request the next animation frame to continue the animation loop
  requestAnimationFrame(animate);
}

animate();