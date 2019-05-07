
function eqtl_plot(data_gen, tissue_name, id) {

	//data_gen = [[5, 3], [10, 17], [15, 22], [25, 28]];

	//clean
	d3.select(id).selectAll("*").remove();
	// d3.select("#eqtl_graph_data").selectAll("*").remove();

	//var x_labels = ["", data_gen.x_labels[0][1], data_gen.x_labels[1][1]];
	var x_labels = ["C/C", "C/T", "T/T"];
	//var gene_name = "MAPT";
	var snp_name = "chr" + data_gen.snp;
	//var snp_name = "chr1:754182";

	var margin = {
		top : 40,
		right : 50,
		bottom : 80,
		left : 50
	},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	//margin of the graph
	var delta_x = (d3.max(data_gen.values, function (d) {
			return d[0];
		}) - d3.min(data_gen.values, function (d) {
			return d[0];
		})) / 10;
	var delta_y = (d3.max(data_gen.values, function (d) {
			return d[1];
		}) - d3.min(data_gen.values, function (d) {
			return d[1];
		})) / 10;

	//Create the line
	var line_to_draw = [[0, (data_gen.line[1] * 1 + data_gen.line[0])], [2, (data_gen.line[1] * 2 + data_gen.line[0])]];

	//x axis domain
	/*var x = d3.scale.linear()
	.domain([
	d3.min(data_gen.values, function (d) {
	return d[0];
	}) - delta_x,
	d3.max(data_gen.values, function (d) {
	return d[0];
	}) + delta_x
	]).range([0, width]);*/

	//x axis domain
	var x = d3.scale.linear()
		.domain([
				-0.1, 2.1
			]).range([0, width]);

	//y axis domain
	var y = d3.scale.linear()
		.domain([
				d3.min(data_gen.values, function (d) {
					return d[1];
				}) - delta_y,
				d3.max(data_gen.values, function (d) {
					return d[1];
				}) + delta_y
			]).range([height, 0]);

	// Define the line
	var valueline = d3.svg.line()
		.x(function (d) {
			return x(d[0]);
		})
		.y(function (d) {
			return y(d[1]);
		})
		.interpolate("linear");

	var chart = d3.select(id)
		.append('svg:svg')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.attr('class', 'chart')

		var main = chart.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'main');

	// draw the x axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.tickValues([0, 1, 2])
		.tickFormat(function (d) {
			return x_labels[d];
		})
		.orient('bottom');

	//CHART TITLE - GENE NAME
	main.append("text")
	.attr("x", (width / 2))
	.attr("y", -10)
	.attr("text-anchor", "middle")
	.style("font-size", "24px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text("gene: " + data_gen.gene_name);

	//CHART suntittle - SNP
	main.append("text")
	.attr("x", (width / 2))
	.attr("y", 10)
	.attr("text-anchor", "middle")
	.style("font-size", "15px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text("(" + snp_name + ")");

	//CHART suntittle - SNP
	main.append("text")
	.attr("x", (width / 2))
	.attr("y", height + 45)
	.attr("text-anchor", "middle")
	.style("font-size", "15px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text(tissue_name);

	//CHART suntittle - SNP
	main.append("text")
	.attr("x", (width / 2))
	.attr("y", height + 65)
	.attr("text-anchor", "middle")
	.style("font-size", "15px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text("pvalue: " + data_gen.pvalue.toExponential());

	//rotation adn trnalsation vers
	main.append("svg")
	.attr("x", -50)
	.attr("y",  - (height / 2))
	.append("g")
	.attr("transform", "translate(13,360) rotate(-90)")
	.append('text')
	.style("font-size", "15px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text('Expression');

	main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date axis_x_scatter_plot')
	.call(xAxis);

	// draw the y axis
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');

	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date axis_scatter_plot')
	.call(yAxis);

	var g = main.append("svg:g");

	g.selectAll("scatter-dots")
	.data(data_gen.values)
	.enter().append("svg:circle")
	.attr("cx", function (d, i) {
		return x(d[0]);
	})
	.attr("cy", function (d) {
		return y(d[1]);
	})
	.attr("r", 5)
	.style("stroke", "steelblue")
	.style("fill", "green")
	.style("fill-opacity", 0.2);

	// Add the valueline path.
	main.append("path")
	.attr("class", "line")
	.attr("d", valueline(line_to_draw)).style("stroke-width", 0.5)
	.style("stroke", "steelblue")
	.style("fill", "none");

}
//id_info = id_gene
//id_data = id_box

function eqtl_plot_all(data_gen, tissue_name, id_data, gene_name, snp_name, eqtl_graph) {

	var triplets = 0;

	//how many tissues?
	// console.log(Object.keys(data_gen).length);
	var data_gen_length = Object.keys(data_gen).length;

	//INDEXING THE .JSON
	var index = [];
	// build the index
	for (var x in data_gen) {
		index.push(x);
	}
	// sort the index
	index.sort(function (a, b) {
		return a == b ? 0 : (a > b ? 1 : -1);
	});
	

	var whisker_data = [];
	var tissues_name = [];
	var gene_pvalue = [];
	var length_values;
	//split the values CC/CT/TT
	for (var i = 0; i < data_gen_length; i++) {
		length_values = data_gen[index[i]].values.length;
		var cc = [];
		var ct = [];
		var tt = [];
		//tissues
		tissues_name.push(data_gen[index[i]].tissue);
		//pvalue
		gene_pvalue.push(data_gen[index[i]].pvalue);

		for (var j = 0; j < length_values; j++) {
			if (data_gen[index[i]].values[j][0] == 0) {
				cc.push(data_gen[index[i]].values[j][1]);
			} else if (data_gen[index[i]].values[j][0] == 1) {
				ct.push(data_gen[index[i]].values[j][1]);

			} else if (data_gen[index[i]].values[j][0] == 2) {
				tt.push(data_gen[index[i]].values[j][1]);

			}
		}
		if (cc.length == 0)
			cc = [0];
		if (ct.length == 0)
			ct = [0];
		if (tt.length == 0)
			tt = [0];

		whisker_data.push(cc);
		whisker_data.push(ct);
		whisker_data.push(tt);

		//console.log(JSON.parse(tt));

		// console.log(whisker_data);
		//console.log(JSON.parse(whisker_data));
	}

	//PLOT
	//clean
	
	d3.select(id_data).selectAll("*").remove();
	
	if(eqtl_graph)
	{
		d3.select("#scatter_plot").selectAll("*").remove();
		$("#eqtl_graph_gene").html("");
	}

	var margin = {
		top : 25,
		right : 35,
		bottom : 20,
		left : 35
	},
	width = 85 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;
	width_svg = Object.keys(data_gen).length * 250;
	
	var min = Infinity,
	max = -Infinity;

	// //for tissues names under the boxplots
	// var tissue = 0;

	
	var chart = d3.select(id_data)
		.append('svg:svg')
		.attr('width', width_svg)
		.attr('height', 610);
		
		var main = chart.append('g')
		.attr("transform", "translate("+margin.left+","+50+")");
		
		
	// //title
	main.append("text")
	.attr("x", (width_svg / 2)) 
	.attr("y", -10)
	.attr("text-anchor", "middle")
	.style("font-size", "23px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text("name: "+gene_name);
	
	main.append("text")
	.attr("x", (width_svg / 2) )
	.attr("y", 5)
	.attr("text-anchor", "middle")
	.style("font-size", "13px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text("("+snp_name+")");
	
	//tissue / snp label
	main.append("text")
		.attr("x", 0 )
		.attr("y", 530)
		.attr("text-anchor", "middle")
		.style("font-size", "14px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text("tissue");
		
		main.append("text")
		.attr("x", 0 )
		.attr("y", 550)
		.attr("text-anchor", "middle")
		.style("font-size", "14px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text("pvalue");

	var tissues_name_index = 0;
	var tissues_name_x = [130,360,590];
	tissues_name.forEach(function()
	{
		main.append("text")
		.attr("x", tissues_name_x[tissues_name_index] )
		.attr("y", 530)
		.attr("text-anchor", "middle")
		.style("font-size", "14px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text(tissues_name[tissues_name_index]);
		
		main.append("text")
		.attr("x", tissues_name_x[tissues_name_index] )
		.attr("y", 550)
		.attr("text-anchor", "middle")
		.style("font-size", "14px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text(gene_pvalue[tissues_name_index].toFixed(3));
		tissues_name_index++;
	});
	
	var chart_eqtl = d3.box()
		.whiskers(iqr(1.5))
		.width(width)
		.height(height);

	var data = [];
	var data_index = 0;

	// //read the json and assign values to the box plot (max-min)
	whisker_data.forEach(function (x) {
		var e = data_index;
		x.forEach(function (z) {
			var s = z;
			d = data[e];
			if (!d)
				d = data[e] = [s];
			else
				d.push(s);
			if (s > max)
				max = s;
			if (s < min)
				min = s;
		});
		data_index++;
	});

	chart_eqtl.domain([min, max]);
	// console.log(data);
	

	//rotation adn trnalsation vers
	main.append("g")
		.attr("width", 25)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(0,360) rotate(-90)")
		.append('text')
		.text('Expression level in log2 scale')
		.style("font-size", "14px")
		.attr("font-family", "Verdana, Arial, sans-serif");

	// //Y axys
	// //Y axys value
	var y = d3.scale.linear()
		.domain([min, max])
		.range([height, 0]);

	main.append("g")
		.attr("width", width + 30)
		.attr("height", height + margin.top)
		.append("g")
		.attr("transform", "translate(40,25)")
		.attr("class", "axis")
		.call(d3.svg.axis()
			.scale(y)
			.orient('left')
			.ticks(15)
			.tickFormat(d3.formatPrefix(".1", 1e6)));

	// .attr("x", (width / 2))
	var x_label = ["C/C", "C/T", "T/T"];
	var x_label_index = -1;
	
		var n_box = 0;
		var translate_blox = 40;
	// //Y axys
	// //configure the box plots
	main.selectAll("svg")
		.data(data)
		.enter().append("svg")
		.attr("width", width_svg)
		.attr("height", 610)
		.append("g")
		.attr("transform", function()
		{
			if(n_box % 3 == 0 && n_box != 0)
			{
				translate_blox += 150;
			}
			else
			{
				translate_blox += 40;
			}
			n_box++;
			return "translate(" + translate_blox + "," + margin.top + ")";
		})
		.call(chart_eqtl)
		.append("text")
		.attr("transform", "translate(0,480)")
		.text(function(){
			x_label_index++;
			if(x_label_index == 3)
				x_label_index = 0;
			return x_label[x_label_index];
			})
		.style("font-size", "10px")
		.attr("font-family", "Verdana, Arial, sans-serif");
		
		var datac = ["PUTM", "SNIG"];
		
		d3.select("#eqtl_graph_all_x_axis").append("text")
		.attr("x", width - 6)
		.attr("y", height + 50)
	.style("font-size", "18px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text( function (d) { return datac[0] + "      " + datac[1]; });
		
	

	
	//apply inline style
	d3.select(id_data).selectAll("line")
	.style({
		"fill" : "#fff",
		"stroke" : "#000",
		"stroke-width" : "1.0px"
	});

	d3.select(id_data).selectAll(".center")
	.style({
		"stroke-dasharray" : "3,3"
	});

	d3.select(id_data).selectAll("rect")
	.style({
		"fill" : "#fff",
		"stroke" : "#000",
		"stroke-width" : "1.5px"
	});

	d3.select(id_data).selectAll("circle")
	.style({
		"fill" : "#fff",
		"stroke" : "#000",
		"stroke-width" : "1.5px"
	});

	d3.select(id_data).selectAll(".outlier")
	.style({
		"fill" : "none",
		"stroke" : "#D3D3D3"
	});

	// d3.select(id_info).selectAll("text")
	// .style({
		// "font" : "10px sans-serif"
	// });

	// d3.select(id_data).selectAll("text")
	// .style({
		// "font" : "10px sans-serif"
	// });

	d3.select(id_data).selectAll(".tissue_name")
	.style({
		"text-anchor" : "middle",
		"font-size" : "12px",
		"font-weight" : "bold",
		"text-anchor" : "middle"
	});
	
	// var box_plots = svg.selectAll(".tissue_name");
	// box_plots.forEach(function (text) {
		// text.parentNode.innerHTML = x_label[x_label_index];
		// x_label_index++;
		// if (x_label_index == 3)
			// x_label_index = 0;
	// });
	
	// setInterval(function() {
	// svg.datum(randomize).call(chart.duration(1000));
	// }, 2000);
	//return chart;

}

function ase_plot(data_gen, snp_name, id) {
	
	//clean
	d3.select(id).selectAll("*").remove();
	// d3.select("#eqtl_graph_data").selectAll("*").remove();
	//if no data
	if(data_gen.results.length == 0)
		return;
	
	var valid_data = false;
	var mensaje = "";
	
	for (var i = 2, len = data_gen.results[0][12].length; i < len; i++)
	{
		mensaje = mensaje + data_gen.results[0][12][i];
	}
	if(data_gen.results[0][12].charAt(0) == '0')
		valid_data = true;
	// console.log(mensaje);

	//var x_labels = ["", data_gen.x_labels[0][1], data_gen.x_labels[1][1]];
	var x_labels = [data_gen.results[0][1], data_gen.results[0][2]];
	//var gene_name = "MAPT";
	//var snp_name = "chr1:754182";

	var margin = {
		top : 100,
		right : 50,
		bottom : 80,
		left : 50
	},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;
	
	//split the values
	var each_value_to_plot = data_gen.results[0][13].toString().split(",");
	
	//fill the dots
	var dots_to_draw = [];
	
	for(var i = 0; i < each_value_to_plot.length; i++)
	{
		if(i % 2 != 0)
			dots_to_draw.push([0,each_value_to_plot[i]]);
		else
			dots_to_draw.push([1,each_value_to_plot[i]]);
	}
	
	 console.log(dots_to_draw);

	//x axis domain
	var x = d3.scale.linear()
		.domain([
				-0.5, 1.5
			]).range([0, width]);

	//y axis domain
	var y = d3.scale.linear()
		.domain([
				0.0, 1.0
			]).range([height, 0]);

	// Define the line
	// var valueline = d3.svg.line()
		// .x(function (d) {
			// return x(d[0]);
		// })
		// .y(function (d) {
			// return y(d[1]);
		// })
		// .interpolate("linear");

	var chart = d3.select(id)
		.append('svg:svg')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.attr('class', 'chart')

		var main = chart.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'main');

	// draw the x axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.tickValues([0, 1])
		.tickFormat(function (d) {
			return x_labels[d];
		})
		.orient('bottom');

	if(valid_data)
	{
		//CHART TITLE - GENE NAME
		main.append("text")
		.attr("x", (width / 2))
		.attr("y", -50)
		.attr("text-anchor", "middle")
		.style("font-size", "15px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text(snp_name + ", " + data_gen.results[0][4] + ", " + data_gen.results[0][10]);
		
		main.append("text")
		.attr("x", (width / 2))
		.attr("y", -33)
		.attr("text-anchor", "middle")
		.style("font-size", "15px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text(mensaje); 
		
		main.append("text")
		.attr("x", (width / 2))
		.attr("y", -17)
		.attr("text-anchor", "middle")
		.style("font-size", "15px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text("Minimum FDR across the samples: " + data_gen.results[0][9]);
	}
	else
	{
		//CHART TITLE - GENE NAME
		main.append("text")
		.attr("x", (width / 2))
		.attr("y", (height / 2))
		.attr("text-anchor", "middle")
		.style("font-size", "15px")
		.attr("font-family", "Verdana, Arial, sans-serif")
		.text(mensaje);
	}

	// //CHART suntittle - SNP
	// main.append("text")
	// .attr("x", (width / 2))
	// .attr("y", 10)
	// .attr("text-anchor", "middle")
	// .style("font-size", "15px")
	// .attr("font-family", "Verdana, Arial, sans-serif")
	// .text("(" + snp_name + ")");

	//CHART suntittle - SNP
	main.append("text")
	.attr("x", (width / 2))
	.attr("y", height + 45)
	.attr("text-anchor", "middle")
	.style("font-size", "15px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text("Allele");

	// //CHART suntittle - SNP
	// main.append("text")
	// .attr("x", (width / 2))
	// .attr("y", height + 65)
	// .attr("text-anchor", "middle")
	// .style("font-size", "15px")
	// .attr("font-family", "Verdana, Arial, sans-serif")
	// .text("pvalue: " + data_gen.pvalue.toExponential());

	//rotation adn trnalsation vers
	main.append("svg")
	.attr("x", -50)
	.attr("y",  - 100)
	.append("g")
	.attr("transform", "translate(13,360) rotate(-90)")
	.append('text')
	.style("font-size", "15px")
	.attr("font-family", "Verdana, Arial, sans-serif")
	.text('Proportion of allelic counts');

	main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date axis_x_scatter_plot')
	.call(xAxis);

	// draw the y axis
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');

	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date axis_scatter_plot')
	.call(yAxis);

	if(valid_data)
	{
		var g = main.append("svg:g");

		g.selectAll("scatter-dots")
		.data(dots_to_draw)
		.enter().append("svg:circle")
		.attr("cx", function (d) {
			return x(d[0]);
		})
		.attr("cy", function (d) {
			return y(d[1]);
		})
		.attr("r", 5)
		.style("stroke", "steelblue")
		.style("fill", function (d) {
			if(d[0] == 0)
				return "red";
			else
				return "cyan";
		})
		.style("fill-opacity", 0.2);
	}

	// // Add the valueline path.
	// main.append("path")
	// .attr("class", "line")
	// .attr("d", valueline(line_to_draw)).style("stroke-width", 0.5)
	// .style("stroke", "steelblue")
	// .style("fill", "none");

}

// Returns a function to compute the interquartile range.
function iqr(k) {
	return function (d, i) {
		var q1 = d.quartiles[0],
		q3 = d.quartiles[2],
		iqr = (q3 - q1) * k,
		i = -1,
		j = d.length;
		while (d[++i] < q1 - iqr);
		while (d[--j] > q3 + iqr);
		return [i, j];
	};
}