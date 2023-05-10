// Distance to center as a function of the angle, exentricity and semi-major axis
function distance_to_center(angle, e, a) {
    return (1 - Math.pow(e, 2)) / (1 + e * Math.cos(angle)) * a;    
}

//Array of 12 Arbitrary colors for planets
const planetColors = [
    "#FFC857", // Yellow
    "#E9724C", // Coral
    "#C5283D", // Red
    "#481D24", // Dark Red
    "#255C99", // Blue
    "#2A9D8F", // Turquoise
    "#264653", // Dark Blue
    "#F4A261", // Light Orange
    "#8ECAE6", // Light Blue
    "#95B8D1", // Grey Blue
    "#6A994E", // Green
    "#F2E205"  // Bright Yellow
    ];

// Convert polar coordinates to cartesian coordinates
function polar_to_cartesian(angle, distance) {
    return {
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle)
    };
}

// Project a point on the canvas. Center is at (0, 0)
function project_on_canvas(point, scale) {
    return {
        x: point.x * scale * 1e-6,
        y: point.y * scale * 1e-6
    };
}

// Generate a number of point of the orbit, given a and e
function generate_orbit_points(num_point, e, a) {
    const points = [];
    for (let i = 0; i < num_point; i++) {
        const angle = 2 * Math.PI * i / num_point;
        const distance = distance_to_center(angle, e, a);
        const point = polar_to_cartesian(angle, distance);
        const proj_point = project_on_canvas(point, 0.05);
        points.push(proj_point);
    }
    return points;
}

// Draw an orbit using D3.js
function draw_orbit(d3_canvas, element, index) {
    const e = element.eccentricity;
    const a = element.semimajorAxis;
    var classes = ""
    if (element.isPlanet === "TRUE") {
        classes += "isPlanet";
    } else if (element.orbit_type === "Secondary") {
        classes += "isMoon";
    } else {
        classes += "isAsteroid hidden";
    }
    const ctx = d3.path()
    const points = generate_orbit_points(500, e, a);
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    d3_canvas.append("path")
                    .attr("d", ctx)
                    .attr("stroke", planetColors[index%12])
                    .attr("stroke-width", 1)
                    .attr("fill", "none")
                    .attr("class", classes)
}


function on_fully_loaded() {

    const d3_canvas = d3.select("#d3_canvas");

    // Take a random position on the orbits to draw the objects 

    function getRandomElement(points) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];

    d3_canvas.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r",2 )
        .attr("fill", "yellow");

    // Draw everything
    d3.json("data/sol_data.json").then(function(data) {
        data.forEach((element, index) => {
    
            // TODO: process moons
            draw_orbit(d3_canvas, element, index);
        });
    });
}

// Scale the SVG when scrolling
function zoom() {
    const zoom = this.value;
    const scale = 1 + zoom *1e-2;//* 1e-5;
    d3.select("#d3_canvas").style("transform", "scale(" + scale + ") translate(50%, 50%)");
}

function toggleAsteroids() {
    d3.selectAll(".isAsteroid")
        .classed("hidden", !this.checked)
}

// Add the zoom slider event listener
var slider = document.getElementById("zoomSlider");
zoomSlider.addEventListener('input', zoom);

// Add the asteroids check button event listener
var asteroidsButton = document.getElementById("asteroidsButton")
asteroidsButton.addEventListener('change', toggleAsteroids)

// Wait for the page to load before starting the animation
on_fully_loaded();


//function that create the table with json key and values

function displayData(element) {
    let table = d3.select(".table-container")
    console.log(table)
    d3.select(".table-container > div").text(element["eName"])
    for (const key in element) {
        console.log(key)
        if (element.hasOwnProperty(key) && key!="eName") {
            console.log(element[key])
            let row = table.append("tr")
            let nameCell = row.append("td");
            let valueCell = row.append("td");
            
            nameCell.text(key);
            valueCell.text(element[key]);
        }
    }
    table.style("z-index: 2; border: 2px #f00; position: absolute; bottom: 0; right: 0;")
    document.body.appendChild(table);
}

d3.json("data/sol_data.json").then(function(data) {
    displayData(data[0])
})