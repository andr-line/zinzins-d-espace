//Width and height
const w = 600;
const h = 250;

var xScale;
var yScale;

var dataset = [];
var body=d3.select("body");
d3.csv("../data/PSCompPars_2023.04.25_07.07.02.csv")
//Create SVG element
const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

function update_graph(new_data) {

    //Work with bars
    svg.selectAll("rect")
    .data(new_data)
    .join((enter) => enter.append("rect")
                        .attr("x", (d, i) => xScale(i))
                        .attr("y", (d) => h - yScale(d))
                        .attr("width", xScale.bandwidth())
                        .attr("height", (d) => yScale(d))
                        .attr("fill", (d) => "rgb(0, 0, " + (d * 10) + ")"),
          (update) => update.transition()
                        .duration(1000)
                        .attr("y", (d) => h - yScale(d))
                        .attr("height", (d) => yScale(d))
                        .attr("fill", (d) => "rgb(0," + (d * 10) + ", 0"),
          (exit) => exit.transition()
                          .duration(1000)
                        .attr("y",h)
                        .remove()
    )

    //Work with labels
    svg.selectAll("text")
    .data(new_data)
    .join((enter) => enter.append("text")
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

        //New values for dataset
        const numValues = 20;						
        dataset = [];  						 				//Initialize empty array
        for (var i = 0; i < numValues; i++) {				//Loop numValues times
            var newNumber = Math.floor(Math.random() * 20 + 5); //New random integer (0-25)
            dataset.push(newNumber);			 			//Add new number to array
        }

        xScale = d3.scaleBand()
                        .domain(d3.range(dataset.length))
                        .padding(.05)
                        .range([0, w]);

        yScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset)])
                        .range([0, h]);

        //Update all rects
        update_graph(dataset)
    
    });

    d3.select("#delete")
    .on("click", function() {

        dataset = [];  						 				//Initialize empty array
        update_graph(dataset)
    
    });
