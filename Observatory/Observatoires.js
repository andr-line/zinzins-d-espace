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
//Creation du monde:
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
                
        })

        //Points des observatoires:
        d3.json("../data/observatoires.json").then(function(coordinates) {
            
            g.selectAll("circle")
            .data(coordinates)
            .join((enter) => {
                 
            coordinates.forEach(element => {
                cx = projection([element.Coordonnées.split(", ")[1], element.Coordonnées.split(", ")[0]])[0]
                cy = projection([element.Coordonnées.split(", ")[1], element.Coordonnées.split(", ")[0]])[1]
                barch=[]
               
                
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
                

                enter.append("circle")
                
                .attr("cx",cx)
                .attr("cy",cy)
                .attr("r", 6)
                .attr("id", element.Observatoires)
                .style("fill", color)

                //Structure avec observatoires et quantite d'exoplanetes (barch)
                
                .on("click", (event,d) => {
                    //reemplacer le graphique par le nouveau
                    d3.selectAll(".barch").remove()
                    color=event.currentTarget.style.fill
                  
                    d3.select(".information > .title").text(event.currentTarget.id)//Pour ecrire le nom de l'observatoire
                    var Obs=event.currentTarget.id //Pour recuperer le nom de l'observatoire, car si après on met event.currentTarget.id, ca ne marche pas  
                    d3.json("../ExoPlanet/ExoPlanet.json").then(function(ExoPlanet) {
                        g.selectAll("barch")
                        .data(ExoPlanet)
                        
                        var c=0;
                        //console.log(Obs,c)
                        ExoPlanet.forEach(element1 => {

                            if (Obs == element1.disc_facility){
                                c=c+1; 
                                 
            
                            } 
                        })
                       
                        //demander si Obs est dans le tableau barch pour ne pas agrandir le svg.
                        var i=0;
                        var j=0;
                        barch.forEach(element => {
                            if (element.Observatory == Obs){
                                i=i+1;

                            }
                            
                        })
                        //console.log(i,j)
                        if (i==0){
                            if(barch.length==16){
                                barch.shift()

                                
                            }

                         barch.push({Observatory: Obs, Number: c, Color: color});
                        }
                         console.log(barch)
                         
                         
                         //Création du graphique en barres

                         var margin = {top: 20, right: 20, bottom: 30, left: 5},
                                width1 = 400,
                                height1 =30* barch.length;


                                var y = d3.scaleBand()
                                .range([0, height1])
                                        .padding(0.1);

                        var x = d3.scaleLinear()
                                    .range([0,width1]);

                        y.domain(barch.map(function(d) { return d.Observatory; }));
                        x.domain([0, d3.max(barch, function(d) { return d.Number; })]);


                        var svg = d3.select(".information").append("svg")
                        .attr("class", "barch")
                        .attr("width", width1 + margin.left + margin.right)
                        .attr("height", height1 + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                                 "translate(" + margin.left + "," + margin.top + ")");

                        svg.append("g")
                            .attr("transform", "translate(0," + height1 + ")")
                            .call(d3.axisBottom(x));

                        // svg.append("g")
                        // .call(d3.axisLeft(y));
                        

                        svg.selectAll(".bar")
                            .data(barch)
                            //.enter().insert("rect")
                            .join((enter) => enter.append("rect")
                            
                            .text(function(d) { return (d.Observatory + ": " + d.Number); })
                            .style("fill", "black")
                            .attr("class", "bar")
                            .attr("x", "0")
                            .attr("y", function(d) { return y(d.Observatory); })

                            .attr("height", "25")
                            .transition()        
                            .duration(900)
                            .style("fill", function(d){return (d.Color);} )
                            //.attr("opacity", "0.5")
                            .attr("width", function(d) { return x(d.Number); })
                            
                            

                            
                            );
                            // .transition()
							// 	.duration(1000)
							// 	.attr("width", function(d) { return x(d.Number); });
									

                            //afficher le nom de l'observatoire sur chaque barre
                        
                        svg.selectAll("div")
                            .data(barch)
                            .enter().insert("text")
                            
                            .attr("class", "div")
                            .attr("x", "10")
                            .attr("y", function(d) { return y(d.Observatory)+7; })
                            .attr("dy", ".75em")
                            
                            .text(function(d) { return (d.Observatory + ": " + d.Number); })
                            .style("fill", "black")   
                            .style("font-size", "5px")
                            .transition()        
                            .duration(900)
                            .style("font-size", "15px")
                            .style("font-weight", "bold");


                            
                            
                        });

                          





                          

                        

                    


                    
                });
               
                
            

            });
        });
    });
});

d3.json("../ExoPlanet/ExoPlanet.json").then(function(ExoPlanet1) {
    g.selectAll("circle")
    .data(ExoPlanet1)
    .join((enter) => {
        count=[];
        ExoPlanet1.forEach(element => {

            count.push(element.discoverymethod)
            
        });
        count=new Set(count);
        barch1=[]
        c=0;
       

            count.forEach(element1 => {
                ExoPlanet1.forEach(element => {


                if (element.discoverymethod==element1){
                    c=c+1;
                }
            });
            barch1.push({Method: element1, Number: c});

            
        });
        console.log(barch1)
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
                                width1 = 1100,
                                height1 =400;


                                var x = d3.scaleBand()
                                .range([0, width1])
                                        .padding(0.1);

                        var y = d3.scaleLinear()
                                    .range([height1, 0]);

                        x.domain(barch1.map(function(d) { return d.Method; }));
                        y.domain([0, d3.max(barch1, function(d) { return d.Number; })]);


                        var svg = d3.select(".information1").append("svg")
                        .attr("class", "barch1")
                        .attr("width", width1 + margin.left + margin.right)
                        .attr("height", height1 + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                                 "translate(" + margin.left + "," + margin.top + ")");

                        svg.append("g")
                            .attr("transform", "translate(0," + height1 + ")")
                            .call(d3.axisBottom(x));

                        svg.append("g")
                        .call(d3.axisLeft(y));


                        svg.selectAll(".information1")
                            .data(barch1)
                            .enter().append("rect")
                            .attr("class", "barch1")
                            .attr("x", function(d) { return x(d.Method); })
                            .attr("y", function(d) { return y(d.Number); })
                            .attr("width", x.bandwidth())
                            .style("fill", "red")
                            .attr("height", function(d) { return height1 - y(d.Number); });

                        });
                    

        
        
    });







(update) => update,
(exit) => exit.remove()