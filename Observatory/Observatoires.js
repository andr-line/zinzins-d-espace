const width = window.innerWidth - 50;
const height = window.innerHeight - 50;

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

const svg = d3.select('div#map').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-content")
    .attr("viewbox", `500 500 ${width} ${height}`);

var g = svg.append("g");
d3.json("world.json").then((topology) => {
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
                    const coordinates = d3.pointer(event);
                    d3.select("#tooltip")
                        .style("left", coordinates[0] + "px")
                        .style("top", coordinates[1] + "px")
                        .style("opacity", 0.9)
                        .text(coordinates);       
                })   
                .on("mouseout", (event,d) => {
                    d3.select(event.currentTarget)
                    .attr("stroke-width", 1);
                    d3.select("#tooltip").style("opacity", 0);
                })
        })
        d3.json("../data/observatoires.json").then(function(coordinates) {
            
            g.selectAll("circle")
            .data(coordinates)
            .join((enter) => {
                 
            coordinates.forEach(element => {
                cx = projection([element.Coordonnées.split(", ")[1], element.Coordonnées.split(", ")[0]])[0]
                cy = projection([element.Coordonnées.split(", ")[1], element.Coordonnées.split(", ")[0]])[1]
                
                
                color=element.Couleur
                if(element.hasOwnProperty("Flèche")) {
                    cxf = projection([element.Flèche.split(", ")[1], element.Flèche.split(", ")[0]])[0]
                    cyf = projection([element.Flèche.split(", ")[1], element.Flèche.split(", ")[0]])[1]
                    enter.append("line")
                    .attr("x1",cx)
                    .attr("y1",cy)
                    .attr("x2",cxf)
                    .attr("y2",cyf)
                    .attr("stroke-width", 0.8)
                    .attr("stroke", color)
                
                }
                var qplanete=[];
                var listeObs=[];

                enter.append("circle")
                
                .attr("cx",cx)
                .attr("cy",cy)
                .attr("r", 6)
                .attr("id", element.Observatoires)
                .style("fill", color)
                .on("click", (event,d) => {
                    d3.select(".information > .title").text(event.currentTarget.id)
                    const Obs=event.currentTarget.id
                    d3.json("../ExoPlanet/ExoPlanet.json").then(function(ExoPlanet) {
                        g.selectAll("table")
                        .data(ExoPlanet)
                        
                        var c=0;
                        ExoPlanet.forEach(element1 => {

                            if (Obs == element1.disc_facility){
                                c=c+1; 
                                 
            
                            } 
                        })
                        d3.select(".information > .content").text(c)
                         qplanete.push(c)
                         listeObs.push(Obs)
                         
                        

                    


                    });
                });
                
            

            });
        });
    });
});

(update) => update,
(exit) => exit.remove()