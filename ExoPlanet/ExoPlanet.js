/* The json file was translated from csv (https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) using the (https://csvjson.com/csv2json) website */
//Width and height
const w = 600;
const h = 250;

var xScale;
var yScale;

var dataset = [];
var dataset1 = [];
var body=d3.select("body");
d3.csv("../data/PSCompPars_2023.04.25_07.07.02.csv")


d3.csv("../data/exoplanet_data.csv")
//Create SVG element
const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

function update_graph(new_data,new_data1) {
    
    //Work with bars
    svg.selectAll("rect")
    .data(new_data)
    .join((enter) => enter.append("rect")
                        .transition()
                        .duration(1000)
                        .attr("x", (d, i) => xScale(i))
                        .attr("y", (d) => h - yScale(d))
                        .attr("width", xScale.bandwidth())
                        .attr("height", (d) => yScale(d))
                        .attr("fill", (d) => "rgb(1, " + (d * 20) + "," + 5*d + " )"),
          (update) => update.transition()
                        .duration(1000)
                        .attr("y", (d) => h - yScale(d))
                        .attr("height", (d) => yScale(d))
                        .attr("fill", (d) => "rgb(1," + (d * 20) + ", " + 5*d + ""),
          (exit) => exit.transition()
                          .duration(1000)
                        .attr("y",h)
                        .remove()
    )

    //Work with labels
    svg.selectAll("text")
    .data(new_data1)
    .join((enter) => enter.append("text")
                        .transition()
                        .duration(1000)
                        .text((d) => d)
                        .attr("text-anchor", "middle")
                        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
                        .attr("y", (d) => h - yScale(d) + 14)
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("fill", "white"),
          (update) => update.transition()
                        .duration(1000)
                        .text((d) => d)
                        .attr("y", (d) => h - yScale(d) + 14),
          (exit) => exit.transition()
                          .duration(1000)
                        .attr("y",0)
                        .remove()
    )

}
    
//On click, update with Discovery method			
d3.select("#method")
    .on("click", function() {

        d3.csv("../data/exoplanet_data.csv", function(data) {
            for (var i = 0; i < data.length; i++) {
                dataset.push(String (data[i].discoverymethod)); //Array avec les methodes.
            }
        });
        dataset1=[];
        dataset1.push(dataset[0]);
        for (var i=1 ; i < dataset.length; i++) {
            var c=0;
            for (var j=0 ; j < dataset1.length; j++){
                
                if(dataset[i]===dataset1[j]){
                     var c=c+1;
                }
            if (c===0){
                dataset1.push(dataset[i]); //Array avec les methodes sans doubles
            } 
        
        }
        }
            var dataset2=[];
            

        for (var i=0 ; i < dataset1.length; i++) {
            var c=0;
            for (var j=0 ; j < dataset.length; j++){
                
                if(dataset[i]===dataset1[j]){
                   var c=c+1;
                }
            }
            
                dataset2.push(c); //Array avec les quNTITÉS DE CHAQUE METHODE
        }
            
            
        

        xScale = d3.scaleBand()
                        .domain(d3.range(dataset1.length))
                        .padding(.05)
                        .range([0, w]);

        yScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset2)])
                        .range([0, h]);

        //Update all rects
        update_graph(dataset2,dataset1)
    
    });

    d3.select("#year")
    .on("click", function() {

        dataset = [];  						 				//Initialize empty array
        update_graph(dataset)
        
    
    });
