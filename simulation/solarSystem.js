const canvas = document.getElementById('solarSystemCanvas');
const ctx = canvas.getContext('2d');

class CelestialObject {
  constructor(name, radius, distance, color, orbitSpeed, parent = null) {
    this.name = name;
    this.radius = radius;
    this.distance = distance;
    this.color = color;
    this.orbitSpeed = orbitSpeed;
    this.parent = parent;
    this.angle = 0;
  }

  draw() {
    const xPos = this.parent
      ? this.parent.xPos + Math.cos(this.angle) * this.distance
      : canvas.width / 2 + Math.cos(this.angle) * this.distance;
    const yPos = this.parent
      ? this.parent.yPos + Math.sin(this.angle) * this.distance
      : canvas.height / 2 + Math.sin(this.angle) * this.distance;

    ctx.beginPath();
    ctx.arc(xPos, yPos, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();

    this.xPos = xPos;
    this.yPos = yPos;
  }

  update() {
    this.angle += this.orbitSpeed;
  }
}

const sun = new CelestialObject('Sun', 50, 0, 'yellow', 0);
const planets = [
  new CelestialObject('Mercury', 5, 100, 'gray', 0.02),
  new CelestialObject('Venus', 10, 150, 'orange', 0.01),
  new CelestialObject('Earth', 12, 200, 'blue', 0.005),
  new CelestialObject('Mars', 8, 250, 'red', 0.0025),
  // Add more planets if desired
];

const satellites = [
  new CelestialObject('Moon', 4, 30, 'gray', 0.03, planets[2]), // Orbiting around Earth
  // Add more satellites if desired
];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sun.draw();

  for (const planet of planets) {
    planet.update();
    planet.draw();
  }

  for (const satellite of satellites) {
    satellite.update();
    satellite.draw();
  }

  requestAnimationFrame(animate);
}

animate();