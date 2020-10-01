
let APIPlot = function () {
    //this.svg;
    //this.w = $("#network_plot").innerWidth();
    //this.h = $("#network_plot").innerHeight();;
    //this.min_threshold_value = 10;
    //this.max_threshold_value = -1;
};

var cy = null;

APIPlot.prototype.secondMax = function (arr) {
    var max = Math.max.apply(null, arr), // get the max of the array
        maxi = arr.indexOf(max);
    arr[maxi] = -Infinity; // replace max in the array with -infinity
    var secondMax = Math.max.apply(null, arr); // get the new max 
    arr[maxi] = max;
    return secondMax;
};

APIPlot.prototype.netPlot = function (data_network_raw) {


    if (cy != null)
        cy.elements().remove();
    const number_of_genes = data_network_raw.length;
    

/* JSON GENERATION */

    //Set the size that every gene must have depending on the scores derived from the matrix
    var size_of_genes = [];
    var max_size_of_genes = [];
    var local_maximum = [];
    var acum_value = 0;
    for (var i = 0; i < number_of_genes; i++) {
        for (var j = 1; j <= number_of_genes; j++) {
            //To avoid adding the number 1 corresponding with the 1s in the diagonal of the matrix
            if (data_network_raw[i][j] != "1") {
                acum_value += parseFloat(data_network_raw[i][j]);
                local_maximum.push(parseFloat(data_network_raw[i][j]))
                //console.log(JSON.stringify(data_network_raw[i]))
            }
        }
        size_of_genes.push(acum_value);
        //using the destructuring assignment
        max_size_of_genes.push(Math.max(...local_maximum))

        acum_value = 0;
        local_maximum = [];
    }

    var sorted = max_size_of_genes.slice().sort(function (a, b) { return b - a })
    var ranks = max_size_of_genes.slice().map(function (v) { return sorted.indexOf(v) + 1 });

    // First, obtain the range of weights associated to the target gene

    let max_weights = new Array();
    let start_storing = false
    let local_max = []
    
    for (var i = 0; i < number_of_genes; i++) {
        local_max = []
        for (var j = 0; j <= number_of_genes; j++) {
            if (start_storing == true) {
                local_max.push(parseFloat(data_network_raw[i][j]))
            }
            if (data_network_raw[i][j] == 1) {
                start_storing = true
            }
        }
        start_storing = false
        if (local_max.length > 0) {
            max_weights.push(Math.max.apply(Math, local_max))
            //max_weights.push(APIPlot.prototype.secondMax(local_max))
        }
    }
    

    // Second, stablish the minimum threshold value
    //let max_value = Math.max.apply(Math, weights)
    //let min_value = Math.min.apply(Math, weights)
    //let min_threshold = max_value - ((max_value - min_value) / 3)

    
    // Get all nodes from the TOM matrix
    let json_data = '{ "nodes" : [';

    for (var i = 0; i < number_of_genes; i++) {
        json_data += '{ "data": {"id": "' + i
            + '","label": "' + data_network_raw[i][0] + '"}}';
            //+ '","importance": "' + (ranks[i] * number_of_genes) + '"}}';
        if (i == number_of_genes - 1)
            json_data += '],';
        else {
            json_data += ',';
        }
    }

    // Get all edges from the TOM matrix that are above the 'min_threshold' stablished
    json_data += ' "edges": [';
    let local_id = 1000000

    for (var i = 0; i < number_of_genes; i++) {
        local_id += i
        for (var j = 1; j <= number_of_genes; j++) {         
            if (data_network_raw[i][j] == max_weights[i]) {
                local_id += j
                json_data += '{ "data": {"id": "' + local_id +
                    '","source": "' + i +
                    '","target": "' + (j - 1) +
                    '","weight": "' + data_network_raw[i][j] + '" } },';
            } 
        }  
    }

    json_data = json_data.substring(0, json_data.length - 1);
    json_data += ']}';
    console.log(json_data)

    /* Graph generation */
    var cy = cytoscape({
        container: $("#cy"),
        /*maxZoom: 1,
        minZoom: 0.1,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true,*/
        //autoungrabifyNodes: true,
        //autoungrabifyEdges: true,
        //autoungrabify: true,
        //hideEdgesOnViewport: true,
        //hideLabelsOnViewport: true,
        //textureOnViewport: true,
        //autounselectify: false,
        //motionBlur: false,
        pixelRatio: 1,
        //boxSelectionEnabled: false,
        renderer: {
            name: 'canvas'
        },
        layout: {
            name: 'cola',
            convergenceThreshold: 10, // end layout sooner, may be a bit lower quality
            animate: true,
            //avoidOverlapPadding: 10,
            randomize: true,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            maxSimulationTime: 100000
        },
        //pixelRatio: 1, // default:'auto', normalise pixel ratio to 1 here so different screens don't alter performance
        //hideEdgesOnViewport: false, // default:false for cyjs, cytoscape-desktop does something like this by default
        elements: JSON.parse(json_data),
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    'font-size': '14px',
                    'stroke': '#fff',
                    'stroke-width': '4px',
                    'background-color': 'black',
                    'border-color': 'white',
                    'border-width': '4px'//,
                    //'width': '75%',
                    //'height': '75%'
                }
            },
            {
                selector: 'edge',
                style: {
                    //'haystack-radius': 0.1,
                    'opacity': 0.5,
                    'line-color': '#333'
                }
            },
            {
                selector: "node[label = '" + $('#gene_dropdown').find(":selected").text() + "']",
                css: {
                    "background-color": "red"
                }
            },
            {
                selector: "node[[degree < 3]]",
                css: {
                    'font-size': '20%',
                    'width': '20%',
                    'height': '20%'
                }
            },
            {
                selector: "node[[degree >= 3]]",
                css: {
                    'font-size': '20%',
                    'width': '30%',
                    'height': '30%'
                }
            },
            {
                selector: "node[[degree >= 5]]",
                css: {
                    'font-size': '30%',
                    'width': '50%',
                    'height': '50%'
                }
            },
            {
                selector: "node[[degree >= 7]]",
                css: {
                    'font-size': '50%',
                    'width': '70%',
                    'height': '70%'
                }
            },
            {
                selector: "node[[degree >= 9]]",
                css: {
                    'font-size': '75%',
                    'width': '75%',
                    'height': '75%'
                }
            },
            {
                selector: 'node.highlight',
                style: {
                    'border-color': $('#module_dropdown').find(":selected").val(),
                    'border-width': '4px',
                    'stroke-width': '5px'
                }
            },
            {
                selector: 'node.highlight_large',
                style: {
                    'border-color': $('#module_dropdown').find(":selected").val(),
                    'border-width': '4px',
                    'stroke-width': '5px',
                    'width': '75%',
                    'height': '75%',
                    'font-size': '75%'
                    
                }
            },
            {
                selector: 'edge.highlight',
                style: {
                    'line-color': $('#module_dropdown').find(":selected").val(),
                    'opacity': 1,
                    'width': 6
                }
            },
            {
                selector: 'node.semitransp',
                style: { 'opacity': '0.5' }
            },
            {
                selector: 'edge.semitransp',
                style: { 'opacity': '0.2' }
            }
        ]
    });

    cy.on('mouseover', 'node', function (e) {
        let node = e.cyTarget;

        if (((e.cy.elements().length + 1) / 2) > 60) {
            node.addClass('highlight_large').outgoers().addClass('highlight_large');
            node.addClass('highlight_large').incomers().addClass('highlight_large');
            node.addClass('highlight_large').connectedEdges().addClass('highlight_large')
        } else {
            node.addClass('highlight').outgoers().addClass('highlight');
            node.addClass('highlight').incomers().addClass('highlight');
            node.addClass('highlight').connectedEdges().addClass('highlight')            
        }

        let connected = node
        connected = connected.union(node.outgoers())
        connected = connected.union(node.incomers())
        cy.elements().not(connected).addClass('semitransp');

        

    });
    cy.on('mouseout', 'node', function (e) {
        let sel = e.cyTarget;
        if (((e.cy.elements().length + 1) / 2) > 60) {
            sel.removeClass('highlight_large').outgoers().removeClass('highlight_large');
            sel.removeClass('highlight_large').incomers().removeClass('highlight_large');
            sel.connectedEdges().removeClass('highlight_large')
        } else {
            sel.removeClass('highlight').outgoers().removeClass('highlight');
            sel.removeClass('highlight').incomers().removeClass('highlight');
            sel.connectedEdges().removeClass('highlight');
        }
        cy.elements().removeClass('semitransp');
        
    });

    cy.on('mousedown', 'node', function (e) {
        let node = e.cyTarget;

        const vizER_url = "https://snca.atica.um.es/browser/app/vizER/?gene=" + node.data().label;
        const gtex_url = "https://gtexportal.org/home/gene/" + node.data().label;
        const gene_cards = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" + node.data().label;

        let dataContent = "<b>" + node.data().label + "</b><br/>";
        dataContent = dataContent + 'Check splicing reads in <a href=\"' + vizER_url + '\" target=\"_blank\">vizER</a>.<br/>';
        dataContent = dataContent + 'Check expression in <a href=\"' + gtex_url + '\" target=\"_blank\">GTEx</a>.<br/>';
        dataContent = dataContent + 'Check gene details in <a href=\"' + gene_cards + '\" target=\"_blank\">GeneCards</a>.';

        node.qtip({
            content: dataContent,
            overwrite: false,
            show: {
                event: e.type, // Use the same show event as the one that triggered the event handler
                ready: true 
            },
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            style: {
                classes: 'qtip-bootstrap',
                tip: {
                    width: 16,
                    height: 8
                }
            },
            hide: {
                e: 'mouseup click'
            }
        }, e);
        
    });
    //cy.elements().qtip({
    //    content: function () { return 'Example qTip on ele ' + this.id() },
    //    position: {
    //        my: 'top center',
    //        at: 'bottom center'
    //    },
    //    style: {
    //        classes: 'qtip-bootstrap',
    //        tip: {
    //            width: 16,
    //            height: 8
    //        }
    //    }
    //});
    //cy.elements().renderedBoundingBox().h = 700;



    


}