/**
 * @fileoverview This file contains all JS functions needed for building the graph using cytoscape.js framework.
 * @author Sonia García Ruiz (s.ruiz@ucl.ac.uk)
 */

let APIPlot = function () {
    //this.svg;
    //this.w = $("#network_plot").innerWidth();
    //this.h = $("#network_plot").innerHeight();;
    //this.min_threshold_value = 10;
    //this.max_threshold_value = -1;
};

var cy = null;
let json_data = '';

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

    //var sorted = max_size_of_genes.slice().sort(function (a, b) { return b - a })
    //var ranks = max_size_of_genes.slice().map(function (v) { return sorted.indexOf(v) + 1 });

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
    json_data = '{ "nodes" : [';

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
    cy = cytoscape({
        container: $("#cy"),
        minZoom: 0.1,
        maxZoom: 4,
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
            maxSimulationTime: 50000
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
            //{//$('#gene_dropdown option:selected').toArray().map(item => item.text).some((num) => num == 'DDX17')
            //    selector: ($('#gene_dropdown option:selected').toArray().map(item => item.text).some(function (e) { e == "node[label]" })),
            //    css: {
            //        "background-color": "red"
            //    }
            //},
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
                    'width': '40%',
                    'height': '40%'
                }
            },
            {
                selector: "node[[degree >= 5]]",
                css: {
                    'font-size': '30%',
                    'width': '60%',
                    'height': '60%'
                }
            },
            {
                selector: "node[[degree >= 7]]",
                css: {
                    'font-size': '50%',
                    'width': '65%',
                    'height': '65%'
                }
            },
            {
                selector: "node[[degree >= 9]]",
                css: {
                    'font-size': '50%',
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
                    'width': '55%',
                    'height': '55%',
                    'font-size': '55%'

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
    /*****
     * TARGET GENES ARE COLOURED IN RED
     * */

    let target_genes = $('#gene_dropdown option:selected').toArray().map(item => item.text)
    for (gene in target_genes) {
        target_nodes = cy.elements('node[label = "' + target_genes[gene] + '"]');
        target_nodes.css({
            "background-color": "red"
        });
        //"background-color": "red"
    }
    

    /*
     * HIGHLIGHT THE NODES IN WHICH THE USER HAS CLICKED
     * */
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

    /* 
     * POPPER WITH INFO ABOUT THE GENE
     * */
    cy.on('mousedown touchstart', 'node', function (e) {
        if ($("#geneInfo").length) {
            $("#geneInfo").remove();
        }
       

        let node = e.cyTarget;

        let gene = node.data().label;
        let url = '/' + environment + '/API/GetInfoFromGeneNetwork';

        $.ajax({
            url: url,
            type: 'POST',
            data: { term: gene },
            success: function (data) {
                $("body").addClass("loading");
                data = JSON.parse(data);
                //console.log(data)
                //let finalOntologyString = null;

                data = data.gene;
                //// id":"ENSG00000145335","index_":8680,"name":"SNCA","biotype":"protein_coding","chr":"4","start":89724099,"stop":89838315,"strand":-1,"description":"synuclein, alpha(non A4 component of amyloid precursor)[Source: HGNC Symbol; Acc: HGNC: 11138]"
                let geneInfo = "";
                geneInfo = (data.id != "") ? "<b>ID: </b> " + data.id + "<br/>" : "";
                geneInfo = geneInfo + ((data.biotype != "") ? "<b>Biotype: </b> " + data.biotype + "<br/>" : "");
                geneInfo = geneInfo + ((data.description != "") ? "<b>Description: </b> " + data.description + "<br/>" : "");
                geneInfo = geneInfo + ((data.chr != "") ? "<b>Chr: </b> " + data.chr + "<br/>" : "");
                geneInfo = geneInfo + ((data.start != "") ? "<b>Start: </b> " + data.start + "<br/>" : "");
                geneInfo = geneInfo + ((data.stop != "") ? "<b>Stop: </b> " + data.stop + "<br/>" : "");

                $("body").removeClass("loading");

                let popper = node.popper({
                    content: () => {
                        let div = document.createElement('div');

                        div.innerHTML = geneInfo;
                        div.id = "geneInfo";

                        //div.style.backgroundColor = "rgba(244, 242, 240, 0.5)";
                        div.style.padding = "3px";
                        

                        document.body.appendChild(div);

                        return div;
                    }
                });

                let update = () => {
                    popper.scheduleUpdate();
                };

                node.on('position', update);
                cy.on('pan zoom resize', update);
            },
            error: function () {
                return "No results found!";
                $("body").removeClass("loading");
            }
        })
    });
    cy.on('mouseup touchend', 'node', function (e) {
        if ($("#geneInfo").length) {
            $("#geneInfo").remove();
        }
    });

    
    /*
     * BUTTONS TO DOWNLOAD THE GRAPH DATA
     * */
    cy.ready(function (event) {
        $('#button_area').show();
    });
    $("#save-plot").click(function () {
        var png64 = cy.png({ full: true, quality: 1 });
        $('#save-plot').attr('href', png64);
    });
    $("#save-data").click(function () {
        //var json = cy.json();
        $('#save-data').attr('href', "data:application/json," + encodeURIComponent(json_data));
    });

}