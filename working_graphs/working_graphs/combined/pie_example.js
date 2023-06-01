function main() {
	// d3 code goes here
	var svg = d3.select('svg'),
	width = svg.attr('width'),
	height = svg.attr('height'),
	radius = Math.min(width, height) / 2;
	
	var g = svg.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
	var color = d3.scaleOrdinal(['#C7CEEA','#B5EAD7','#FFDAC1', '#FF9AA2', '#42eff5', '#42f554', '#4254f5', '#f542e6' ]);
	var pie = d3.pie().value(function(d){
		return d.Net_overseas_migration_percent
	})
	var path = d3.arc()
			.outerRadius(radius - 40)
			.innerRadius(100);
	var label = d3.arc()
			.outerRadius(radius)
			.innerRadius(radius - 150);

	d3.csv('net_migration_capital_city_new_v2.csv').then(	
		function(data){
    console.log(data)
		var arc = g.selectAll('g.arc')
		.data(pie(data))
		.enter().append('g')
		.attr('class', 'arc')
		//when mouse hovers over segment displays tooltip
		.on("mouseover", function (data, d) {

			var xPos = parseFloat(d3.select(this).attr('x')) + width / 2 ;
			var yPos = parseFloat(d3.select(this).attr('y')) + 14 ;
	
			d3.select('#tooltip_pie')
			  .style('left', xPos + 'px')
			  .style('top', yPos + 'px')
			  .select('#pie_value')
			  .text(d.data.Net_overseas_migration_percent + "%");
			  
				
				
			d3.select('#tooltip_pie').classed('hidden', false);
	
		})
        //removes tooltip
		.on("mouseout", function () {
			d3.select('#tooltip_pie').classed('hidden', true);
				
		});


		arc.append('path')
			.attr('d', path)
			.attr('fill', function(d){return color(d.data.city)});

		

			
            
		svg.append('g')
			.attr('transform', 'translate(' + (width / 2 - 250) + ',' + 20 + ')')
			.append('text')
            //text for title
			.text('Net overseas migration by capital city (Ending in year 2020)')
			.attr('class', 'title');

		    
		}
		);

	
	
    //Code from https://github.com/markumreed/data_science_for_everyone/tree/main/d3_project
}