
let APIPlot = function () {
    //this.svg;
    //this.w = $("#network_plot").innerWidth();
    //this.h = $("#network_plot").innerHeight();;
    //this.min_threshold_value = 10;
    //this.max_threshold_value = -1;
};

APIPlot.prototype.svg;
APIPlot.prototype.min_threshold_value = 10;
APIPlot.prototype.max_threshold_value = -1;
APIPlot.prototype.highlight_color = $('#module_dropdown').find(":selected").val();
APIPlot.prototype.default_node_color = "#ccc";
APIPlot.prototype.default_link_color = "#7C7C7C";
APIPlot.prototype.linkedByIndex = {};
APIPlot.prototype.highlight_trans = 0.2;
APIPlot.prototype.number_of_genes = 0;
APIPlot.prototype.number_of_NAN = 1;
APIPlot.prototype.links_value_treshold = 0;
APIPlot.prototype.nodes = '{"nodes" : [';
APIPlot.prototype.data_network_raw = "";
APIPlot.prototype.force = d3.layout.force()


APIPlot.prototype.netPlot = function(data_network_temp) {

    APIPlot.prototype.data_network_raw = data_network_temp;

    var multi_node = 20;
    var focus_node = null,
        highlight_node = null,
        value_distance = null;
    var hiding_nodes = false,
        current_node = 0,
        node_isalone = false;

    var text_center = false;
    var outline = false;

    var min_score = 0;
    var max_score = 1;

    var nominal_base_node_size = 6;//6
    var max_base_node_size = 8;//8
    var nominal_text_size = 6;//6
    var max_text_size = 18;//10
    var nominal_stroke = 1;//1
    var max_stroke = 4.5;
    var min_zoom = 1;
    var max_zoom = 6.5;

    var tocolor = "fill";
    var towhite = "stroke";

    var stroke = nominal_stroke;
    var w = $("#network_plot").innerWidth();
    var h = $("#network_plot").innerHeight();

    var color = d3.scale.linear()
        .domain([min_score, (min_score + max_score) / 2, max_score])
//        .range(["lime", "yellow", "red"]);
    var size = d3.scale.pow().exponent(1)
        .domain([1, 100])
        .range([8, 24]);

    

    APIPlot.prototype.svg = d3.select("#network_plot").append("svg");
    

    var g = APIPlot.prototype.svg.append("g");
    var layer1 = g.append('g');
    var layer2 = g.append('g');

    //Generate the JSON that the plot needs from the data received from the server
    var data_network = APIPlot.prototype.buildJSONtoPlot(APIPlot.prototype.data_network_raw);
    SVGData = JSON.parse(data_network);
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
    //max node value
    var max_node_value = d3.max(data_network.nodes, function (d) {
        return d.score;
    });
    //min node value
    var min_node_value = d3.min(data_network.nodes, function (d) {
        return d.score;
    });

    //var min_threshold_value_temp = APIPlot.prototype.min_threshold_value - parseFloat((APIPlot.prototype.min_threshold_value.toString().substring(0, APIPlot.prototype.min_threshold_value.toString().length - 5)));



    linkedByIndex = {};
    data_network.links.forEach(function (d) {
        APIPlot.prototype.linkedByIndex[d.source + "," + d.target] = true;
    });

    



    APIPlot.prototype.force = APIPlot.prototype.force
        .charge(-250)
        .linkDistance(function (d) {

            if (max_link_value != min_link_value) {
                value_distance = (1 - (((d.value - min_link_value) / (max_link_value - min_link_value)) + 0.1)) * 100;
                //console.log((d.value - min_link_value) / (max_link_value - min_link_value));
            } else
                value_distance = 60;

            return value_distance;
            //return (1 / d.value) * 10;
        })
        .size([$("#network_plot").innerWidth(), $("#network_plot").innerHeight()]);

    APIPlot.prototype.force
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
        .style("opacity", function (o) {
            return APIPlot.prototype.highlight_trans;
        })
        .style("stroke", APIPlot.prototype.default_link_color);

    var node = layer2.selectAll(".node")
        .data(data_network.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("id", function (d) {
            return d.id_node;
        })
        .style("visibility", "visible")
        .call(APIPlot.prototype.force.drag);

    
    if (outline) {
        tocolor = "stroke"
        towhite = "fill"
    }

    var circle = node.append("path")
        .attr("d", d3.svg.symbol()
            .size(function (d) {
                console.log("hi: ", d.score, " -", min_node_value, " - ", max_node_value," - ", multi_node)
                console.log(d.score - min_node_value, " - ",(max_node_value - min_node_value) + 1)
                return (((d.score - min_node_value) / (max_node_value - min_node_value) + 1) * multi_node);
                //return (d.score)
            })
            .type(function (d) {
                return d.type;
            }))
        .style(tocolor, function (d) {
            if (APIPlot.prototype.isNumber(d.score) && d.score >= 0)
                return d.module;
            else
                return APIPlot.prototype.default_node_color;
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
        text.text(function (d) {return d.id;})
            .style("text-anchor", "middle");
    else
        text.attr("dx", function (d) {
            return (size(d.size) || nominal_base_node_size);
        })
            .text(function (d) {
                return '\u2002' + d.id;
            });

    node.on("mouseover", function (d) { APIPlot.prototype.setHighlight(d, color, focus_node, circle, towhite, text, link);})
        .on("mousedown", function (d) {
            d3.event.stopPropagation();
            focus_node = d;
            APIPlot.prototype.setFocus(d, circle, text, link)
            if (highlight_node === null)
                APIPlot.prototype.setHighlight(d, color, focus_node, circle, towhite, text, link)
        }).on("mouseout", function (d) {
            APIPlot.prototype.exitHighlight(color, focus_node, circle, towhite, text, link);
        });

    d3.select(window).on("mouseup", function () {
        if (focus_node !== null) {
            focus_node = null;
            if (APIPlot.prototype.highlight_trans < 1) {
                circle.style("opacity", 1);
                text.style("opacity", 1);
                link.style("opacity", 1);
            }
        }
        if (highlight_node === null)
            APIPlot.prototype.exitHighlight(color, focus_node, circle, towhite, text, link);
    });




    /**** Set the values (default, min and max numbers) for the threshold ****/
    var min_treshold_value_temp = min_link_value - parseFloat((min_link_value.toString().substring(0, min_link_value.toString().length - 5)));
    var max_treshold_value_temp = max_link_value - parseFloat((max_link_value.toString().substring(0, max_link_value.toString().length - 5)));

    $('#slider-range-treshold').attr("min", (min_link_value - min_treshold_value_temp));
    //$('#slider-range-treshold').attr("value", (min_link_value - min_treshold_value_temp));
    $('#slider-range-treshold').val((min_link_value - min_treshold_value_temp));
    $('#slider-range-treshold').attr("max", (max_link_value - max_treshold_value_temp));
    $('#slider-range-treshold').attr("step", parseFloat(((max_link_value - max_treshold_value_temp) - (min_link_value - min_treshold_value_temp)) / 10));
    $("#threshold_network").val($("#slider-range-treshold").val());

    /**** This function is executed when the 'Hide isolated genes' checkbox changes ****/
    $("#hide_nodes").click(function () {
        //$("#hide_nodes").checkboxradio("refresh");
        hiding_nodes = !hiding_nodes;
        if (hiding_nodes) {
            //console.log(Object.keys(data_network.links).length);
            current_node = 0;
            for (let i = 0; i <= Object.keys(data_network.nodes).length; i++) {
                node_isalone = true;
                data_network.links.forEach(function (d) {
                    //console.log("source: " + d.source.index + " -  target: " + d.target.index + " == " + current_node);
                    if (d.source.index == current_node || d.target.index == current_node) {
                        node_isalone = false;
                    }
                });

                if (node_isalone) {
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

    /**** This function is executed when the threshold range changes ****/
    $("#slider-range-treshold").on("change", function (e) {

        let start_storing = false,
            links = '"links" : [',
            has_value = false;
        for (let i = 0; i < APIPlot.prototype.number_of_genes; i++) {
            start_storing = false;
            for (let j = 0; j < APIPlot.prototype.number_of_genes + APIPlot.prototype.number_of_NAN; j++) {
                if (start_storing && APIPlot.prototype.data_network_raw[i][j] > $("#threshold_network").val()) {
                    links += '{"source":' + i + ',"target":' + (j - APIPlot.prototype.number_of_NAN) + ',"value":' +
                        APIPlot.prototype.data_network_raw[i][j] + '},';
                    has_value = true;
                }
                
                console.log(APIPlot.prototype.number_of_genes +" " + i + " " + j)
                if (APIPlot.prototype.data_network_raw[i][j] == 1) {
                    start_storing = true;
                }
            }
        }

        if (has_value) {
            links = links.substring(0, links.length - 1);

            links += ']}';
            data_network_onchange = APIPlot.prototype.nodes + links;

            data_network = JSON.parse(data_network_onchange);

            link = layer1.selectAll(".link")
                .data(data_network.links, function (d) {
                    return d.source + "-" + d.target;
                });

            //update the connected nodes
            APIPlot.prototype.linkedByIndex = {};
            data_network.links.forEach(function (d) {
                APIPlot.prototype.linkedByIndex[d.source + "," + d.target] = true;
            });

            link.enter().append("line")
                .attr("class", "link")
                .style("stroke-width", function (d) {
                    return ((d.value - min_link_value) / (max_link_value - min_link_value) + 0.2) / 2;
                })
                .style("opacity", function (o) {
                    return APIPlot.prototype.highlight_trans;
                })
                .style("stroke", APIPlot.prototype.default_link_color);

            link.exit().remove();

            APIPlot.prototype.force.on("tick", function () {

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

            APIPlot.prototype.force
                .links(data_network.links)
                .start();
        }

        //hide not linked
        if (hiding_nodes) {
            //console.log(Object.keys(data_network.links).length);
            current_node = 0;
            for (let i = 0; i <= Object.keys(data_network.nodes).length; i++) {
                node_isalone = true;
                data_network.links.forEach(function (d) {
                    //console.log("source: " + d.source.index + " -  target: " + d.target.index + " == " + current_node);

                    if (d.source.index == current_node || d.target.index == current_node) {
                        node_isalone = false;
                        //console.log("entriiiiii");
                    }
                });

                if (node_isalone) {
                    d3.select("#node_" + current_node).style("visibility", "hidden");
                    d3.select("#text_node_" + current_node).style("visibility", "hidden");

                } else {
                    d3.select("#node_" + i).style("visibility", "visible");
                    d3.select("#text_node_" + i).style("visibility", "visible");
                }

                current_node++;
            }
        }

        e.preventDefault();
    });

    APIPlot.prototype.force.on("tick", function () {
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

    

    var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
        .on("zoom", function () {

            stroke = nominal_stroke;
            if (nominal_stroke * zoom.scale() > max_stroke)
                stroke = max_stroke / zoom.scale();

            circle.style("stroke-width", stroke);

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

    APIPlot.prototype.svg
        .style("cursor", "move")
        .attr("width", w)
        .attr("height", h)
        .call(zoom)
        //.select("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(2)");

    APIPlot.prototype.force.size([APIPlot.prototype.force.size()[0] / zoom.scale(), APIPlot.prototype.force.size()[1] / zoom.scale()]).resume();
        

}


APIPlot.prototype.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

APIPlot.prototype.removeNumber = function (myString) {
    if (/\d/.test(myString)) {
        myString = myString.replace(/\d+/g, '')
    }
    return myString;
}

APIPlot.prototype.isConnected = function (a, b) {
    return APIPlot.prototype.linkedByIndex[a.index + "," + b.index] || APIPlot.prototype.linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

APIPlot.prototype.setHighlight = function (d, color, focus_node, circle, towhite, text, link) {
    APIPlot.prototype.svg.style("cursor", "pointer");
    if (focus_node !== null)
        d = focus_node;
    highlight_node = d;

    APIPlot.prototype.highlight_color = APIPlot.prototype.removeNumber($('#module_dropdown').find(":selected").val());

    if (APIPlot.prototype.highlight_color != "white") {
        circle.style(towhite, function (o) {
            return APIPlot.prototype.isConnected(d, o) ? APIPlot.prototype.highlight_color : "white";
        });
        text.style("font-weight", function (o) {
            return APIPlot.prototype.isConnected(d, o) ? "bold" : "normal";
        });
        link.style("stroke", function (o) {
            return o.source.index == d.index ||
                o.target.index == d.index ?
                APIPlot.prototype.highlight_color : ((APIPlot.prototype.isNumber(o.score) && o.score >= 0) ? color(o.score) : APIPlot.prototype.default_link_color);

        })
            .style("opacity", function (o) {
                return  o.source.index == d.index ||
                    o.target.index == d.index ?
                    1 : APIPlot.prototype.highlight_trans;
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

APIPlot.prototype.exitHighlight = function (color, focus_node, circle, towhite, text, link) {
    highlight_node = null;
    if (focus_node === null) {
        APIPlot.prototype.svg.style("cursor", "move");
        if (APIPlot.prototype.highlight_color != "white") {
            circle.style(towhite, "white");
            text.style("font-weight", "normal");
            link.style("stroke", function (o) {
                return (APIPlot.prototype.isNumber(o.score) && o.score >= 0) ? color(o.score) : APIPlot.prototype.default_link_color
            });
            link.style("opacity", function (o) {
                return APIPlot.prototype.highlight_trans;
            });
        }

    }
}

APIPlot.prototype.setFocus = function (d, circle, text, link) {
    if (APIPlot.prototype.highlight_trans < 1) {
        circle.style("opacity", function (o) {
            return APIPlot.prototype.isConnected(d, o) ? 1 : APIPlot.prototype.highlight_trans;
        });

        text.style("opacity", function (o) {
            return APIPlot.prototype.isConnected(d, o) ? 1 : APIPlot.prototype.highlight_trans;
        });

        link.style("opacity", function (o) {
            return o.source.index == d.index || o.target.index == d.index ? 1 : APIPlot.prototype.highlight_trans;
        });
    }
}


APIPlot.prototype.buildJSONtoPlot = function (data_network_raw) {

    
    APIPlot.prototype.number_of_genes = parseInt($('#text-box_genes-range').val());
    if (parseInt($("#genes-range").val()) <= data_network_raw.length)
        APIPlot.prototype.number_of_genes = parseInt($("#genes-range").val());
    else
        APIPlot.prototype.number_of_genes = data_network_raw.length;

    //set the size
    var size_of_genes = [];
    var acum_value = 0;
    for (var i = 0; i < APIPlot.prototype.number_of_genes; i++) {
        for (var j = APIPlot.prototype.number_of_NAN; j < APIPlot.prototype.number_of_genes + APIPlot.prototype.number_of_NAN; j++) {
            acum_value += parseFloat(data_network_raw[i][j]);
        }
        size_of_genes.push(acum_value);
        acum_value = 0;
    }

    APIPlot.prototype.nodes = '{"nodes" : [';
    // number_of_genes - 1 : to set the last one without comma
    for (var i = 0; i < APIPlot.prototype.number_of_genes - 1; i++) {
        APIPlot.prototype.nodes += '{"id" : "' + data_network_raw[i][0] + '", "id_node" : "node_' + i + '", "score" : ' + (size_of_genes[i] + 5) + ', "module": "' + data_network_raw[i][2] + '", "type": "circle"},';
    }
    APIPlot.prototype.nodes += '{"id" : "' + data_network_raw[APIPlot.prototype.number_of_genes - 1][0] + '", "id_node" : "node_' + (APIPlot.prototype.number_of_genes - 1)
        + '", "score" : ' + size_of_genes[APIPlot.prototype.number_of_genes - 1]
        + ', "module": "' + data_network_raw[APIPlot.prototype.number_of_genes - 1][2] + '", "type": "circle"}],';

    var start_storing;
    var links = '"links" : [';
    for (var i = 0; i < APIPlot.prototype.number_of_genes; i++) {
        start_storing = false;
        for (var j = 0; j < APIPlot.prototype.number_of_genes + APIPlot.prototype.number_of_NAN; j++) {
            if (start_storing) {

                if (data_network_raw[i][j] < APIPlot.prototype.min_threshold_value)
                    APIPlot.prototype.min_threshold_value = data_network_raw[i][j];

                if (data_network_raw[i][j] > APIPlot.prototype.max_threshold_value)
                    APIPlot.prototype.max_threshold_value = data_network_raw[i][j];

                if (data_network_raw[i][j] > APIPlot.prototype.links_value_treshold)
                    links += '{"source":' + i + ',"target":' + (j - APIPlot.prototype.number_of_NAN) + ',"value":' + data_network_raw[i][j] + '},';
            }
            if (data_network_raw[i][j] == 1) {
                start_storing = true;
            }
        }
    }
    links = links.substring(0, links.length - 1);
    links += ']}';

    return APIPlot.prototype.nodes + links;

}

