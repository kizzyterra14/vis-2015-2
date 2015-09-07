var color = d3.scale.ordinal()
      .domain(["Sylvia", "David", "Max"])
      .range(["#CFB238", "#6F4587" , "#AA2207"]);
var width = 860;
var height = 550;

var canvas = d3.select("#d3vis").append("svg")
    .attr("width",width)
    .attr("height",height);


var tooltip = d3.select("#d3vis").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var defs = canvas.append("defs");
var filter = defs.append("svg:filter")
    .attr("id", "outerDropShadow")
    .attr("x", "-25%")
    .attr("y", "-25%")
    .attr("width", "140%")
    .attr("height", "140%");
filter.append("svg:feOffset")
    .attr("result", "offOut")
    .attr("in", "SourceGraphic")
    .attr("dx", "1")
    .attr("dy", "1");
filter.append("svg:feColorMatrix")
    .attr("result", "matrixOut")
    .attr("in", "offOut")
    .attr("type", "matrix")
    .attr("values", "0.5 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 .5 0");
filter.append("svg:feBlend")
    .attr("in", "SourceGraphic")
    .attr("mode", "normal");


d3.json("static/lib/mydata.json",function(data){

  var treemap = d3.layout.treemap()
      .size([width,height])
      .nodes(data)


  var cells = canvas.selectAll(".cell")
      .data(treemap)
      .enter()
      .append("g")
      .attr("class","cell")
      .style("z-index", "10")
      .on("mouseover", function() {
                d3.select(this)
                    .attr("filter", "url(#outerDropShadow)")
                    .select(".background")
                    .style("stroke", "#000000");

                tooltip.transition()
                  .duration(10)
                  .style("opacity", .9);
                tooltip.html("26/06/1992" + "<br/>" )
                  .style("left", (d3.event.pageX-250) + "px")
                  .style("top", (d3.event.pageY-210) + "px");
                d3.select("tooltip").classed("hidden", false);
            })
            .on("mousemove", function() {
              tooltip.transition()
                .duration(10)
                .style("opacity", .9);
              tooltip.html("<strong>Buffy</strong> <br/>"+ "1200 notícias" )
                .style("left", (d3.event.pageX-250) + "px")
                .style("top", (d3.event.pageY-210) + "px");

                })
        .on("mouseout", function() {
                d3.select(this)
                    .attr("filter", "")
                    .select(".background")
                    .style("stroke", "#FFFFFF");
              return tooltip.style("opacity", "0");
            });

  cells.append("rect")
      .attr("x", function(d){ return d.x;})
      .attr("y", function(d){ return d.y;})
      .attr("width", function(d){ return d.dx;})
      .attr("height", function(d){ return d.dy;})
      .attr("fill", function(d){ return d.children ? null : color(d.parent.name);})
      .attr("stroke-width",1)
      .attr("stroke","#000000")

      cells.append("text")
          .attr("x", function(d){ return d.x+20;})
          .attr("y", function(d){ return d.y + d.dy-15;})
          .text(function(d){ return d.children ? null : d.name;})
          .style("font-size", "35px")
          .style("font-family", "Helvetica")
          .style("font-weight", "300")
          .style("fill", "#ffffff")

        console.log(treemap);

})
