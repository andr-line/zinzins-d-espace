const width = window.innerWidth - 50;
const height = window.innerHeight - 50;

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

const svg = d3.select('div#map').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-content")
    .attr("viewbox", `0 0 ${width} ${height}`)

// document.body.onmousemove = (event) => {
//                     d3.select("#tooltip")
//                         .style("left", event.clientX + "px")
//                         .style("top", event.clientY + "px")
                    
//                         .style("opacity", 0.9)
                    
//                              .text("X: " + event.clientX + ", Y:" + event.clientY)
//}

// load and display the World

var g = svg.append("g");
d3.json("world.json",).then((topology) => {
    const features = topology.features
    projection = projection.fitSize([width, height], topology)
    path = d3.geoPath().projection(projection);
    g.selectAll("path")
        .data(features)
        .join((enter) => {
            enter.append("path")
                .attr("d", path)
                
                .attr("stroke", "black")
                
                .attr("fill","rgb(12,150,160)")

                .on("mouseover", (event,d) => {
                    d3.select(event.currentTarget)
                    
                    const coordinates = d3.pointer(event);
                    
                    d3.select("#tooltip")
                        .style("left", coordinates[0] + "px")
                        .style("top", coordinates[1] + "px")
                    
                        .style("opacity", 0.9)
                    
                        .text(coordinates)
                                
                })
                    
                .on("mouseout", (event,d) => {
                    d3.select(event.currentTarget)
                    .attr("stroke-width", 1);
                                
                    d3.select("#tooltip").style("opacity", 0);

                })
                 
        })
    }) ;

        d3.json("../data/observatoires.json").then(function(coordinates) {
            // var projection = d3.geoMercator()
            // projection = projection.fitSize([width, height], coordinates)
            // var path = d3.geoPath().projection(projection);
            
            g.selectAll("circle")
            .data(coordinates)
            .join((enter) => {
                //console.log(coordinates);  
            coordinates.forEach(element => {
            
                //console.log(element.Coordonnées.split(", "))
                cx = projection([element.Coordonnées.split(", ")[1], element.Coordonnées.split(", ")[0]])[0]
                cy = projection([element.Coordonnées.split(", ")[1], element.Coordonnées.split(", ")[0]])[1]
                //cx = parseFloat(element.Coordonnées.split(", ")[0])
                //cy = parseFloat(element.Coordonnées.split(", ")[1])
                
                color=element.Couleur

                enter.append("circle")
                
                .attr("cx",cx)
                .attr("cy",cy)
                .attr("r", 3)
                .style("fill", color)
                // var a=[]
                // d3.json("../ExoPlanet/ExoPlanet.json").then(function(ExoPlanet) {
                //     ExoPlanet.forEach(element1 => {
                //         var b=[]
                //         if (element.Observatoires == element1.disc_facility){
                //             b.push

                //         } 



                //     })

                // });

            })  
        })
    
          });
           

            (update) => update,
            (exit) => exit.remove()