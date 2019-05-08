// var keyc = true,
// keys = true,
// keyt = true,
// keyr = true,
// keyx = true,
// keyd = true,
// keyl = true,
// keym = true,
// keyh = true,
// key1 = true,
// key2 = true,
// key3 = true,
// key0 = true;
function net_plot(data_network_temp) {

	var data_network_raw = data_network_temp;
	var w = 800;
	var h = 600;
	var multi_node = 20;
	var focus_node = null,
	highlight_node = null;

	var text_center = false;
	var outline = false;

	var min_score = 0;
	var max_score = 1;

	var color = d3.scale.linear()
		.domain([min_score, (min_score + max_score) / 2, max_score])
		.range(["lime", "yellow", "red"]);

	var highlight_color = "#18ff03";
	var highlight_trans = 0.1;

	var size = d3.scale.pow().exponent(1)
		.domain([1, 100])
		.range([8, 24]);

	var min_treshold_value = 10;
	var max_treshold_value = -1;

	var default_node_color = "#ccc";
	//var default_node_color = "rgb(3,190,100)";
	var default_link_color = "#7C7C7C";
	//var nominal_base_node_size = 6;
	//var nominal_text_size = 6;
	//var max_text_size = 10;
	//var nominal_stroke = 1;
	//var max_stroke = 0.5;
 //   var max_base_node_size = 8;
    var nominal_base_node_size = 8;//6
    var max_base_node_size = 18;//8

    var nominal_text_size = 10;//6
    var max_text_size = 14;//10
    var nominal_stroke = 1;//1
    var max_stroke = 15;
    
	var min_zoom = 0.1;
	var max_zoom = 7;
	var svg = d3.select("#network_plot").append("svg");
    var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
        .on("zoom", function () {

            stroke = nominal_stroke;
            if (nominal_stroke * zoom.scale() > max_stroke)
                stroke = max_stroke / zoom.scale();
            // .style("stroke-width", function (d) {
            // return (((d.value - min_link_value) / (max_link_value - min_link_value)) * stroke);
            // });
            circle.style("stroke-width", stroke);
            // console.log(zoom.scale());
            // val_new = max_link_value / zoom.scale();
            // link.style("stroke-width", function (d) {
            // //console.log(link.style("stroke-width"));
            // return parseFloat(link.style("stroke-width")) * val_new;
            // });


            //console.log(parseInt(link.style("stroke-width")) * 2);

            var base_radius = nominal_base_node_size;
            if (nominal_base_node_size * zoom.scale() > max_base_node_size)
                base_radius = max_base_node_size / zoom.scale();
            circle.attr("d", d3.svg.symbol()
                .size(function (d) {
                    return (((d.score - min_node_value) / (max_node_value - min_node_value) + 1) * multi_node);
                })
                .type(function (d) {
                    return d.type;
                }))

            //circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
            if (!text_center)
                text.attr("dx", function (d) {
                    return (size(d.size) * base_radius / nominal_base_node_size || base_radius);
                });

            var text_size = nominal_text_size;
            if (nominal_text_size * zoom.scale() > max_text_size)
                text_size = max_text_size / zoom.scale();
            text.style("font-size", text_size + "px");

            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        });
    svg.call(zoom);

    var g = svg.append("g");
    svg.style("cursor", "move");


	//From the .json coming from the server, 3 values of each object is NAN
	var number_of_NAN = 3;
	var links_value_treshold = 0;
	var stroke = nominal_stroke;

	var layer1 = g.append('g');
	var layer2 = g.append('g');

	//creating the .json
	//var number_of_genes = parseInt($("#network_number_of_genes").val());
	//lenght of the data
	//console.log(Object.keys(data_network_raw.results).length);
    var number_of_genes = parseInt($('#text_box_name').val());
	/*if (parseInt($("#slider_number_to_display").slider("value")) <= Object.keys(data_network_raw.results).length)
		number_of_genes = parseInt($("#slider_number_to_display").slider("value"));
	else
		number_of_genes = Object.keys(data_network_raw.results).length;*/

	//set the size
	var size_of_genes = [];
	var acum_value = 0;
	for (var i = 0; i < number_of_genes; i++) {
		for (var j = number_of_NAN; j < number_of_genes + number_of_NAN; j++) {
			acum_value += data_network_raw.results[i][j];
		}
		size_of_genes.push(acum_value);
		acum_value = 0;
	}

	var nodes = '{"nodes" : [';
	// number_of_genes - 1 : to set the last one without comma
	for (var i = 0; i < number_of_genes - 1; i++) {
		nodes += '{"id" : "' + data_network_raw.results[i][0] + '", "id_node" : "node_' + i + '", "score" : ' + (size_of_genes[i] + 5) + ', "module": "' + data_network_raw.results[i][2] + '", "type": "circle"},';
	}
	nodes += '{"id" : "' + data_network_raw.results[number_of_genes - 1][0] + '", "id_node" : "node_' + (number_of_genes - 1) + '", "score" : ' + size_of_genes[number_of_genes - 1] + ', "module": "' + data_network_raw.results[number_of_genes - 1][2] + '", "type": "circle"}],';

	var start_storing;
	var links = '"links" : [';
	for (var i = 0; i < number_of_genes; i++) {
		start_storing = false;
		for (var j = 0; j < number_of_genes + number_of_NAN; j++) {
			if (start_storing) {

				if (data_network_raw.results[i][j] < min_treshold_value)
					min_treshold_value = data_network_raw.results[i][j];

				if (data_network_raw.results[i][j] > max_treshold_value)
					max_treshold_value = data_network_raw.results[i][j];

				if (data_network_raw.results[i][j] > links_value_treshold)
					links += '{"source":' + i + ',"target":' + (j - number_of_NAN) + ',"value":' + data_network_raw.results[i][j] + '},';
			}
			if (data_network_raw.results[i][j] == 1) {
				start_storing = true;
			}
		}
	}
	links = links.substring(0, links.length - 1);
	links += ']}';

	console.log(min_treshold_value);
	console.log(max_treshold_value);

	var data_network = nodes + links;

	console.log(data_network);
	data_network = JSON.parse(data_network);
	console.log(data_network);

	//max link value
	var max_link_value = d3.max(data_network.links, function (d) {
			return d.value;
		});
	//min link value
	var min_link_value = d3.min(data_network.links, function (d) {
			return d.value;
		});

	console.log(max_link_value);
	console.log(min_link_value);

	//max node value
	var max_node_value = d3.max(data_network.nodes, function (d) {
			return d.score;
		});
	//min node value
	var min_node_value = d3.min(data_network.nodes, function (d) {
			return d.score;
		});

	var min_treshold_value_temp = min_treshold_value - parseFloat((min_treshold_value.toString().substring(0, min_treshold_value.toString().length - 5)));

	//set teh values for the treshold
	/*$('#slider-range-treshold').slider("option", "min", min_treshold_value - min_treshold_value_temp);
	$('#slider-range-treshold').slider("option", "value", min_treshold_value - min_treshold_value_temp);
	$('#slider-range-treshold').slider("option", "max", max_treshold_value);
	$("#treshold_network").val($("#slider-range-treshold").slider("value"));*/

	var linkedByIndex = {};
	data_network.links.forEach(function (d) {
		linkedByIndex[d.source + "," + d.target] = true;
	});

	function isConnected(a, b) {
		return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
	}

	function hasConnections(a) {
		for (var property in linkedByIndex) {
			s = property.split(",");
			if ((s[0] == a.index || s[1] == a.index) && linkedByIndex[property])
				return true;
		}
		return false;
	}

	var value_distance;
	var value_strenght;

	var force = d3.layout.force()
		.charge(-300)
		.linkDistance(function (d) {

			if (max_link_value != min_link_value) {
				value_distance = (1 - (((d.value - min_link_value) / (max_link_value - min_link_value)) + 0.1)) * 100;
				//console.log((d.value - min_link_value) / (max_link_value - min_link_value));
			} else
				value_distance = 60;

			return value_distance;
			//return (1 / d.value) * 10;
		})
		.size([w, h]);

	force
	.nodes(data_network.nodes)
	.links(data_network.links)
	.start();

	var link = layer1.selectAll(".link")
		.data(data_network.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function (d) {
			return ((d.value - min_link_value) / (max_link_value - min_link_value) + 0.2) / 2;
		})
		.style("stroke", default_link_color);

	var node = layer2.selectAll(".node")
		.data(data_network.nodes)
		.enter().append("g")
		.attr("class", "node")
		.attr("id", function (d) {
			return d.id_node;
		})
		.style("visibility", "visible")
		.call(force.drag);

	var tocolor = "fill";
	var towhite = "stroke";
	if (outline) {
		tocolor = "stroke"
			towhite = "fill"
	}

	var circle = node.append("path")

		.attr("d", d3.svg.symbol()
			.size(function (d) {
				return (((d.score - min_node_value) / (max_node_value - min_node_value) + 1) * multi_node);
			})
			.type(function (d) {
				return d.type;
			}))

		.style(tocolor, function (d) {
			if (isNumber(d.score) && d.score >= 0)
				return d.module;
			else
				return default_node_color;
		})
		//.attr("r", function(d) { return size(d.size)||nominal_base_node_size; })
		.style("stroke-width", nominal_stroke)
		.style(towhite, "white");

	var text = layer2.selectAll(".text")
		.data(data_network.nodes)
		.enter().append("text")
		.attr("dy", ".35em")
		.attr("id", function (d) {
			return "text_" + d.id_node;
		})
		.style("font-size", nominal_text_size + "px")
		.style("text-shadow", "-1.5px 0 white, 0 1.5px white, 1.5px 0 white, 0 -1.5px white")

		if (text_center)
			text.text(function (d) {
				return d.id;
			})
			.style("text-anchor", "middle");
		else
			text.attr("dx", function (d) {
				return (size(d.size) || nominal_base_node_size);
			})
			.text(function (d) {
				return '\u2002' + d.id;
			});

		node.on("mouseover", function (d) {
			set_highlight(d);
		})
		.on("mousedown", function (d) {
			d3.event.stopPropagation();
			focus_node = d;
			set_focus(d)
			if (highlight_node === null)
				set_highlight(d)

		}).on("mouseout", function (d) {
			exit_highlight();

		});

	d3.select(window).on("mouseup",
		function () {
		if (focus_node !== null) {
			focus_node = null;
			if (highlight_trans < 1) {

				circle.style("opacity", 1);
				text.style("opacity", 1);
				link.style("opacity", 1);
			}
		}

		if (highlight_node === null)
			exit_highlight();
	});

	function exit_highlight() {
		highlight_node = null;
		if (focus_node === null) {
			svg.style("cursor", "move");
			if (highlight_color != "white") {
				circle.style(towhite, "white");
				text.style("font-weight", "normal");
				link.style("stroke", function (o) {
					return (isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color
				});
			}

		}
	}

	function set_focus(d) {
		if (highlight_trans < 1) {
			circle.style("opacity", function (o) {
				return isConnected(d, o) ? 1 : highlight_trans;
			});

			text.style("opacity", function (o) {
				return isConnected(d, o) ? 1 : highlight_trans;
			});

			link.style("opacity", function (o) {
				return o.source.index == d.index || o.target.index == d.index ? 1 : highlight_trans;
			});
		}
	}

	function set_highlight(d) {
		svg.style("cursor", "pointer");
		if (focus_node !== null)
			d = focus_node;
		highlight_node = d;

		if (highlight_color != "white") {
			circle.style(towhite, function (o) {
				return isConnected(d, o) ? highlight_color : "white";
			});
			text.style("font-weight", function (o) {
				return isConnected(d, o) ? "bold" : "normal";
			});
			link.style("stroke", function (o) {
				return o.source.index == d.index || o.target.index == d.index ? highlight_color : ((isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color);

			});
        }

        /********************* ADD CARD DATA *************************/
        //var url = '/' + environment + '/API/GetInfoFromQuickGO';
        //var term = d.id;
        ////alert("hi")
        //$.ajax({
        //    url: url,
        //    type: 'POST',
        //    data: { term: term },
        //    success: function (data) {
        //        data = JSON.parse(data);
        //        if (data["results"].length > 0) {
        //            //alert("hi")
        //            data = data["results"][0];
        //            var goInfo = "<b>Id: </b> " + data.id
        //                + "<br/><b>Name: </b> " + data.name
        //                + "<br/><b>Aspect: </b> " + data.aspect
        //                + "<br/><b>Definition: </b> " + data.definition.text + "<br/>";

        //            var goTerm = (this.data).split("%3A")[1];

        //            alert(goTerm + " " + goInfo);
        //            //$("a[id*='" + goTerm + "']").focus();

        //        }

        //    },
        //    error: function () {
        //        return "No results found!";
        //    }
        //});
	}

	var hiding_nodes = false;
	var current_node = 0;
	var esta_solo;

	$("#hide_nodes").change(function () {
		$("#hide_nodes").checkboxradio("refresh");
		hiding_nodes = !hiding_nodes;
		if (hiding_nodes) {
			//console.log(Object.keys(data_network.links).length);
			current_node = 0;
			for (var i = 0; i <= Object.keys(data_network.nodes).length; i++) {
				esta_solo = true;
				data_network.links.forEach(function (d) {
					//console.log("source: " + d.source.index + " -  target: " + d.target.index + " == " + current_node);

					if (d.source.index == current_node || d.target.index == current_node) {
						esta_solo = false;
						//console.log("entriiiiii");
					}
				});

				if (esta_solo) {
					d3.select("#node_" + current_node).style("visibility", "hidden");
					d3.select("#text_node_" + current_node).style("visibility", "hidden");

				}
				current_node++;
			}
		} else {
			for (var i = 0; i <= Object.keys(data_network.nodes).length; i++) {
				d3.select("#node_" + i).style("visibility", "visible");
				d3.select("#text_node_" + i).style("visibility", "visible");
			}
		}

		//node.style("visibility", "visible")
	});

	$("#slider-range-treshold").on("slide slidestop", function (event, ui) {

		var start_storing;
		var links = '"links" : [';
		var has_value = false;
		for (var i = 0; i < number_of_genes; i++) {
			start_storing = false;
			for (var j = 0; j < number_of_genes + number_of_NAN; j++) {
				if (start_storing && data_network_raw.results[i][j] > $("#treshold_network").val()) {
					links += '{"source":' + i + ',"target":' + (j - number_of_NAN) + ',"value":' + data_network_raw.results[i][j] + '},';
					has_value = true;
				}
				if (data_network_raw.results[i][j] == 1) {
					start_storing = true;
				}
			}
		}

		if (has_value) {
			links = links.substring(0, links.length - 1);

			links += ']}';
			data_network = nodes + links;

			data_network = JSON.parse(data_network);

			link = layer1.selectAll(".link")
				.data(data_network.links, function (d) {
					return d.source + "-" + d.target;
				});

			//update the connected nodes
			linkedByIndex = {};
			data_network.links.forEach(function (d) {
				linkedByIndex[d.source + "," + d.target] = true;
			});

			link.enter().append("line")
			.attr("class", "link")
			.style("stroke-width", function (d) {
				return ((d.value - min_link_value) / (max_link_value - min_link_value) + 0.2) / 2;
			})
			.style("stroke", default_link_color);

			link.exit().remove();

			force.on("tick", function () {

				node.attr("transform", function (d) {
					return "translate(" + d.x + "," + d.y + ")";
				});
				text.attr("transform", function (d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

				link.attr("x1", function (d) {
					return d.source.x;
				})
				.attr("y1", function (d) {
					return d.source.y;
				})
				.attr("x2", function (d) {
					return d.target.x;
				})
				.attr("y2", function (d) {
					return d.target.y;
				});

				node.attr("cx", function (d) {
					return d.x;
				})
				.attr("cy", function (d) {
					return d.y;
				});
			});

			force
			.links(data_network.links)
			.start();
		}

		//hide not linked
		if (hiding_nodes) {
			//console.log(Object.keys(data_network.links).length);
			current_node = 0;
			for (var i = 0; i <= Object.keys(data_network.nodes).length; i++) {
				esta_solo = true;
				data_network.links.forEach(function (d) {
					//console.log("source: " + d.source.index + " -  target: " + d.target.index + " == " + current_node);

					if (d.source.index == current_node || d.target.index == current_node) {
						esta_solo = false;
						//console.log("entriiiiii");
					}
				});

				if (esta_solo) {
					d3.select("#node_" + current_node).style("visibility", "hidden");
					d3.select("#text_node_" + current_node).style("visibility", "hidden");

				} else {
					d3.select("#node_" + i).style("visibility", "visible");
					d3.select("#text_node_" + i).style("visibility", "visible");
				}

				current_node++;
			}
		}

		//hide not linked

	});

	
    
	

    resize();


    
	//window.focus();
	//d3.select(window).on("resize", resize).on("keydown", keydown);

	force.on("tick", function () {

		node.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		text.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

		link.attr("x1", function (d) {
			return d.source.x;
		})
		.attr("y1", function (d) {
			return d.source.y;
		})
		.attr("x2", function (d) {
			return d.target.x;
		})
		.attr("y2", function (d) {
			return d.target.y;
		});

		node.attr("cx", function (d) {
			return d.x;
		})
		.attr("cy", function (d) {
			return d.y;
		});
	});

	function resize() {
		var width = w, height = h;
		svg.attr("width", width).attr("height", height);

        force.size([force.size()[0] / zoom.scale(), force.size()[1] / zoom.scale()]).resume();  
      
    }

    svg.call(zoom);
    
   
	// function keydown() {
	// if (d3.event.keyCode == 32) {
	// force.stop();
	// } else if (d3.event.keyCode >= 48 && d3.event.keyCode <= 90 && !d3.event.ctrlKey && !d3.event.altKey && !d3.event.metaKey) {
	// switch (String.fromCharCode(d3.event.keyCode)) {
	// case "C":
	// keyc = !keyc;
	// break;
	// case "S":
	// keys = !keys;
	// break;
	// case "T":
	// keyt = !keyt;
	// break;
	// case "R":
	// keyr = !keyr;
	// break;
	// case "X":
	// keyx = !keyx;
	// break;
	// case "D":
	// keyd = !keyd;
	// break;
	// case "L":
	// keyl = !keyl;
	// break;
	// case "M":
	// keym = !keym;
	// break;
	// case "H":
	// keyh = !keyh;
	// break;
	// case "1":
	// key1 = !key1;
	// break;
	// case "2":
	// key2 = !key2;
	// break;
	// case "3":
	// key3 = !key3;
	// break;
	// case "0":
	// key0 = !key0;
	// break;
	// }

	// link.style("display", function (d) {
	// var flag = vis_by_type(d.source.type) && vis_by_type(d.target.type) && vis_by_node_score(d.source.score) && vis_by_node_score(d.target.score) && vis_by_link_score(d.score);
	// linkedByIndex[d.source.index + "," + d.target.index] = flag;
	// return flag ? "inline" : "none";
	// });
	// node.style("display", function (d) {
	// return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
	// });
	// text.style("display", function (d) {
	// return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
	// });

	// if (highlight_node !== null) {
	// if ((key0 || hasConnections(highlight_node)) && vis_by_type(highlight_node.type) && vis_by_node_score(highlight_node.score)) {
	// if (focus_node !== null)
	// set_focus(focus_node);
	// set_highlight(highlight_node);
	// } else {
	// exit_highlight();
	// }
	// }

	// }
	// }
}

// function vis_by_type(type) {
// switch (type) {
// case "circle":
// return keyc;
// case "square":
// return keys;
// case "triangle-up":
// return keyt;
// case "diamond":
// return keyr;
// case "cross":
// return keyx;
// case "triangle-down":
// return keyd;
// default:
// return true;
// }
// }
// function vis_by_node_score(score) {
// if (isNumber(score)) {
// if (score >= 0.666)
// return keyh;
// else if (score >= 0.333)
// return keym;
// else if (score >= 0)
// return keyl;
// }
// return true;
// }

// function vis_by_link_score(score) {
// if (isNumber(score)) {
// if (score >= 0.666)
// return key3;
// else if (score >= 0.333)
// return key2;
// else if (score >= 0)
// return key1;
// }
// return true;
// }

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
