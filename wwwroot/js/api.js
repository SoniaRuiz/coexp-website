/**
 * @fileoverview This file contains all JS functions needed for the correct performance
 * of CoExp webpage.
 * @author Sonia García Ruiz (s.ruiz@ucl.ac.uk)
 */


let API = function () {
    /// <summary>
    /// API namespace constructor
    /// </summary>
    this.SVGData = "";
    
};


/**
 * Function to initialize the menu's options in all views,
 * @param {number} view View to be initialised.
 */
API.prototype.menuInit = function (view) {
    
    if (view == 1) { 
        /*
         * This is the view for 'Network Catalog' tab
         * */
        $('#menu').show();
        $('#empty-initial-results').css("visibility","visible");
        //$('#empty-initial-results').show();
        //Disable 'send' button
        $('#send_button').prop("disabled", true);

        $('#category_dropdown').empty();
        //At the beginning, we fill the first select
        API.prototype.getNetworkCategories();

        //Disable second select
        $('#network_dropdown')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Disable third select
        $('#module_selection')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Hide results' divs
        $("#goFromTissue_div").hide();
        $("#cellType_div").hide();
        $("#error").hide();
    }
    else if (view == 11) {

        /*
         * This is the view for 'Network Catalog' tab when coming from 'Gene Set Annotation' view.
         * */
        $("body").addClass("loading");

        //Get model's data:
        const category = $("#Category").val();
        const network = $("#Network").val();
        const moduleColor = $("#ModuleColor").val();

        //At the beginning, we fill the selects
        API.prototype.getNetworkCategories(category);
        API.prototype.getAvailableNetworks(category, network);

        //Disable all selects and buttons
        //$('#category_dropdown')
        //    .prop('disabled', true)
        //    .selectpicker('refresh');
        //$('#network_dropdown')
        //    .prop('disabled', true)
        //    .selectpicker('refresh');
        $('#module_selection')
            .selectpicker('val', ['1', '2'])
            //.prop('disabled', true)
            .selectpicker('refresh');
        //$('#send_button').prop("disabled", true);

        

        //Force 'send' button's click event
        API.prototype.sendButtonFunction(view, moduleColor);  

        //Hide/show different elements from the menu
        $("div.navbar-collapse").children("ul").remove();
        $("#menu").show();
        $("#menu_data").hide();
        $("#footer").hide();
        $("#menu_gene_list").removeClass("hidden");
        $("#get_gene_list").click(function () {
            API.prototype.getMM(network, category, moduleColor);
            //alert("API.prototype.getMM('" + network + "', '" + category + "', '" + moduleColor + "');")
        })
    }
    else if (view == 2 || view == 3) {
        /*
         * This is the view for 'Network Catalog' tab
         * */

        //Fill the tree-menu
        API.prototype.getTreeMenuData(); 
        
    }
    else if (view == 4) {
        
        /*
         * This is the view for 'Plot' tab
         * */
        $('#category_dropdown').empty();
        //At the beginning, we fill the select
        API.prototype.getNetworkCategories();
       
        //Disable second select
        $('#network_dropdown')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Disable third select
        $('#module_dropdown')
            .prop('disabled', true);

        //Disable buttons
        //Range for the number of genes
        $('#genes-range').prop("disabled", true);
        $('#text-box_genes-range').prop("disabled", true);
        //Range for the links connection
        $('#slider-range-treshold').prop("disabled", true);
        $('#threshold_network').prop("disabled", true);
        //Buttons
        $('#send_button').prop("disabled", true);
        $('#save_plot').prop("disabled", true);
        $('#save_data').prop("disabled", true);
    }

    /*
    * Regardless the view selected, some actions are common across some views.
    * */

    //When the value of the 'Category' changes:
    $('#category_dropdown').on('change', function () {

        //Remove all options (from 'Network' dropdown)
        $('#network_dropdown').children().remove();
        //Fill the 'Network' with new options and enable 'network' dropdown
        API.prototype.getAvailableNetworks(this.value);
        $('#network_dropdown')
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
        else if (view == 4) {
            $('#module_dropdown').children().remove();
            //Clear and disable 'module_selection'
            $('#module_dropdown')
                .prop('disabled', true)
                .selectpicker('refresh');
        }


    });
    //When the value of 'Network' changes:
    $('#network_dropdown').on('change', function () {
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
        else if (view == 4) {
            $('#module_dropdown').children().remove();
            API.prototype.getAvailableModules($('#category_dropdown').val(),
                this.value);
            //Disable third select
            $('#module_dropdown')
                .prop('disabled', false);

            //$('#genes-range').prop("disabled", false);
            //$('#text-box_genes-range').prop("disabled", false);

            //$('#send_button').prop("disabled", false);
        }
    });
    $('#module_dropdown').on('change', function () {
        if (view == 4) {

            $('#genes-range').prop("disabled", false);
            $('#text-box_genes-range').prop("disabled", false);

            $('#send_button').prop("disabled", false);
        }
    });
    //When the value of 'Module_selection' changes:
    $('#module_selection').on('change', function () {
        //Enable 'button'
        $('#send_button').prop("disabled", false);
    });

    //When the user press the 'Send' button:
    $('#send_button').on('click', function () {
        API.prototype.sendButtonFunction(view);
    });
    //When the user press the 'Save Plot' button (in 'Plot' view):
    $('#save_plot').on('click', function () {
        API.prototype.downloadSVGPlot();
    });
    //When the user press the 'Save Data' button (in 'Plot' view):
    $('#save_data').on('click', function () {
        API.prototype.downloadSVGData();
    });

    // Add event listener for opening and closing table details
    $('#goFromTissue_table').on('click', 'td.details-control', function () {

        const tr = $(this).closest('tr');
        const row = $('#goFromTissue_table').DataTable().row(tr);

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
    $('#globalReportOnGenes_table, #globalSummariseReportOnGenes_table, #reportOnGenes_table, #summariseClustering_table').on('click', 'td.details-control', function () {
        const tr = $(this).closest('tr');
        const id = $(this).closest("table")[0].id;
        const row = $('#' + id).DataTable().row(tr);

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

/**
 * Function to request all categories available in CoExp R software
 * @param {string} category Category's name selected by the user (in case of requesting from 'Get Set Annotation' tab).
 */
API.prototype.getNetworkCategories = function (category) {

    if (category === undefined) {
        category = null;
    }
    if (category != null) {
        //This option will be executed only when requesting from 'Gen set annotation' tab
        const option = '<option value="' + category + '" selected>' + category + '</option>';
        $('#category_dropdown')
            .append(option)
            .selectpicker('refresh');
    }
    else
        //Make a request to CoExp-R-software's API
        $.ajax({
            url: "http://rcoexp:8800/getNetworkCategories",//'/' + environment + '/API/GetNetworkCategories',
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
                    for (let i = 0; i < data.length; i++) {
                        const option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                        $('#category_dropdown')
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

/**
 * Function to request all categories' networks available in CoExp R software
 * @param {string} category Category's name selected by the user.
 * @param {string} network Network's name selected by the user. (in case of requesting from 'Get Set Annotation' tab).
 */
API.prototype.getAvailableNetworks = function (category, network) {

    if (network === undefined) {
        network = null;
    }
    if (network != null) {
        //This option will be executed only when requesting from 'Gen set annotation' tab
        const net_option = '<option value="' + network + '" selected>' + network + '</option>';
        $('#network_dropdown')
            .append(net_option)
            .selectpicker('refresh');
    }
    else {
        //Make a request to CoExp-R-software's API

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
                    for (let i = 0; i < data.length; i++) {
                        const net_option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                        $('#network_dropdown')
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
}

API.prototype.getAvailableModules = function (category, network) {

    if (category === undefined || network === undefined) {
        alert("Please, select a category and network values.")
    }
    else {
        //Make a request to CoExp-R-software's API

        $.ajax({
            url: '/' + environment + '/API/GetAvailableModules?Category=' + category + '&Network=' + network,
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
                    for (let i = 0; i < data.length; i++) {
                        const net_option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                        $('#module_dropdown')
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
}

/**
 * This function requests all data in a tree-menu format and fills it.
 */
API.prototype.getTreeMenuData = function () {

    $.ajax({
        url: '/' + environment + '/API/GetTreeMenuData',
        type: 'GET',
        success: function (data) {
            console.log(data);
            if (data.indexOf("Problems") >= 0) {
                $("#error").children("p").remove();
                $("#error").append("<p>" + data + "</p>");
                $("#empty-initial-results").hide();
                $("#error").show();
            }
            else {
                //The request has gone well. We fill the tree-menu.
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
                //Expand and mark the first option of the tree-menu
                $("ul.show").removeClass("show");//.find("ul.show").addClass("show");
                $("li[data-id = '100']").closest("ul").first().addClass("show");
                $("li[data-id = '1']").closest("ul").addClass("show");

                $("ul.sim-tree").find("i.sim-tree-checkbox").first().addClass("sim-tree-semi")
                $("li[data-id = '1']").find("i.sim-tree-checkbox").first().addClass("sim-tree-semi")
                $("li[data-id = '100']").find("i.sim-tree-checkbox").first().addClass("checked")

                startIntro();
            }
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
        }
    });
}

/**
 * Function to send all data selected by the user to CoExp R software.
 * The results and actions to be done depend on the view selected.
 * @param {number} view View to be initialised.
 * @param {string} moduleColor Module color. (in case of requesting from 'Get Set Annotation' tab).
 */
API.prototype.sendButtonFunction = function (view, moduleColor) {

    if (moduleColor === undefined) {
        moduleColor = null;
    }

    
    $("body").addClass("loading");

    if (view == 1 || view == 11) {

        /*
         * 'Network Catalog' tab
         * */

        //hide previous errors/results
        $('#error').hide();
        //get the selection-types selected
        const module_selection_types = $('#module_selection').val();

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
                API.prototype.getGOFromTissue($('#category_dropdown').val(), $('#network_dropdown').val(), moduleColor);
                //hide/sow tabs and divs
                $("#cellType_div").hide();
                $("#empty-initial-results").hide();
                $('.nav-tabs a[href="#tab1"]').tab("show");
                $('.nav-tabs a[href="#tab1"]').tab().show();
                $('.nav-tabs a[href="#tab2"]').tab().hide();
            }
            else {//only bycelltype
                API.prototype.getCellTypeFromTissue($('#category_dropdown').val(), $('#network_dropdown').val(), moduleColor);
                //hide/sow tabs and divs
                $("#goFromTissue_div").hide();
                $("#empty-initial-results").hide();
                $('.nav-tabs a[href="#tab2"]').tab("show");
                $('.nav-tabs a[href="#tab2"]').tab().show();
                $('.nav-tabs a[href="#tab1"]').tab().hide();
            }
        }
        else if (module_selection_types.length == 2) {//both bycelltype and bycolor
            API.prototype.getGOFromTissue($('#category_dropdown').val(), $('#network_dropdown').val(), moduleColor);
            API.prototype.getCellTypeFromTissue($('#category_dropdown').val(), $('#network_dropdown').val(), moduleColor);
            $("#empty-initial-results").hide();
            //Show all tabs
            $('.nav-tabs a[href="#tab1"]').tab("show");
            $('.nav-tabs a[href="#tab1"]').tab().show();
            $('.nav-tabs a[href="#tab2"]').tab().show();
        }
        else {
            $('#goFromTissue_div').hide();
            $('#cellType_div').hide();
            $("#empty-initial-results").hide();
            $('#error').show();
            $("body").removeClass("loading");
        }

    }
    else if (view == 2 || view == 3) {

        /*
         * 'Gen Set Annotation' tab
         * */

        if ($('#genes').val() == "") {
            alert("Please, enter your gene set.")
            $("body").removeClass("loading");
        }
        else if ($("i.checked").length == 0) {
            alert("Please, select your preferred network.")
            $("body").removeClass("loading");
        }
        else {

            $("body").addClass("loading");
            $("genes").focus();

            //REMOVING OLD DATATABLES
            if (view == 2) {
                $('#reportOnGenes_div').hide();
                $('#summariseClustering_div').hide();
                if ($('#reportOnGenes_table tr').length > 1) {
                    $('#reportOnGenes_table').DataTable().destroy();
                }
                if ($('#summariseClustering_table tr').length > 1) {
                    $('#summariseClustering_table').DataTable().destroy();
                }
            } else if (view == 3) {
                $('#globalReportOnGenes_div').hide();
                $('#globalSummariseReportOnGenes_div').hide();
                if ($('#globalReportOnGenes_table tr').length > 1) {
                    $('#globalReportOnGenes_table').DataTable().destroy();
                }
                if ($('#globalSummariseReportOnGenes_table tr').length > 1) {
                    $('#globalSummariseReportOnGenes_table').DataTable().destroy();
                }
            }
            
            //ERROR CHECK
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
            else {
                // Get the data selected by the user
                let data = "";
                const categories = $("i.checked").closest("li [data-level*=2]");//.children().eq(1).text();
                for (let i = 0; i < categories.length; i++) {
                    const categoryLabel = $(categories[i]).children().eq(1).text();
                    const networks = $(categories[i]).children("ul").find("i.checked").parent();
                    let networkLabel = null;
                    networks.each(function (i, val) {
                        if (i == 0)
                            networkLabel = val.innerText;
                        else
                            networkLabel = networkLabel + "," + val.innerText
                    })
                    data = data + categoryLabel + "|" + networkLabel + "**";
                }
                //Make the request
                if (($('#genes').val()).indexOf('\n') > -1) {
                    const formatedGenes = $('#genes').val().replace(/\n/g, " ");

                    if (view == 2) {
                        API.prototype.reportOnGenesMultipleTissue(data, formatedGenes);
                    } else if (view == 3) {
                        API.prototype.globalReportOnGenes(data, formatedGenes);
                    }
                }
                else {
                    if (view == 2) {
                        API.prototype.reportOnGenesMultipleTissue(data, $('#genes').val());
                    } else if (view == 3) {
                        API.prototype.globalReportOnGenes(data, $('#genes').val());
                    }
                }
            }
        }
    }
    else if (view == 4) {

        /*
         * 'Plot' tab
         * */
        $('#empty-initial-results').hide();
        API.prototype.generateGraph();
        $('#plot_area').show();
        $("body").removeClass("loading");
        $('#save_plot').prop("disabled", false);
        $('#save_data').prop("disabled", false);
    }
}

/**
 * Function to make a request to 'getGOFromTissue' CoExp R method.
 * The user is on 'network catalog' tab.
 * @param {string} category Category selected by the user.
 * @param {string} tissue Category's network selected by the user.
 * @param {string} moduleColor Module color selected by the user. (in case of requesting from 'Get Set Annotation' tab).
 */
API.prototype.getGOFromTissue = function (category, tissue, moduleColor) {
    if (moduleColor === undefined) {
        moduleColor = null;
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
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["p_value"] === 0) { //TODO = check p-value column number
                        data.splice(i, 1);
                        i--;
                    }
                }
                //Render datatable with the results
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
                        {
                            data: 'query_number',
                            render: function (data, type, row, meta) {
                                if (type === 'display' && $("#ModuleColor").val() === "") {
                                    data = '<a href="javascript:API.prototype.searchByModuleColor(\'' + data + '\',\'' + $('#category_dropdown').val() + '\',\'' + $('#network_dropdown').val() + '\');" title="Find out more ...">' + data + '</a>';
                                } 
                                return data;
                            }
                        },
                        //{ data: "query_number" },
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
                if (moduleColor != null) {
                    $('#goFromTissue_table').DataTable()
                        .columns(1)
                        .search("^" + moduleColor + "$", true, false)
                        .draw();
                }
                $("#goFromTissue_divError").hide();
                $("#goFromTissue_div").show();
            }
            $("body").removeClass("loading");
            $("#empty-initial-results").hide();
            $("#tabs").show();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}

/**
 * Function to make a request to 'getCellTypeFromTissue' CoExp R method.
 * The user is in the 'network catalog' tab.
 * @param {string} category Category selected by the user.
 * @param {string} tissue Category's network selected by the user.
 * @param {string} moduleColor Module color selected by the user. (in case of requesting from 'Get Set Annotation' tab).
 */
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
                let columns = [];
                let value = null;
                data = JSON.parse(midata);

                for (let i = 0; i < data.length; i++) {
                    value = Object.keys(data[i]).sort();
                    data[i] = JSON.parse(JSON.stringify(data[i], value));
                }

                //Create array with columns to show
                columnNames = Object.keys(data[0]);
                //columnNames.unshift(columnNames.pop());

                for (let i in columnNames) {
                    if (moduleColor != null) {
                        if (i == 0 || columnNames[i] == moduleColor)
                            columns.push({
                                data: columnNames[i],
                                title: columnNames[i]
                            });
                        else
                            //Delete from 'data' all columns which are not in 'columns' array
                            for (let x = 0; x < data.length; x++)
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
                    let hasPValue = false;
                    for (let x = 1; x < columns.length; x++) {
                        for (let i = 0; i < data.length; i++)
                            if (data[i][columns[x]] !== 1) {
                                hasPValue = true;
                                break;
                            }
                        if (!hasPValue)
                            for (let i = 0; i < data.length; i++)
                                delete data[i][columns[x]]
                        hasPValue = false;
                    }
                    //Delete from 'data' all rows which only has 1s or 0s
                    hasPvalue = false;
                    for (let i = 0; i < data.length; i++) {
                        for (let x = 1; x < columns.length; x++)
                            if (data[i][Object.keys(data[i])[x]] !== 1 && data[i][Object.keys(data[i])[x]] !== 0) {
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
                    for (let i = 0; i < data.length; i++) {
                        for (let x = 1; x < columns.length; x++)
                            if (data[i][Object.keys(data[i])[x]] === 1 || data[i][Object.keys(data[i])[x]] === 0) {
                                data.splice(i, 1);
                                i--;
                            }
                    }
                }

                if (data[0] == undefined) {
                    //We show an error
                    $('#cellType_table').hide();
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
                            const table = $('#cellType_table').DataTable();
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
                //$('#cellType_table').DataTable().draw();
            }
            $("body").removeClass("loading");
            $("#empty-initial-results").hide();
            $("#tabs").show();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}

/**
 * Function to make a request to 'reportOnGenesMultipleTissue' CoExp R method.
 * The user is in the 'gene set annotation' tab.
 * @param {string} data Set of categories and networks selected by the user in the tree-menu.
 * @param {string} genes Gene or set of genes typed by the user.
 */
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
                    $('#empty-initial-results').hide();
                }
                else {

                    console.log(data);

                    /***********************************/
                    /****** 'Sumarise Clustering' ******/
                    /***********************************/

                    const myobject = _.groupBy(JSON.parse(data), function (o) {
                        return o.network + '_' + o.module;
                    });
                    const mapped = _.map(myobject, function (group) {
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
                            },

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
                                    $('#empty-initial-results').hide();
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
                                    $('#empty-initial-results').hide();
                                    $('#summariseClustering_div').show();
                                }
                            }
                        ]
                    });
                    $("#reportOnGenes_div").show();
                    $('#empty-initial-results').hide();
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

/**
 * Function to make a request to 'globalReportOnGenes' CoExp R method.
 * The user is in the 'gene set annotation' tab.
 * @param {string} data Set of categories and networks selected by the user in the tree-menu.
 * @param {string} genes Gene or set of genes typed by the user.
 */
API.prototype.globalReportOnGenes = function (data, genes) {
    try {
        $.ajax({
            url: '/' + environment + '/API/PostGlobalReportOnGenes',
            data: JSON.stringify({
                "MultipleSelectionData": "{" + data + "}",
                "Genes": genes
            }),
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                if (data.indexOf("Problems") >= 0) {
                    $("#error").empty();
                    $("#error").append("<h4>Sorry, none of the introduced genes have been found in any of the selected networks.</h4><p>Please, try again with another network selection.</p>");
                    $("#error").show();
                    $("body").removeClass("loading");
                    $('#empty-initial-results').hide();
                }
                else if (data.indexOf("Please") >= 0) {
                    /*$("#error").children("p").remove();
                    $("#error").append("<p>" + data + "</p>");
                    $("#error").show();*/
                    alert(data);
                    $("body").removeClass("loading");
                }
                else {
                    API.prototype.checkGenesFound(data);


                    if (JSON.parse(data).message !== undefined) {
                        data = JSON.parse(data);
                        const r = confirm(data.message);
                        if (r == true) {
                            API.prototype.globalReportOnGenes(data.multipleData, data.genes);
                        }
                        else {
                            $("body").removeClass("loading");
                        }
                    }
                    else {

                        console.log(data);

                        /***********************************/
                        /****** 'Sumarise Clustering' ******/
                        /***********************************/
                        const myobject = _.groupBy(JSON.parse(data), function (o) {
                            return o.network + '_' + o.module;
                        });
                        const mapped = _.map(myobject, function (group) {
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
                                        $('#empty-initial-results').hide();
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
                                        $('#empty-initial-results').hide();
                                    }
                                }
                            ]
                        });
                        $("body").removeClass("loading");
                        /*$("#globalReportOnGenes_div").show();
                        $('#empty-initial-results').hide();
                        $("#error").hide();
                        $("body").removeClass("loading");*/
                    }
                }

                

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

/**
 * Function to show the 'Network Catalog' view from the 'Gene set annotation' tab.
 * The user is in the 'get set annotation' tab.
 * @param {string} moduleColor Module color selected by the user. The user
 * wants to know the 'getGOFromTissue' and 'getCellTypeFromTissue' information about the module-color selected.
 * @param {string} category Module-color's category.
 * @param {string} network Module-color's network.
 */
API.prototype.searchByModuleColor = function (moduleColor, category, network) {
    /* We open a new window, showing the 'Network catalog' tab. 
     * This tab will only have information related with the module color clicked by the user.
     * */
    window.open(url = "/" + environment + "/Run/Catalog?category=" + category + "&network=" + network + "&modulecolor=" + moduleColor,
        '', 'toolbar= 0, scrollbars = 1, statusbar = 0,menubar=0,resizable=0,height=500,width=1200');
}

/**
 * Function to show expand/contract the table's rows. 
 * This table correspond to the 'by ontology' table in the 'network catalog' tab.
 * @param {string} d Original data object for the row.
 * @param {string} tr Table's tr element (html element) to expand/contract
 * @param {string} row Table's row element to expand/contract.
 */
API.prototype.hideRowsGOFromTissue = function (d, tr, row) {/* Formatting function for row details */

    const term = (d.term_id).split(':');
    const id = term[1];
    let url = "";
    let dataToSend = "";
    let allgenes = "";

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
        allgenes = (d.intersection).split(", ");
    else if ((d.intersection).indexOf(" ") >= 0)
        allgenes = (d.intersection).split(" ");

    let finalGenesString = null;
    for (let i = 0; i < allgenes.length; i++) {
        const vizER_url = "https://snca.atica.um.es/browser/app/vizER/?gene=" + allgenes[i];
        const gtex_url = "https://gtexportal.org/home/gene/" + allgenes[i];
        const gene_cards = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" + allgenes[i];

        let dataContent = 'Check in splicing reads in <a href=\"' + vizER_url + '\" target=\"_blank\">vizER</a>.<br/>';
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
            $("body").addClass("loading");
            data = JSON.parse(data);
            let finalOntologyString = null;

            if (term[0] == "GO" && data["results"].length > 0) {
                data = data["results"][0];
                const goInfo = "<b>Id: </b> " + data.id
                    + "<br/><b>Name: </b> " + data.name
                    + "<br/><b>Aspect: </b> " + data.aspect
                    + "<br/><b>Definition: </b> " + data.definition.text + "<br/>";

                finalOntologyString = "<a id='" + id + "' href='#' data-trigger='hover' data-html='true' data-placement='bottom' title='" + d.term_id + "' data-content='" + goInfo + "'>" + d.term_id + "</a>";
            }
            else if (term[0] == "REAC" && data.dbId != null) {
                console.log(data);
                let lastElement = "";

                if (data.isInDisease) {
                    lastElement = "<br/><b>Disease: </b> (" + data.disease[0].displayName + ") " + data.disease[0].definition + "<br/>";
                }
                else if (data.goBiologicalProcess != undefined) {
                    lastElement = "<br/><b>Biological Process: </b> " + data.goBiologicalProcess.definition + "<br/>";
                }
                const reacInfo = "<b>Id: </b> " + d.term_id
                    + "<br/><b>Name: </b> " + data.displayName
                    + "<br/><b>Species: </b> " + data.speciesName
                    + lastElement;

                finalOntologyString = "<a id='" + id + "' href='#' data-trigger='hover' data-html='true' data-placement='bottom' title='" + d.term_id + "' data-content='" + reacInfo + "'>" + d.term_id + "</a>";
            }
            else if (term[0] == "KEGG" && data.length > 0) {
                data = data[0];

                let lastElement = "";
                if (data.description != "") {
                    lastElement = "<b>Description: </b> " + data.description + "<br/>";
                }
                else if (data.diseases != "") {
                    lastElement = lastElement + "<b>Diseases: </b> ";
                    for (let disease in data.diseases) {
                        lastElement = lastElement + data.diseases[disease] + "<br/>";
                    }
                }
                const keggInfo = "<b>Id: </b> " + data.entry_id
                    + "<br/><b>Name: </b> " + data.name + "<br/>"
                    + lastElement;

                finalOntologyString = "<a id='" + id + "' href='#' data-trigger='hover' data-html='true' data-placement='bottom' title='" + d.term_id + "' data-content='" + keggInfo + "'>" + d.term_id + "</a>";
            }
            $("body").removeClass("loading");
            const table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
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

/**
 * Function to show expand/contract the table's rows. 
 * This table correspond to the table within the 'gene set annotation' tab.
 * @param {string} d Original data object for the row.
 * @param {string} tr Table's tr element (html element) to expand/contract
 * @param {string} row Table's row element to expand/contract.
 * @param {string} id Table's id. This is for checking whether the user is in the 'summarise' or 'expand' table view.
 */
API.prototype.hideRowsReportOnGenes = function (d, tr, row, id) {/* Formatting function for row details */
    $("body").addClass("loading");
    let genes = "";
    let finalGoReport = d.go_report;
    const allGOTerms = d.go_report.match(/GO:[0-9]*/g);

    if (allGOTerms != null) {
        for (let i = 0; i < allGOTerms.length; i++) {
            finalGoReport = finalGoReport.replace(allGOTerms[i], "<a id='" + allGOTerms[i] +
                "' href='#' onmouseover='javascript:API.prototype.getCardData(\"" + allGOTerms[i] +
                "\")' data-placement='bottom' data-trigger='hover' data-html='true' title='" + allGOTerms[i] +
                "' data-content='<div class=\"loader\"></div>'>" + allGOTerms[i] + "</a>");
        }
    }
    else
        finalGoReport = "no data"

    if (id.toLowerCase().indexOf("summarise") >= 0) {

        /*********************************/
        /************* GENES *************/
        /*********************************/

        let finalGenesString = null;
        for (let i = 0; i < (d.gene).length; i++) {
            const vizER_url = "https://snca.atica.um.es/browser/app/vizER/?gene=" + d.gene[i];
            const gtex_url = "https://gtexportal.org/home/gene/" + d.gene[i];
            const gene_cards = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=" + d.gene[i];

            let dataContent = 'Check in splicing reads in <a href=\"' + vizER_url + '\" target=\"_blank\">vizER</a>.<br/>';
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
    const table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
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
    $("body").removeClass("loading");
    row.child(table).show();
    tr.addClass('shown');
    $("[data-placement='bottom']").popover();
}

/**
 * Function to request gene's data and show it within a card. 
 * @param {string} term Gene name.
 */
API.prototype.getCardData = function (term) {
    
        
    let url = '/' + environment + '/API/GetInfoFromQuickGO';

    $.ajax({
        url: url,
        type: 'POST',
        data: { term: term },
        success: function (data) {
            data = JSON.parse(data);
            if (data["results"].length > 0) {

                data = data["results"][0];
                const goInfo = "<b>Id: </b> " + data.id
                    + "<br/><b>Name: </b> " + data.name
                    + "<br/><b>Aspect: </b> " + data.aspect
                    + "<br/><b>Definition</b><br/>" + data.definition.text + "<br/>";

                const goTerm = (this.data).split("%3A")[1];
                $("a[id*='" + goTerm + "']").attr("data-content", goInfo);

   
                var popover = $("a[id*='" + goTerm + "']").data('bs.popover');
                popover.setContent();
                popover.$tip.addClass(popover.options.placement);

            }
        },
        error: function () {
            return "No results found!";
        }
    });

    
}

/**
 * Function to generate the graph within the 'Plot' tab. 
 */
API.prototype.generateGraph = function () {
    
    // Clean older graphs
    $("#network_plot").html('');
    const category = $('#category_dropdown').find(":selected").val();
    // Get tissue value
    const network = $('#network_dropdown').find(":selected").val();
    // Get module value
    const moduleColor = $('#module_dropdown').find(":selected").val();
    // Get slider-range value
    const top = $('#text-box_genes-range').val();

    //const url_network_plot = '/' + environment + '/API/PostGetModuleTOMGraph?moduleColor=' + moduleColor + '&network=' + network + '&top=' + top;
    try {
        $("body").addClass("loading");
        $.ajax({
            url: '/' + environment + '/API/PostGetModuleTOMGraph',
            data: JSON.stringify({
                "Category": category,
                "Network": network,
                "ModuleColor": moduleColor,
                "TopGenes": top
            }),
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                if (data.indexOf("Problems") >= 0) {
                    $("#error").empty();
                    $("#error").append("<h4>Sorry, an error has ocurred when generating the plot.</h4>",data,"<p>Please, try again with another selection.</p>");
                    $("#error").show();
                    $("body").removeClass("loading");
                    $('#empty-initial-results').hide();
                }
                //else if (data.indexOf("Please") >= 0) {
                //    /*$("#error").children("p").remove();
                //    $("#error").append("<p>" + data + "</p>");
                //    $("#error").show();*/
                //    alert(data);
                //    $("body").removeClass("loading");
                //}
                else {
                    
                    //Update global variable with the JSON data. Necessary to download the xlsx file.
                    data = JSON.parse(data);
                    console.log(data);
                    APIPlot.prototype.netPlot(data);
                    $("#slider-range-treshold").prop('disabled', false);
                    //$("#threshold_network").prop('disabled', false);
                    $("#hide_nodes").prop('disabled', false);
                    $("body").removeClass("loading");
                }
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


    //make request
    //$.ajax({
    //    url: url_network_plot,
    //    type: 'GET',
    //    success: function (data) {
    //        //const generateCSV = () => {
    //        console.log(JSON.parse(data))

    //        data = JSON.parse(data);
    //        net_plot(data);

    //        //Update global variable with the JSON data. Necessary to download the xlsx file.
    //        SVGData = data;

    //        //Range for the links connection
    //        $('#slider-range-treshold').prop("disabled", false);
    //        $('#threshold_network').prop("disabled", false);
    //    },
    //    error: function () { }
    //});
}

/**
 * Function to download a png image from the SVG graph. 
 */
API.prototype.downloadSVGPlot = function () {
    $("body").addClass("loading");
    // Serialize the SVG object
    const svgNode = document.getElementsByTagName('svg')[0];
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    const width = $("#network_plot").innerWidth()*3;
    const height = $("#network_plot").innerHeight()*3;


    // Fill the canvas object with the serialized SVG object
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;


    const category = $('#category_dropdown').find(":selected").val();
    const network = $('#network_dropdown').find(":selected").val();
    const moduleColor = $('#module_dropdown').find(":selected").val();
    const top = $('#text-box_genes-range').val();
    var dt = new Date();
    var time = dt.getDay() + "-" + dt.getMonth() + "-" + dt.getFullYear()
    const fileName = category + '_' + network + '_' + moduleColor + '_' + top + 'genes_' + time + '.png';


    let image = new Image();
    image.onload = function () {
        ctx.clearRect(0, 0, width, height);
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "white"; // : "rgb(43,43,43)";
        ctx.fill();
        ctx.drawImage(image, 0, 0, width, height);
      
        if (canvas.msToBlob) { //for IE
            //const blob = canvas.msToBlob();
            //window.navigator.msSaveBlob(blob, 'test.png');
            alert("This feature is only available on Chrome and Firefox.");          
        } else {
            let link = document.createElement('a');
            link.setAttribute('download', fileName);
            link.setAttribute('href', canvas.toDataURL("image/png",1).replace("image/png", "image/octet-stream"));
            // create a mouse event
            let event = new MouseEvent('click');
            // dispatching it will open a save as dialog in FF
            link.dispatchEvent(event);
        }
    };

    image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    $("body").removeClass("loading");
}

/**
 * Function to download the plot's raw data. The data is downloaded using a xlsx file. 
 */
API.prototype.downloadSVGData = function () {

    /* make the worksheet */
    const ws = XLSX.utils.json_to_sheet(SVGData.nodes, { header: Object.keys(SVGData.nodes[1]) })

    /* add to workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CoExpData");

    const category = $('#category_dropdown').find(":selected").val();
    const network = $('#network_dropdown').find(":selected").val();
    const moduleColor = $('#module_dropdown').find(":selected").val();
    const top = $('#text-box_genes-range').val();
    var dt = new Date();
    var time = dt.getDay() + "-" + dt.getMonth() + "-" + dt.getFullYear()
    const fileName = category + '_' + network + '_' + moduleColor + '_' + top + 'genes_' + time + '.xlsx';

    /* generate an XLSX file */
    XLSX.writeFile(wb, fileName); 
}

API.prototype.getMM = function (network, category, module) {


   
    if (category === undefined || network === undefined || module === undefined) {
        alert("No data received.")
    }
    else
        //Make a request to CoExp-R-software's API
        $.ajax({
            url: '/' + environment + '/API/GetMM?Category=' + category + '&Network=' + network + '&ModuleColor=' + module,
            type: 'GET',
            success: function (data) {

                $("#goFromTissue_divError").hide();
                console.log(data);

                var createXLSLFormatObj = [];

                /* XLS Head Columns */
                var xlsHeader = ["ensgene", "name", "module", "mm"];

                /* XLS Rows Data */
                var xlsRows = JSON.parse(data);


                createXLSLFormatObj.push(xlsHeader);
                $.each(xlsRows, function (index, value) {
                    var innerRowData = [];
                    //$("tbody").append('<tr><td>' + value.EmployeeID + '</td><td>' + value.FullName + '</td></tr>');
                    $.each(value, function (ind, val) {

                        innerRowData.push(val);
                    });
                    createXLSLFormatObj.push(innerRowData);
                });


            /* File Name */
                var dt = new Date();
                var time = dt.getDay() + "-" + dt.getMonth() + "-" + dt.getFullYear();
                var filename = category + "_" + network + "_" + module + "_" + time + ".xlsx";

                /* Sheet Name */
                var ws_name = "FreakySheet";

                if (typeof console !== 'undefined') console.log(new Date());
                var wb = XLSX.utils.book_new(),
                    ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

                /* Add worksheet to workbook */
                XLSX.utils.book_append_sheet(wb, ws, ws_name);

                /* Write workbook and Download */
                if (typeof console !== 'undefined') console.log(new Date());
                XLSX.writeFile(wb, filename);
                if (typeof console !== 'undefined') console.log(new Date());
            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
}

API.prototype.sendFeedback = function() {

    let comments = $("#feedback_comments").val();
    let grade_experience = $('input[name=feedback_radio]:checked').val()
    let name_feedback = $('#feedback_name').val()
    let email_feedback = $('#feedback_email').val()
    var email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (name_feedback == "") {
        alert("Please, introduce your name.")
    } else if (email_feedback == "") {
        alert("Please, introduce your email.")
    } else if (comments == "") {
        alert("Please, introduce your comments.")
    } else if (!email_regex.test(email_feedback)) {
        alert("You have entered an invalid e-mail address. Please, try it again.")
    } else {

        //Make a request to CoExp-R-software's API
        $.ajax({
            url: '/' + environment + '/API/SendFeedback?Name=' + name_feedback + '&Address=' + email_feedback
                +'&Subject=CoExp_Feedback&Content=' + comments + '&LevelSatisfaction=' + grade_experience,
            type: 'GET',
            success: function (data) {
                alert("Your feedback has been successfully sent! Thanks for taking the time to provide it!\n")
                $("#close_feedback").trigger("click")
            },
            error: function (data) {
                //If an error occurs:
                alert("Sorry, an error has occurred. You may have entered an invalid e-mail address. Please, try it again.")
                console.log(data);
            }
        });
    }
};

API.prototype.arrayDiff = function (array1, array2) {
    var ret = [];
    for (var i in array1) {
        if (array2.indexOf(array1[i]) == -1) {
            ret.push(array1[i]);
        }
    }
    return ret;
};

API.prototype.checkGenesFound = function (data) {

    //Obtain all genes returned by CoExp R
    var all_genes_found = _.keys(_.countBy(JSON.parse(data), function (data) { return data.gene; }));

    //Obtain all genes introduced by the user
    var all_genes_introduced = $("#genes").val()
    if (all_genes_introduced.indexOf(" ,") > -1) {
        all_genes_introduced = all_genes_introduced.split(" ,")
    }
    else if (all_genes_introduced.indexOf(",") > -1) {
        all_genes_introduced = all_genes_introduced.split(",")
    }
    else if (all_genes_introduced.indexOf(" ") > -1) {
        all_genes_introduced = all_genes_introduced.split(" ")
    } else {
        all_genes_introduced = [all_genes_introduced];
    }

    //Obtain all genes not found
    var genes_not_found = API.prototype.arrayDiff(all_genes_introduced, all_genes_found);

    if (genes_not_found.length > 0) {
        //Clean popup from old rows
        $("#table_genes_not_found").find('tbody tr').remove();
        $("#genes_not_found").find(".modal-header .text-left h4").empty();
        $("#genes_not_found").find(".modal-header .text-left h4").next().next();

        //Clean popup from old rows
        var genes_not_found_table_data = "";

        //Generate new rows to be added to the popup with the genes not found in CoExp R
        var ocurrences_gnt = _.countBy(genes_not_found)
        for (var i in genes_not_found) {
            if (ocurrences_gnt[genes_not_found[i]] > 1) {
                genes_not_found_table_data += "<tr><td>" + genes_not_found[i] + "</td><td>Duplicated</td></tr>"
            } else {
                genes_not_found_table_data += "<tr><td>" + genes_not_found[i] + "</td><td>Not found in any selected network</td></tr>";
            }
        }

        //Add new rows and statistics to the table
        var genes_found = all_genes_introduced.length - genes_not_found.length
        var genes_found_text = "Input Gene List (" + genes_found + "/" + all_genes_introduced.length + ")"
        var genes_not_found_text = "Genes Not Found (" + genes_not_found.length + "/" + all_genes_introduced.length + ")"

        $("#genes_not_found").find(".modal-header .text-left h4").first().append(genes_found_text)
        $("#genes_not_found").find(".modal-header .text-left h4").next().next().append(genes_not_found_text)
        $("#table_genes_not_found").find('tbody').append(genes_not_found_table_data);
        $("#genes_not_found").modal('show');
    } else {
        $("#globalReportOnGenes_div").show();
        $('#empty-initial-results').hide();
        $("#error").hide();
    }
}

API.prototype.genesNotFoundAction = function (value) {
    if (value == "continue") {
        $("#globalReportOnGenes_div").show();
        $('#empty-initial-results').hide();
        $("#error").hide();
        
        
    }
    else {
        $("#empty-initial-results").show();
    }

    $("#genes_not_found").modal("hide"); 
}