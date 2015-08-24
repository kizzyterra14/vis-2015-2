var color = d3.scale.ordinal()
      .domain(["Sylvia", "David", "Max"])
      .range(["#CFB238", "#6F4587" , "#AA2207"]);

var canvas = d3.select("#d3vis").append("svg")
    .attr("width",850)
    .attr("height",500);

d3.json("mydata.json",function(data){

  var treemap = d3.layout.treemap()
      .size([850,500])
      .nodes(data)

  var cells = canvas.selectAll(".cell")
      .data(treemap)
      .enter()
      .append("g")
      .attr("class","cell")

  cells.append("rect")
      .attr("x", function(d){ return d.x;})
      .attr("y", function(d){ return d.y;})
      .attr("width", function(d){ return d.dx;})
      .attr("height", function(d){ return d.dy;})
      .attr("fill", function(d){ return d.children ? null : color(d.parent.name);})
      .attr("stroke-width",2)
      .attr("stroke","#c6c6ba")

    cells.append("text")
        .attr("x", function(d){ return d.x + d.x/2})
        .attr("y", function(d){ return d.y + d.y/2})
        .attr("text-anchor", "middle")
        .text(function(d){ return d.children ? null : d.name;})

        console.log(treemap);

})
