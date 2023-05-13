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
		var arc = g.selectAll('.arc')
		.data(pie(data))
		.enter().append('g')
		.attr('class', 'arc');
        
		arc.append('path')
			.attr('d', path)
			.attr('fill', function(d){return color(d.data.city)});

		arc.append('text')
			.attr('transform', function(d){return 'translate(' + label.centroid(d) + ')';})
			.text(function(d){return d.data.Net_overseas_migration_percent + "%"});
            
		svg.append('g')
			.attr('transform', 'translate(' + (width / 2 - 120) + ',' + 20 + ')')
			.append('text')
            //text for title
			.text('Net migrations from overseas')
			.attr('class', 'title');
		}
	);
    //Code from https://github.com/markumreed/data_science_for_everyone/tree/main/d3_project
}