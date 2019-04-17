// JavaScript source code
var API = function () {
    /// <summary>
    /// API namespace constructor
    /// </summary>
};
var environment = "coexp";//"ATN_5843218Gt"//"coexp"//coexp_test


API.prototype.sendButtonFunction = function (view, moduleColor) {

    if (moduleColor === undefined) {
        moduleColor = null;
    }
    
    $("body").addClass("loading");

    if (view == 1 || view == 11) {

        //hide previous errors/results
        $('#error').hide();
        //get the selection-types selected
        var module_selection_types = $('#module_selection').val();

        $("body").addClass("loading");

        //remove old tables
        if ($('#goFromTissue_table tr').length > 1) {
            $('#goFromTissue_table').DataTable().destroy();
            $('#goFromTissue_table').remove("tbody");
            $('#goFromTissue_div').hide();
        }
        if ($('#cellType_table tr').length > 1) {
            $('#cellType_table').DataTable().destroy();
            $('#cellType_table').children().remove();
            $('#cellType_div').hide();
        }
        $("body").addClass("loading");
        //show result divs
        if (module_selection_types.length == 1) {
            if (module_selection_types[0] == "1") { //only byontology and bycolor
                API.prototype.getGOFromTissue($('#category').val(), $('#network').val(), moduleColor);
                //hide/sow tabs and divs
                $("#cellType_div").hide();

                $('.nav-tabs a[href="#tab1"]').tab("show");
                $('.nav-tabs a[href="#tab1"]').tab().show();
                $('.nav-tabs a[href="#tab2"]').tab().hide();
            }
            else {//only bycelltype
                API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val(), moduleColor);
                //hide/sow tabs and divs
                $("#goFromTissue_div").hide();

                $('.nav-tabs a[href="#tab2"]').tab("show");
                $('.nav-tabs a[href="#tab2"]').tab().show();
                $('.nav-tabs a[href="#tab1"]').tab().hide();
            }
        }
        else if (module_selection_types.length == 2) {//both bycelltype and bycolor
            API.prototype.getGOFromTissue($('#category').val(), $('#network').val(), moduleColor);
            API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val(), moduleColor);
            //Show all tabs
            $('.nav-tabs a[href="#tab1"]').tab("show");
            $('.nav-tabs a[href="#tab1"]').tab().show();
            $('.nav-tabs a[href="#tab2"]').tab().show();
        }
        else {
            $('#goFromTissue_div').hide();
            $('#cellType_div').hide();
            $('#error').show();
            $("body").removeClass("loading");
        }
    }
    else if (view == 2) {
        $("body").addClass("loading");
        $("genes").focus();
        $('#reportOnGenes_div').hide();
        $('#summariseClustering_div').hide();
        if ($('#reportOnGenes_table tr').length > 1) {
            $('#reportOnGenes_table').DataTable().destroy();
        }
        if ($('#summariseClustering_table tr').length > 1) {
            $('#summariseClustering_table').DataTable().destroy();
        }

        var data = [];
        var categories = $("i.checked").closest("li [data-level*=2]");//.children().eq(1).text();
        for (var i = 0; i < categories.length; i++) {
            var categoryLabel = $(categories[i]).children().eq(1).text();
            var networks = $(categories[i]).children("ul").find("i.checked").parent();
            var networkLabel = null;
            networks.each(function (i, val) {
                if (i == 0)
                    networkLabel = val.innerText;
                else
                    networkLabel = networkLabel + "," + val.innerText
            })
            data[i] = categoryLabel + "|" + networkLabel + "**";
        }
        if (($('#genes').val()).indexOf('"') > -1) {
            alert("Please, introduce your non-quoted genes using one of the following formats:\nComma-separated: GENE1,GENE2\nSpace-separated: GENE1 GENE2\nComma and space sparated: GENE1, GENE2");
            $('#genes').val("");
            $("body").removeClass("loading");
        }
        else if (($('#genes').val()).indexOf('  ') > -1) {
            alert("Please, introduce your non-quoted genes using one of the following formats:\nComma-separated: GENE1,GENE2\nSpace-separated: GENE1 GENE2\nComma and space sparated: GENE1, GENE2");
            $('#genes').val("");
            $("body").removeClass("loading");
        }
        else
            API.prototype.reportOnGenesMultipleTissue(data, $('#genes').val());
    }
    else if (view == 3) {
        $("body").addClass("loading");
        $("genes").focus();
        $('#globalReportOnGenes_div').hide();
        $('#globalSummariseReportOnGenes_div').hide();
        if ($('#globalReportOnGenes_table tr').length > 1) {
            $('#globalReportOnGenes_table').DataTable().destroy();
        }
        if ($('#globalSummariseReportOnGenes_table tr').length > 1) {
            $('#globalSummariseReportOnGenes_table').DataTable().destroy();
        }

        var data = [];
        var categories = $("i.checked").closest("li [data-level*=2]");//.children().eq(1).text();
        for (var i = 0; i < categories.length; i++) {
            var categoryLabel = $(categories[i]).children().eq(1).text();
            var networks = $(categories[i]).children("ul").find("i.checked").parent();
            var networkLabel = null;
            networks.each(function (i, val) {
                if (i == 0)
                    networkLabel = val.innerText;
                else
                    networkLabel = networkLabel + "," + val.innerText
            })
            data[i] = categoryLabel + "|" + networkLabel + "**";
        }
        if (($('#genes').val()).indexOf('"') > -1) {
            alert("Please, introduce your non-quoted genes using one of the following formats:\nComma-separated: GENE1,GENE2\nSpace-separated: GENE1 GENE2\nComma and space sparated: GENE1, GENE2");
            $('#genes').val("");
            $("body").removeClass("loading");
        }
        else if (($('#genes').val()).indexOf('  ') > -1) {
            alert("Please, introduce your non-quoted genes using one of the following formats:\nComma-separated: GENE1,GENE2\nSpace-separated: GENE1 GENE2\nComma and space sparated: GENE1, GENE2");
            $('#genes').val("");
            $("body").removeClass("loading");
        }
        
        else if (($('#genes').val()).indexOf('{') > -1 || ($('#genes').val()).indexOf('}') > -1) {
            alert("Please, introduce your non-quoted genes using one of the following formats:\nComma-separated: GENE1,GENE2\nSpace-separated: GENE1 GENE2\nComma and space sparated: GENE1, GENE2");
            $('#genes').val("");
            $("body").removeClass("loading");
        }
        else if (($('#genes').val()).indexOf('[') > -1 || ($('#genes').val()).indexOf(']') > -1) {
            alert("Please, introduce your non-quoted genes using one of the following formats:\nComma-separated: GENE1,GENE2\nSpace-separated: GENE1 GENE2\nComma and space sparated: GENE1, GENE2");
            $('#genes').val("");
            $("body").removeClass("loading");
        }
        else if (($('#genes').val()).indexOf('\n') > -1) {
            var formatedGenes = $('#genes').val().replace(/\n/g, " ");
            API.prototype.globalReportOnGenes(data, formatedGenes);
        }
        else
            API.prototype.globalReportOnGenes(data, $('#genes').val());
    }
}
API.prototype.searchByModuleColor = function (moduleColor, category, network) {
    $("body").addClass("loading");

    /*var category = $("i.checked").closest("li [data-level*=2]").children().eq(1).text();
    var selectedData = $("i.checked").parent();
    var network = null;
    selectedData.each(function (i, val) {
        if (i == 0)
            network = val.innerText;
        else
            network = network + "," + val.innerText
    })*/
    $("body").removeClass("loading");
    window.open(url = "/" + environment + "/Run/Catalog?category=" + category + "&network=" + network + "&modulecolor=" + moduleColor, "_blank", "resizable=no,top=300,left=500,width=700,height=700");
}
API.prototype.getTreeMenuData = function () {

    $.ajax({
        url: '/' + environment + '/API/GetTreeMenuData',
        type: 'GET',
        success: function (data) {
            console.log(data);
            if (data.indexOf("Problems") >= 0) {
                $("#error").children("p").remove();
                $("#error").append("<p>" + data + "</p>");
                $("#error").show();
            }
            else {
                simTree({
                    el: '#tree',
                    data: JSON.parse(data),
                    check: true,
                    linkParent: true,
                    expand: 'expand',
                    onClick: function (item) {
                        if (item.length > 0)
                            $('#genes')
                                .prop('disabled', false);
                    }

                });
                $("ul.show").removeClass("show");//.find("ul.show").addClass("show");
                $("li[data-id = '100']").closest("ul").first().addClass("show");
                $("li[data-id = '1']").closest("ul").addClass("show");

                $("ul.sim-tree").find("i.sim-tree-checkbox").first().addClass("sim-tree-semi")
                $("li[data-id = '1']").find("i.sim-tree-checkbox").first().addClass("sim-tree-semi")
                $("li[data-id = '100']").find("i.sim-tree-checkbox").first().addClass("checked")
                //$("ul.sim-tree").closest("li").closest("ul").addClass("show");
            }
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
        }
    });
}
API.prototype.getCardData = function (term) {
    var url = '/' + environment + '/API/GetInfoFromQuickGO';
    //alert("hi")
    $.ajax({
        url: url,
        type: 'POST',
        data: { term: term },
        success: function (data) {
            data = JSON.parse(data);
            if (data["results"].length > 0) {
                //alert("hi")
                data = data["results"][0];
                var goInfo = "<b>Id: </b> " + data.id
                    + "<br/><b>Name: </b> " + data.name
                    + "<br/><b>Aspect: </b> " + data.aspect
                    + "<br/><b>Definition: </b> " + data.definition.text + "<br/>";

                var goTerm = (this.data).split("%3A")[1];

                $("a[id*='" + goTerm + "']").attr("data-content", goInfo);
                //$("a[id*='" + goTerm + "']").focus();

            }

        },
        error: function () {
            return "No results found!";
        }
    });
}
API.prototype.hideRowsReportOnGenes = function (d, tr, row, id) {/* Formatting function for row details - modify as you need */

    var genes = "";
    var finalGoReport = d.go_report;
    var allGOTerms = d.go_report.match(/GO:[0-9]*/g);

    if (allGOTerms != null) {

        for (var i = 0; i < allGOTerms.length; i++) {

            finalGoReport = finalGoReport.replace(allGOTerms[i], "<a id='" + allGOTerms[i] + "' href='#' onmouseover='javascript:API.prototype.getCardData(\"" + allGOTerms[i] + "\")' data-placement='bottom' data-trigger='hover' data-html='true' title='" + allGOTerms[i] + "' data-content='<div class=\"loader\"></div>'>" + allGOTerms[i] + "</a>");
        }
    }
    else
        finalGoReport = "no data"

    if (id.toLowerCase().indexOf("summarise") >= 0) {

        /*********************************/
        /************* GENES *************/
        /*********************************/

        var finalGenesString = null;
        for (var i = 0; i < (d.gene).length; i++) {
            var vizER_url = "https://snca.atica.um.es/browser/app/vizER/?gene=" + d.gene[i];
            var gtex_url = "https://gtexportal.org/home/gene/" + d.gene[i];
            var gene_cards = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" + d.gene[i];

            var dataContent = 'Check in splicing reads in <a href=\"' + vizER_url + '\" target=\"_blank\">vizER</a>.<br/>';
            dataContent = dataContent + 'Check expression in <a href=\"' + gtex_url + '\" target=\"_blank\">GTEx</a>.<br/>';
            dataContent = dataContent + 'Check gene details in <a href=\"' + gene_cards + '\" target=\"_blank\">GeneCards</a>.';
            if (i == 0)
                finalGenesString = "<a href='#' id='" + d.gene[i] + "' data-html='true' data-trigger='click' data-placement='bottom' title='" + d.gene[i] + "' data-content='" + dataContent + "'>" + d.gene[i] + "</a>";
            else
                finalGenesString = finalGenesString + ", <a href='#' id='" + d.gene[i] + "' data-html='true' data-trigger='click' data-placement='bottom' title='" + d.gene[i] + "' data-content='" + dataContent + "'>" + d.gene[i] + "</a>";
        }
        genes = '<tr>' +
            '<td>genes: </td>' +
            '<td>' + finalGenesString + '</td>' +
            '</tr>';
    }

    // `d` is the original data object for the row
    var table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        genes +
        '<tr>' +
        '<td>go_report: </td>' +
        '<td>' + finalGoReport + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>cell_type_pred: </td>' +
        '<td>' + d.cell_type_pred + '</td>' +
        '</tr>' +
        '</table>';

    row.child(table).show();
    tr.addClass('shown');
    $("[data-placement='bottom']").popover();
}
API.prototype.hideRowsGOFromTissue = function (d, tr, row) {/* Formatting function for row details - modify as you need */

    var term = (d.term_id).split(':');
    var id = term[1];
    var url = "";
    var dataToSend = "";

    if (term[0] == "GO") {
        url = '/' + environment + '/API/GetInfoFromQuickGO';
        dataToSend = d.term_id;
    }
    else if (term[0] == "REAC") {
        url = '/' + environment + '/API/GetInfoFromREACTOME';
        dataToSend = term[1];
    }
    else {
        url = '/' + environment + '/API/GetInfoFromKEGG';
        dataToSend = term[1];
    }


    /*********************************/
    /************* GENES *************/
    /*********************************/
    if ((d.intersection).indexOf(", ") >= 0) 
        var allgenes = (d.intersection).split(", ");
    else if ((d.intersection).indexOf(" ") >= 0)
        var allgenes = (d.intersection).split(" ");
    var finalGenesString = null;
    for (var i = 0; i < allgenes.length; i++) {
        var vizER_url = "https://snca.atica.um.es/browser/app/vizER/?gene=" + allgenes[i];
        var gtex_url = "https://gtexportal.org/home/gene/" + allgenes[i];
        var gene_cards = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" + allgenes[i];

        var dataContent = 'Check in splicing reads in <a href=\"' + vizER_url + '\" target=\"_blank\">vizER</a>.<br/>';
        dataContent = dataContent + 'Check expression in <a href=\"' + gtex_url + '\" target=\"_blank\">GTEx</a>.<br/>';
        dataContent = dataContent + 'Check gene details in <a href=\"' + gene_cards + '\" target=\"_blank\">GeneCards</a>.';
        if (i == 0)
            finalGenesString = "<a href='#' id='" + allgenes[i] + "' data-html='true' data-trigger='click' data-placement='bottom' title='" + allgenes[i] + "' data-content='" + dataContent + "'>" + allgenes[i] + "</a>";
        else
            finalGenesString = finalGenesString + ", <a href='#' id='" + allgenes[i] + "' data-html='true' data-trigger='click' data-placement='bottom' title='" + allgenes[i] + "' data-content='" + dataContent + "'>" + allgenes[i] + "</a>";
    }

    /*********************************/
    /****** ONTOLOGY # REACTOME ******/
    /*********************************/

    $.ajax({
        url: url,
        type: 'POST',
        data: { term: dataToSend },
        success: function (data) {
            data = JSON.parse(data);
            if (term[0] == "GO" && data["results"].length > 0) {
                data = data["results"][0];
                var goInfo = "<b>Id: </b> " + data.id
                    + "<br/><b>Name: </b> " + data.name
                    + "<br/><b>Aspect: </b> " + data.aspect
                    + "<br/><b>Definition: </b> " + data.definition.text + "<br/>";

                var finalOntologyString = "<a id='" + id + "' href='#' data-trigger='hover' data-html='true' data-placement='bottom' title='" + d.term_id + "' data-content='" + goInfo + "'>" + d.term_id + "</a>";

            }
            else if (term[0] == "REAC" && data.dbId != null) {
                console.log(data);
                var lastElement = "";

                if (data.isInDisease) {
                    lastElement = "<br/><b>Disease: </b> (" + data.disease[0].displayName + ") " + data.disease[0].definition + "<br/>";
                }
                else if (data.goBiologicalProcess != undefined) {
                    lastElement = "<br/><b>Biological Process: </b> " + data.goBiologicalProcess.definition + "<br/>";
                }
                var reacInfo = "<b>Id: </b> " + d.term_id
                    + "<br/><b>Name: </b> " + data.displayName
                    + "<br/><b>Species: </b> " + data.speciesName
                    + lastElement;

                var finalOntologyString = "<a id='" + id + "' href='#' data-trigger='hover' data-html='true' data-placement='bottom' title='" + d.term_id + "' data-content='" + reacInfo + "'>" + d.term_id + "</a>";
            }
            else if (term[0] == "KEGG" && data.length > 0) {
                data = data[0];

                var lastElement = "";
                if (data.description != "") {
                    lastElement = "<b>Description: </b> " + data.description + "<br/>";
                }
                else if (data.diseases != "") {
                    lastElement = lastElement + "<b>Diseases: </b> ";
                    for (var disease in data.diseases) {
                        lastElement = lastElement + data.diseases[disease] + "<br/>";
                    }
                }
                var keggInfo = "<b>Id: </b> " + data.entry_id
                    + "<br/><b>Name: </b> " + data.name + "<br/>"
                    + lastElement;


                var finalOntologyString = "<a id='" + id + "' href='#' data-trigger='hover' data-html='true' data-placement='bottom' title='" + d.term_id + "' data-content='" + keggInfo + "'>" + d.term_id + "</a>";

            }

            // `d` is the original data object for the row
            var table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                '<tr>' +
                '<td>term_id: </td>' +
                '<td>' + finalOntologyString + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>genes: </td>' +
                '<td>' + finalGenesString + '</td>' +
                '</tr>' +
                '</table>';
            row.child(table).show();
            tr.addClass('shown');
            $("[data-placement='bottom']").popover();
        },
        error: function () {
            return "No results found!";
        }
    });



}
API.prototype.globalReportOnGenes = function (data, genes) {
    try {
        $.ajax({
            url: '/' + environment + '/API/PostGlobalReportOnGenes',
            data: JSON.stringify({
                "MultipleSelectionData": "{"+data+"}",
                "Genes": genes
            }),
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                if (data.indexOf("Problems") >= 0) {
                    $("#error").children("p").remove();
                    $("#error").append("<p>" + data + "</p>");
                    $("#error").show();
                }
                else {

                    console.log(data);

                    /***********************************/
                    /****** 'Sumarise Clustering' ******/
                    /***********************************/
                    var myobject = _.groupBy(JSON.parse(data), function (o) {
                        return o.network +'_' + o.module;
                    });
                    var mapped = _.map(myobject, function (group) {
                        return {
                            network: group[0].network,
                            category: group[0].category,
                            module: group[0].module,
                            gene: _.pluck(group, 'gene'),
                            fisher: group[0].fisher,
                            FDR: group[0].FDR,
                            Bonferroni: group[0].Bonferroni,
                            size: group[0].size,
                            go_report: group[0].go_report,
                            cell_type_pred: group[0].cell_type_pred
                        }
                    });
                    $('#globalSummariseReportOnGenes_table').DataTable({
                        data: mapped,
                        deferRender: true,
                        columns: [
                            {
                                className: "details-control",
                                orderable: false,
                                data: null,
                                defaultContent: ''
                            },

                            { data: 'network' },
                            { data: 'category' },
                            {
                                data: 'module',
                                render: function (data, type, row, meta) {
                                    if (type === 'display') {
                                        data = '<a href="javascript:API.prototype.searchByModuleColor(\'' + data + '\',\'' + row.category + '\',\'' + row.network + '\');" title="Find out more ...">' + data + '</a>';
                                    }
                                    return data;
                                }
                            },
                            {
                                data: 'gene',
                                title: 'overlap',
                                render: function (data, type, row, meta) {

                                    return data.length;
                                }
                            },
                            {
                                data: 'gene',
                                "visible": false,
                                "searchable": true
                            },
                            { data: 'fisher' },
                            {
                                data: 'FDR'
                            },
                            { data: 'Bonferroni' },
                            { data: 'size' },

                            {
                                data: 'go_report',
                                "visible": false,
                                "searchable": true
                            },
                            {
                                data: 'cell_type_pred',
                                "visible": false,
                                "searchable": true
                            }
                        ],
                        "order": [[5, 'asc']],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'excel', 'print',
                            {
                                text: 'EXPAND RESULTS',
                                action: function (e, dt, node, config) {
                                    //Hide table
                                    $('#globalSummariseReportOnGenes_div').hide();
                                    $('#globalReportOnGenes_div').show();
                                }
                            }
                        ]
                    });

                    /***********************************/
                    /******** 'Expand Results' *********/
                    /***********************************/
                    $('#globalReportOnGenes_table').DataTable({
                        data: JSON.parse(data),
                        deferRender: true,
                        columns: [
                            {
                                className: "details-control",
                                orderable: false,
                                data: null,
                                defaultContent: ''
                            },

                            { data: 'gene' },
                            { data: 'category' },
                            { data: 'network' },
                            { data: 'ensgene' },
                            { data: 'fisher' },
                            {
                                data: 'FDR'
                            },
                            { data: 'Bonferroni' },
                            {
                                data: 'module',
                                render: function (data, type, row, meta) {
                                    if (type === 'display') {
                                        data = '<a href="javascript:API.prototype.searchByModuleColor(\'' + data + '\',\'' + row.category + '\',\'' + row.network + '\');" title="Find out more ...">' + data + '</a>';
                                    }
                                    return data;
                                }
                            },
                            { data: 'mm' },
                            { data: 'size' },
                            {
                                data: 'go_report',
                                "visible": false,
                                "searchable": true
                            },
                            //{ data: 'pd_genes' },
                            //{ data: 'preservation' },
                            {
                                data: 'cell_type_pred',
                                "visible": false,
                                "searchable": true
                            }
                            //{ data: '_row' }
                        ],

                        "order": [[4, 'asc']],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'excel', 'print',
                            {
                                text: 'SUMMARISE CLUSTERING',

                                action: function (e, dt, node, config) {
                                    //Hide table
                                    $('#globalReportOnGenes_div').hide();
                                    $('#globalSummariseReportOnGenes_div').show();
                                }
                            }
                        ]
                    });



                    $("#globalReportOnGenes_div").show();
                    $("#error").hide();
                }

                $("body").removeClass("loading");

            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
    }
    catch (err) {
        $("body").removeClass("loading");
    }
}
API.prototype.reportOnGenesMultipleTissue = function (data, genes) {
    try {
        $.ajax({
            url: '/' + environment + '/API/PostReportOnGenesMultipleTissue',
            data: JSON.stringify({
                "MultipleSelectionData": data,
                "Genes": genes
            }),
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.indexOf("Problems") >= 0) {
                    $("#error").children("p").remove();
                    $("#error").append("<p>" + data + "</p>");
                    $("#error").show();
                }
                else {

                    console.log(data);

                    /***********************************/
                    /****** 'Sumarise Clustering' ******/
                    /***********************************/
                    //var myobject = _.groupBy(JSON.parse(data), ({ network, module }) => `${network}_${module}`);
                    //var mapped = _.map(myobject, o => ({ ...o[0], gene: _.pluck(o, 'gene') }));

                    var myobject = _.groupBy(JSON.parse(data), function (o) {
                        return o.network + '_' + o.module;
                    });
                    var mapped = _.map(myobject, function (group) {
                        return {
                            network: group[0].network,
                            category: group[0].category,
                            module: group[0].module,
                            gene: _.pluck(group, 'gene'),
                            fisher: group[0].fisher,
                            size: group[0].size,
                            go_report: group[0].go_report,
                            cell_type_pred: group[0].cell_type_pred
                        }
                    });
                    $('#summariseClustering_table').DataTable({
                        data: mapped,
                        deferRender: true,
                        columns: [
                            {
                                className: "details-control",
                                orderable: false,
                                data: null,
                                defaultContent: ''
                            },

                            { data: 'network' },
                            { data: 'category' },
                            {
                                data: 'module',
                                render: function (data, type, row, meta) {
                                    if (type === 'display') {
                                        data = '<a href="javascript:API.prototype.searchByModuleColor(\'' + data + '\',\'' + row.category + '\',\'' + row.network + '\');" title="Find out more ...">' + data + '</a>';
                                    }
                                    return data;
                                }
                            },
                            {
                                data: 'gene',
                                title: 'overlap',
                                render: function (data, type, row, meta) {

                                    return data.length;
                                }
                            },
                            {
                                data: 'gene',
                                "visible": false,
                                "searchable": true
                            },
                            { data: 'fisher' },
                            { data: 'size' },

                            {
                                data: 'go_report',
                                "visible": false,
                                "searchable": true
                            },
                            {
                                data: 'cell_type_pred',
                                "visible": false,
                                "searchable": true
                            }
                        ],
                        "order": [[5, 'asc']],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'excel', 'print',
                            {
                                text: 'EXPAND RESULTS',
                                action: function (e, dt, node, config) {
                                    //Hide table
                                    $('#summariseClustering_div').hide();
                                    $('#reportOnGenes_div').show();
                                }
                            }
                        ]
                    });
                    //$('#summariseClustering_table').DataTable().Columns["gene"].ColumnName = "overlap";
                    //$("#summariseClustering_div").show();


                    /***********************************/
                    /******** 'Expand Results' *********/
                    /***********************************/
                    $('#reportOnGenes_table').DataTable({
                        data: JSON.parse(data),
                        deferRender: true,
                        columns: [
                            {
                                className: "details-control",
                                orderable: false,
                                data: null,
                                defaultContent: ''
                            },
                            { data: 'gene' },
                            { data: 'category' },
                            { data: 'network' },
                            { data: 'ensgene' },
                            { data: 'fisher' },
                            {
                                data: 'module',
                                render: function (data, type, row, meta) {
                                    if (type === 'display') {
                                        data = '<a href="javascript:API.prototype.searchByModuleColor(\'' + data + '\',\'' + row.category + '\',\'' + row.network + '\');" title="Find out more ...">' + data + '</a>';
                                    }
                                    return data;
                                }
                            },
                            { data: 'mm' },
                            { data: 'size' },
                            {
                                data: 'go_report',
                                "visible": false,
                                "searchable": true
                            },
                            //{ data: 'pd_genes' },
                            //{ data: 'preservation' },
                            {
                                data: 'cell_type_pred',
                                "visible": false,
                                "searchable": true
                            }
                            //{ data: '_row' }
                        ],

                        "order": [[4, 'asc']],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'excel', 'print',
                            {
                                text: 'SUMMARISE CLUSTERING',

                                action: function (e, dt, node, config) {
                                    //Hide table
                                    $('#reportOnGenes_div').hide();
                                    $('#summariseClustering_div').show();
                                }
                                /*text: 'BEST RESULTS',
                                attr: {
                                    id: 'bestResults'
                                },
                                action: function (e, dt, node, config) {
                                    //Filter by pvalues lower than 0.05
                                    
                                    if ($('#bestResults').hasClass("pressed"))
                                        $('#bestResults').removeClass("pressed");
                                    else
                                        $('#bestResults').addClass("pressed");
                                    

                         
                                    $('#reportOnGenes_table').dataTable.ext.search.push(
                                        function (settings, data, dataIndex) {

                                            if ($('#bestResults').hasClass("pressed")) {
                                                var max = parseFloat(0.05);
                                                var pvalue = parseFloat(data[4]) || 0;

                                                if (isNaN(max) || pvalue <= max || isNaN(max) || pvalue <= max) {
                                                    return true;
                                                }
                                                return false;
                                            }
                                            else {
                                                return true;
                                            }
              
                                        }
                                    );
                                       

                                    dt.draw();
                                }*/
                            }
                        ]
                    });



                    $("#reportOnGenes_div").show();
                    $("#error").hide();
                }

                $("body").removeClass("loading");

            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
    }
    catch (err) {
        $("body").removeClass("loading");
    }
}
API.prototype.getCellTypeFromTissue = function (category, tissue, moduleColor) {
    if (moduleColor === undefined) {
        moduleColor = null;
    }
    $.ajax({
        url: '/' + environment + '/API/GetCellTypeFromTissue?Category=' + category + '&Network=' + tissue,
        type: 'GET',
        success: function (midata) {
            if (midata.indexOf("Problems") >= 0) {
                $("#cellType_divError").children("p").remove();
                $("#cellType_divError").append("<p>" + midata + "</p>");
                $("#cellType_divError").show();
            }
            else if (midata == "{}") {
                $("#cellType_divError").children("p").remove();
                $("#cellType_divError").append("<p>No data has been received!</p>");
                $("#cellType_divError").show();
            }
            else {
                console.log(midata);
                var columns = [];
                data = JSON.parse(midata);

                for (var i = 0; i < data.length; i++) {
                    var value = Object.keys(data[i]).sort();
                    data[i] = JSON.parse(JSON.stringify(data[i], value));
                }

                //Create array with columns to show
                columnNames = Object.keys(data[0]);
                //columnNames.unshift(columnNames.pop());

                for (var i in columnNames) {
                    if (moduleColor != null) {
                        if (i == 0 || columnNames[i] == moduleColor)
                            columns.push({
                                data: columnNames[i],
                                title: columnNames[i]
                            });
                        else
                            //Delete from 'data' all columns which are not in 'columns' array
                            for (var x = 0; x < data.length; x++)
                                delete data[x][columnNames[i]];
                    }
                    else
                        columns.push({
                            data: columnNames[i],
                            title: columnNames[i]
                        });
                }
                if (moduleColor == null) {
                    //Delete from 'data' all columns which only has 1s
                    var hasPValue = false;
                    for (var x = 1; x < columns.length; x++) {
                        for (var i = 0; i < data.length; i++)
                            if (data[i][columns[x]] !== 1) {
                                hasPValue = true;
                                break;
                            }
                        if (!hasPValue)
                            for (var i = 0; i < data.length; i++)
                                delete data[i][columns[x]]
                        hasPValue = false;
                    }
                    //Delete from 'data' all rows which only has 1s or 0s
                    hasPvalue = false;
                    for (var i = 0; i < data.length; i++) {
                        for (var x = 1; x < columns.length; x++)
                            //var dataValues = Object.keys(data[i]).map(function (itm) { return data[itm]; });
                            //var dataValues = Object.keys(obj).map(function (e) {
                            //    return obj[e]
                            //})
                            if (data[i][Object.keys(data[i])[x]] !== 1 && data[i][Object.keys(data[i])[x]]!== 0) {
                                hasPvalue = true;
                                break;
                            }
                        if (!hasPvalue) {
                            data.splice(i, 1);
                            i--;
                        }
                        hasPvalue = false;
                    }
                }
                else {
                    //Delete from 'data' all rows which only has 1s or 0s
                    for (var i = 0; i < data.length; i++) {
                        for (var x = 1; x < columns.length; x++)
                            //var dataValues = Object.keys(data[i]).map(function (itm) { return data[itm]; });
                            if (data[i][Object.keys(data[i])[x]] === 1 || data[i][Object.keys(data[i])[x]] === 0) {
                                data.splice(i, 1);
                                i--;
                            }
                    }
                }

                if (data[0] == undefined) {
                    //We show an error
                    $("#cellType_div").append("<p>The module '" + moduleColor + "' does not have any significant p-values over any cell type.</p>");
                }
                else {

                    $('#cellType_table').DataTable({
                        colReorder: true,
                        deferRender: true,
                        data: data,
                        columns: columns,
                        dom: 'Bfrtip',
                        autoWidth: false,
                        columnDefs: [
                            {
                                targets: 1,
                                className: 'noVis'
                            }
                        ],
                        buttons: [
                            'copy', 'excel', 'print'
                        ],
                        drawCallback: function () {
                            $('#cellType_table').find('td:not(:first-child):contains(.)').css('backgroundColor', 'yellow');
                        },
                        "scrollX": true,
                        //"scrollY": "390px",
                        paging: true,
                        scrollCollapse: true
                    })
                        .on('search.dt', function () {
                            var table = $('#cellType_table').DataTable();
                            table.columns({ "filter": "applied" }).every(function () {
                                if (this.data().unique().length == 1 && (this.data().unique()[0] == "1" || this.data().unique()[0] == "0"))
                                    this.visible(false);
                                else
                                    this.visible(true);
                            });
                        })
                    $('#cellType_table').DataTable().draw();
                }
                $("#cellType_div").show();
                $("#cellType_divError").hide();
                $('#cellType_table').DataTable().draw();
            }
            $("body").removeClass("loading");
            $("#tabs").show();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}
API.prototype.getGOFromTissue = function (category, tissue, module) {
    if (module === undefined) {
        module = null;
    }
    $.ajax({
        url: '/' + environment + '/API/GetGOFromTissue?Category=' + category + '&Network=' + tissue,
        type: 'GET',
        success: function (data) {
            if (data.indexOf("Problems") >= 0) {
                $("#goFromTissue_divError").children("p").remove();
                $("#goFromTissue_divError").append("<p>" + data + "</p>");
                $("#goFromTissue_divError").show();
            }
            else if (data == "{}") {
                $("#goFromTissue_divError").children("p").remove();
                $("#goFromTissue_divError").append("<p>No data has been received!</p>");
                $("#goFromTissue_divError").show();
            }
            else {
                console.log(data);
                data = JSON.parse(data);

                //Delete from 'data' all rows with p-value = 0
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["p_value"] === 0) { //TODO = check p-value column number
                        data.splice(i, 1);
                        i--;
                    }
                }

                $('#goFromTissue_table').DataTable({
                    data: data,
                    deferRender: true,
                    columns: [
                        {
                            "className": 'details-control',
                            "orderable": false,
                            "data": null,
                            "defaultContent": ''
                        },
                        { data: "query_number" },
                        { data: 'p_value' },
                        { data: 'query_size' },
                        {
                            data: 'term_id',
                            "visible": false,
                            "searchable": true
                        },
                        { data: 'domain' },
                        { data: 'term_name' },
                        {
                            data: 'intersection',
                            "visible": false,
                            "searchable": true
                        }
                    ],
                    order: [[2, 'asc']],
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'excel', 'print'
                    ]
                });
                if (module != null) {
                    $('#goFromTissue_table').DataTable()
                        .columns(1)
                        .search("^" + module + "$", true, false)
                        .draw();
                }
                $("#goFromTissue_divError").hide();
                $("#goFromTissue_div").show();
            }
            $("body").removeClass("loading");
            $("#tabs").show();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}
API.prototype.getAvailableNetworks = function (category, network) {
    if (network === undefined) {
        network = null;
    }
    if (network != null) {
        /*for (var i = 0; i < network.length; i++) {
            net_option = '<option value="' + network[i] + '" selected>' + network[i] + '</option>';
            $('#network')
                .append(net_option)
                .selectpicker('refresh');
        }*/
        net_option = '<option value="' + network + '" selected>' + network + '</option>';
        $('#network')
            .append(net_option)
            .selectpicker('refresh');
    }
    else
        $.ajax({
            url: '/' + environment + '/API/GetAvailableNetworks?Category=' + category,
            type: 'GET',
            success: function (data) {
                if (data.indexOf("Problems") >= 0) {
                    $("#goFromTissue_divError").children("p").remove();
                    $("#goFromTissue_divError").append("<p>" + data + "</p>");
                    $("#goFromTissue_divError").show();
                }
                else if (data == "{}") {
                    $("#goFromTissue_divError").children("p").remove();
                    $("#goFromTissue_divError").append("<p>No data has been received!</p>");
                    $("#goFromTissue_divError").show();
                }
                else {
                    $("#goFromTissue_divError").hide();
                    console.log(data);
                    data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        net_option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                        $('#network')
                            .append(net_option)
                            .selectpicker('refresh');
                    }
                }
            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
}
API.prototype.getNetworkCategories = function (category) {
    if (category === undefined) {
        category = null;
    }
    if (category != null) {
        /*for (var i = 0; i < category.length; i++) {
            option = '<option value="' + category[i] + '">' + category[i] + '</option>';
            $('#category')
                .append(option)
                .selectpicker('refresh');
        }*/
        option = '<option value="' + category + '" selected>' + category + '</option>';
        $('#category')
            .append(option)
            .selectpicker('refresh');
    }
    else
        $.ajax({
            url: '/' + environment + '/API/GetNetworkCategories',
            type: 'GET',
            success: function (data) {
                if (data.indexOf("Problems") >= 0) {
                    $("#goFromTissue_divError").children("p").remove();
                    $("#goFromTissue_divError").append("<p>" + data + "</p>");
                    $("#goFromTissue_divError").show();
                }
                else if (data == "{}") {
                    $("#goFromTissue_divError").children("p").remove();
                    $("#goFromTissue_divError").append("<p>No data has been received!</p>");
                    $("#goFromTissue_divError").show();
                }
                else {
                    $("#goFromTissue_divError").hide();
                    console.log(data);
                    data = JSON.parse(data);
                    //If the request has gone as expected, we fill the select by adding 'option' type elements:
                    for (var i = 0; i < data.length; i++) {
                        option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                        $('#category')
                            .append(option)
                            .selectpicker('refresh');
                    }
                }
            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
}
API.prototype.menuInit = function (view) {

    //Disable 'send' button
    $('#send_button').prop("disabled", true);

    if (view == 1) {
        //At the beginning, we fill the first select
        API.prototype.getNetworkCategories();

        //Disable second select
        $('#network')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Disable third select
        $('#module_selection')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Hide results divs
        $("#goFromTissue_div").hide();
        $("#cellType_div").hide();
        $("#error").hide();
    }
    else if (view == 11) {
        //if the model has data:
        var category = $("#Category").val();
        var network = $("#Network").val();
        var moduleColor = $("#ModuleColor").val();

        //At the beginning, we fill the first select
        API.prototype.getNetworkCategories(category);
        API.prototype.getAvailableNetworks(category, network);

        $('#category')
            .prop('disabled', true)
            .selectpicker('refresh');
        //Disable second select
        $('#network')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Disable third select
        $('#module_selection')
            .selectpicker('val', ['1', '2'])
            .prop('disabled', true)
            .selectpicker('refresh');

        $('#send_button').prop("disabled", true);

        $("body").addClass("loading");
        API.prototype.sendButtonFunction(view, moduleColor);  
    }
    else if (view == 2 || view == 3){
        //$('#genes')
        //    .prop('disabled', true);
        API.prototype.getTreeMenuData(); 
    }

    //When the value of the 'Category' changes:
    $('#category').on('change', function () {

        //Remove all options (from 'Network' select)
        $('#network').children().remove();
        //Fill the 'Network' with new options
        API.prototype.getAvailableNetworks(this.value);
        $('#network')
            .prop("disabled", false)
            .selectpicker('refresh');
        //Disable 'Send' button
        $('#send_button').prop("disabled", true);

        if (view == 1) {
            //Hide tabs
            $("#tabs").hide();
            //Hide results divs
            $("#goFromTissue_div").hide();
            $("#cellType_div").hide();
            //Clear and disable 'module_selection'
            $('#module_selection')
                .selectpicker('deselectAll')
                .prop('disabled', true)
                .selectpicker('refresh');
        }
        else if (view == 2) {
            $('#genes').val('');
            $('#genes').prop('disabled', true);
        }

    });
    //When the value of 'Network' changes:
    $('#network').on('change', function () {
        if (view == 1) {
            //Enable 'Module' select
            $('#module_selection')
                .prop('disabled', false)
                .selectpicker('refresh');
        }
        else if (view == 2) {
            $('#genes').val('');
            $('#genes').prop('disabled', false);
        }
    });
    //When the value of 'Network' changes:
    $('#module_selection').on('change', function () {
        //Enable 'button'
        $('#send_button').prop("disabled", false);
    });
    //When the value of 'Genes' textarea changes:
    $('#genes').on('change', function () {
        if ($('#genes').val() != "")
            //Enable 'button'
            $('#send_button').prop("disabled", false);
        else
            //Disable 'button'
            $('#send_button').prop("disabled", true);
    });
    //When the user press the 'Send' button:
    $('#send_button').on('click', function () {
        API.prototype.sendButtonFunction(view);
    });
    // Add event listener for opening and closing details
    $('#goFromTissue_table').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = $('#goFromTissue_table').DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            API.prototype.hideRowsGOFromTissue(row.data(), tr, row);
            
        }
    });
    // Add event listener for opening and closing details
    $('#reportOnGenes_table, #summariseClustering_table').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var id = $(this).closest("table")[0].id;

        var row = $('#'+id).DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            API.prototype.hideRowsReportOnGenes(row.data(), tr, row, id);
            
        }
    });
    $('#globalReportOnGenes_table, #globalSummariseReportOnGenes_table').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var id = $(this).closest("table")[0].id;

        var row = $('#' + id).DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            API.prototype.hideRowsReportOnGenes(row.data(), tr, row, id);

        }
    });

}

$.fn.dataTable.ext.errMode = 'none';
