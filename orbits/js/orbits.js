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
function draw_orbit(ctx, e, a) {
    const points = generate_orbit_points(100, e, a);
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
}


function on_fully_loaded() {

    const d3_canvas = d3.select("#d3_canvas");

    // Draw the Sun
    d3_canvas.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r",2 )
        .attr("fill", "yellow");

    // Draw everything
    d3.json("data/sol_data.json").then(function(data) {
        data.forEach((element, index) => {
            const eccentricity = element.eccentricity;
            const semimajorAxis = element.semimajorAxis;
            const isPlanet = element.isPlanet;
    
            // TODO: process moons
            if (isPlanet === "TRUE") {
                const ctx = d3.path()
                draw_orbit(ctx, eccentricity, semimajorAxis);
                d3_canvas.append("path")
                    .attr("d", ctx)
                    .attr("stroke", planetColors[index%12])
                    .attr("stroke-width", 1)
                    .attr("fill", "none");
            }
            
        });
    });
}

// Scale the SVG when scrolling
function zoom() {
    const zoom = this.value;
    const scale = 1 + zoom *1e-2;//* 1e-5;
    console.log(scale);
    d3.select("#d3_canvas").style("transform", "scale(" + scale + ") translate(50%, 50%)");
}

// Add the scroll event listener
var slider = document.getElementById("zoomSlider");
zoomSlider.addEventListener('input', zoom)

// Wait for the page to load before starting the animation
on_fully_loaded();