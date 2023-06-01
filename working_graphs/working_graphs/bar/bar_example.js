function main() {
	var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Net overseas migrations to Australia from 1971-2020");

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]),
        ad_yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("net_migration_overseas_new_v2.csv").then( function(data) {
        xScale.domain(data.map(function(d) { return d.Year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.Adjusted_data; })]);
        ad_yScale.domain([0, d3.max(data, function(d) { return d.Migrantdata; })]);
        console.log(data)
//x axis
        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
		 .selectAll("text")	
         .style("text-anchor", "end")
         .attr("dx", "-.8em")
         .attr("dy", ".15em")
         .attr("transform", "rotate(-65)");         

         
//y axies
        g.append("g")
     .call(d3.axisLeft(yScale).ticks(0))
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 10)
	 .attr('dy', '-5em')
	 .attr('text-anchor', 'end')
	 .attr('stroke', 'black')
	 //needs to be fixed
	 .text('');

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
	 .on("mouseover", onMouseOver) // Add listener for event
	 .on("mouseout", onMouseOut)
         .attr("x", function(d) { return xScale(d.Year); })
         .attr("y", function(d) { return yScale(d.Adjusted_data); })
         .attr("width", xScale.bandwidth())
	 .transition()
	 .ease(d3.easeLinear)
	 .duration(500)
	 .delay(function(d,i){ return i * 50})
         .attr("height", function(d) { return height - yScale(d.Adjusted_data); });
	})
       
	// Mouseover event handler

	function onMouseOver(d, i) {
		// Get bar's xy values, ,then augment for the tooltip
		var xPos = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
		var yPos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

		// Update Tooltip's position and value
		d3.select('#tooltip')
		    .style('left', xPos + 'px')
		    .style('top', yPos + 'px')
			.select('#value').text(i.Migrantdata)
		
		d3.select('#tooltip').classed('hidden', false);


		d3.select(this).attr('class','highlight')
		d3.select(this)
			.transition() // I want to add animnation here
			.duration(500)
			.attr('width', xScale.bandwidth() + 5)
			.attr('y', function(d){return yScale(d.Adjusted_data) - 10;})
			.attr('height', function(d){return height - yScale(d.Adjusted_data) + 10;})

	}

	// Mouseout event handler
	function onMouseOut(d, i){
		d3.select(this).attr('class','bar')
		d3.select(this)
			.transition()
			.duration(500)
			.attr('width', xScale.bandwidth())
			.attr('y', function(d){return yScale(d.Adjusted_data);})
			.attr('height', function(d) {return height - yScale(d.Adjusted_data)})
		
		d3.select('#tooltip').classed('hidden', true);
	}
    //Code from https://github.com/markumreed/data_science_for_everyone/tree/main/d3_project
}