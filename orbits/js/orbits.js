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

//new dictionnary for variable 
const variableLabels = {
    eName: "Name",
    isPlanet: "Planet",
    semimajorAxis: "Semi-major Axis [km]",
    perihelion: "Perihelion [km]",
    aphelion: "Aphelion [km]",
    eccentricity: "Eccentricity",
    inclination: "Inclination [°]",
    density: "Density [g/cm³]",
    gravity: "Gravity [m/s²]",
    escape: "Escape Velocity [m/s]",
    meanRadius: "Mean Radius [km]",
    equaRadius: "Equatorial Radius [km]",
    polarRadius: "Polar Radius [km]",
    flattening: "Flattening",
    dimension: "Dimensions",
    sideralOrbit: "Sideral Orbit Period [days]",
    sideralRotation: "Sideral Rotation Period [hours]",
    discoveryDate: "Discovery Date",
    mass_kg: "Mass [kg]",
    volume: "Volume [km³]",
    orbit_type: "Orbit Type",
    orbits: "Orbits",
    bondAlbido: "Bond Albedo",
    geomAlbido: "Geometric Albedo",
    RV_abs: "Absolute RV",
    p_transit: "Transit Period [days]",
    transit_visibility: "Transit Visibility [hours]",
    transit_depth: "Transit Depth",
    massj: "Mass [Jupiter masses]",
    semimajorAxis_AU: "Semi-major Axis [AU]",
    grav_int: "Gravitational Intensity [m/s²]"
};

var zoomTarget = [0, 0]

var positions = {"NA": {x:0,y:0}}

// Distance to center as a function of the angle, exentricity and semi-major axis
function distance_to_center(angle, e, a) {
    return (1 - Math.pow(e, 2)) / (1 + e * Math.cos(angle)) * a;   
}

// Convert polar coordinates to cartesian coordinates
function polar_to_cartesian(angle, distance) {
    return {
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle)
    };
}

// Project a point on the canvas. Center is at offset ={x,y}
function project_on_canvas(point, scale, offset) {
    return {
        x: point.x * scale * 0.75e-6 + offset.x,
        y: point.y * scale * 0.75e-6 + offset.y
    };
}

// Generate a number of point of the orbit, given a and e
function generate_orbit_points(num_point, e, a, offset) {
    const points = [];
    for (let i = 0; i < num_point; i++) {
        const angle = 2 * Math.PI * i / num_point
        const distance = distance_to_center(angle, e, a)
        const point = polar_to_cartesian(angle, distance)
        const proj_point = project_on_canvas(point, 0.05, offset)
        points.push(proj_point);
    }
    return points;
}

// Take a random position on the orbits to draw the objects 
function getRandomElement(points) {
    const randomIndex = Math.floor(Math.random() * points.length)
    return points[randomIndex]
}

// Draw an orbit using D3.js
function draw_orbit(d3_canvas, element, index, position) {
    const e = element.eccentricity
    const a = element.semimajorAxis
    var classes = ""
    if (element.isPlanet === "TRUE") {
        classes += "isPlanet"
    } else if (element.orbit_type === "Secondary") {
        classes += "isMoon"
    } else {
        classes += "isAsteroid hidden"
    }
    
    // draw orbits
    const ctx = d3.path()
    const points = generate_orbit_points(500, e, a, position[element.orbits]); // move orbit to parent
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        ctx.lineTo(point.x, point.y)
    }
    ctx.closePath();
    d3_canvas.append("path")
        .attr("d", ctx)
        .attr("stroke", planetColors[index%12])
        .attr("stroke-width", 1)
        .attr("fill", "none")
        .attr("class", classes)
        .attr("z-index", "2")

    // Hide moon circles but not orbits
    classes += " body"
    if (element.orbit_type === "Secondary") {
        classes += " hidden";
    }
    

    
    // Draw object circles
    const randomPoint = position[element.eName]
    d3_canvas.append("circle")
    .attr("cx", randomPoint.x + position[element.orbits].x)
    .attr("cy", randomPoint.y + position[element.orbits].y)
    .attr("r", 5)
    .attr("fill", planetColors[index%12])
    .classed("planet", true)
    .classed(classes, true)
    .attr("z-index", "200")
    .attr("data-eName", element.eName)
    .on("click", e => selectPlanet(element, position))
}

function selectPlanet(element, position) {
    console.log(position)
    const randomPoint = position[element.eName]
    let selected = d3.select(`[data-eName="${element.eName}"]`)
    if (!selected.classed("highlighted")) {
        displayData(element);
        d3.select(".highlighted1").classed("highlighted1", false)
        d3.select(".highlighted").classed("highlighted", false).classed("highlighted1", true);
        d3.selectAll(".body").classed("highlighted", false);
        selected.classed("highlighted", true);
    } else {
        // selected.classed("highlighted", false);
        // d3.select(".highlighted1").classed("highlighted1", false).classed("highlighted", true);
    }
    console.log(position)
    console.log(randomPoint)
    zoomTarget = [randomPoint.x + position[element.orbits].x, randomPoint.y + position[element.orbits].y]
}

let dataSet = [];
// Draw the solar system
function on_fully_loaded() {
    const d3_canvas = d3.select("#d3_canvas_translated")
    d3.json("data/sol_data.json").then(function(data) {
        dataSet = data;
        // Generate object positions
        data.forEach((element) => {
            e = element.eccentricity
            a = element.semimajorAxis
            points = generate_orbit_points(500, e, a, {x:0,y:0})
            randomPoint = getRandomElement(points)
            positions[element.eName.toString()] = randomPoint
        })
        
        // draw orbit and object at its position
        data.forEach((element, index) => {
            draw_orbit(d3_canvas, element, index, positions)
        })
    })
}

// Scale the SVG when scrolling
var scale = 1
function zoom() {
    let zoom = this.value;
    scale = 0.000001**(zoom);
    let str1 = "scale(" + 1/scale + ") "
    let str2 = "calc(" + -zoomTarget[0] + "px + 50% * " + scale + ")"
    let str3 = "calc(" + -zoomTarget[1] + "px + 50% * " + scale + ")"
    let str = str1 + "translate(" + str2 + ", " + str3 + ")"
    d3.select("#d3_canvas_translated").style("transform", str)
    d3.selectAll("path").style("stroke-width", 1 * scale)
    d3.selectAll("circle").attr("r", 5 * scale)
    d3.select("#selectionStyle").text(`.highlighted, .highlighted1 {
        stroke-width: ${1.5 * scale};
    }`)
}

// Toggle asteroids and moon bodies
function toggleAsteroids() {
    d3.selectAll(".isAsteroid").classed("hidden", !this.checked)
    d3.selectAll(".isMoon.body").classed("hidden", !this.checked)
}

// Add the zoom slider event listener
var slider = document.getElementById("zoomSlider")
zoomSlider.addEventListener('input', zoom)

// Add the asteroids check button event listener
document.getElementById("asteroidsButton").addEventListener("change", toggleAsteroids);

// The search bar
let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", function() {
    // Hide all irrelevant search results
    let input = this.value.toLowerCase();
    d3.selectAll(".searchResult").each(function() {
        result = d3.select(this)
        if (result.select("td").text().toLowerCase().includes(input)) {
            result.classed("hiddenCell", false)
        } else {
            result.classed("hiddenCell", true)
        }
    })
});
searchBar.addEventListener("focus", function () {
  // Add all possible search results
  dataSet.forEach(element => {
    d3.select("#controlTable")
      .append("tr").classed("searchResult", true)
      .append("td").attr("colspan", "3").text(element.eName)
      .on("click", function (e) {
        selectPlanet(element, positions); // Pass the position variable to the selectPlanet function
      });
  });
});

// Remove search results when clicking outside table
d3.select(document).on("click", function(event) {
    if (!d3.select("#controlTable").node().contains(event.target)) {
        d3.selectAll(".searchResult").remove()
        d3.select("#searchBar").property("value", "")
    }
})

// Wait for the page to load before starting the animation
on_fully_loaded()

//function that creates the table with planet infos
function createTable() {
    let table = d3.select(".table-container")
    for (const key in variableLabels) {
        let row = table.append("tr").attr("id", key)
        let label = variableLabels[key] ? variableLabels[key] : key
        label = label.toString()
        if (key == "eName") {
            row.append("td")
                    .text(label)
        } else {
            row.append("td").text(label)
        }
    }
}
createTable()

//function that adds the planet info to the table
function displayData(element) {
    let table = d3.select(".table-container");
    if (table.select("tr").selectAll("td").size() >= 3) {
        table.selectAll("tr").each(function() {
            d3.select(this).selectAll("td").filter((d, i) => i == 1).remove()
        })
    }

    for (const key in element) {
        if (element.hasOwnProperty(key)) {
            let row = table.select("#" + key)
            let valueCell = row.append("td")
            valueCell.text(element[key].toString())
        }
    }
    table.style("z-index", "2")
         .style("border", "2px #f00")
         .style("position", "absolute")
         .style("bottom", "0")
         .style("right", "0")
    document.body.appendChild(table.node())
}


document.getElementById('toggleTableButton').addEventListener('click', function() {
    let table = document.querySelector('.table-container')
    if (table.style.display === 'none') {
        table.style.display = 'block'
    } else {
        table.style.display = 'none'
    }
})

