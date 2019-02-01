// JavaScript source code
var API = function () {
    /// <summary>
    /// API namespace constructor
    /// </summary>
};


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


        API.prototype.sendButtonFunction(view, moduleColor);  
    }
    else if (view == 2){
        $('#genes')
            .prop('disabled', true);
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
            row.child(API.prototype.hideRowsGOFromTissue(row.data())).show();
            tr.addClass('shown');
        }
    });
    // Add event listener for opening and closing details
    $('#reportOnGenes_table').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = $('#reportOnGenes_table').DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(API.prototype.hideRowsReportOnGenes(row.data())).show();
            tr.addClass('shown');
        }
    });



}

API.prototype.sendButtonFunction = function (view, moduleColor = null) {
    $("body").addClass("loading");

    if (view == 1 || view == 11) {
        //hide previous errors/results
        $('#error').hide();
        var module_selection_types = $('#module_selection').val();
        if ($('#goFromTissue_table tr').length > 1) {
            $('#goFromTissue_table').DataTable().destroy()
        }
        if ($('#cellType_table tr').length > 1) {
            $('#cellType_table').DataTable().destroy()
        }
        //show result divs
        if (module_selection_types.length == 1) {
            if (module_selection_types[0] == "1") { //only byontology and bycolor
                API.prototype.getGOFromTissue($('#category').val(), $('#network').val(), moduleColor);
                $("#cellType_div").hide();
            }
            else {//only bycelltype
                API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val(), moduleColor);
                $("#goFromTissue_div").hide();
            }
        }
        else if (module_selection_types.length == 2) {//both bycelltype and bycolor
            API.prototype.getGOFromTissue($('#category').val(), $('#network').val(), moduleColor);
            API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val(), moduleColor);
        }
        else {
            $('#goFromTissue_div').hide();
            $('#cellType_div').hide();
            $('#error').show();
        }
    }
    else if (view == 2) {
        $('#reportOnGenes_div').hide();
        if ($('#reportOnGenes_table tr').length > 1) {
            $('#reportOnGenes_table').DataTable().destroy();
        }

        var data = [];
        var categories = $("i.checked").closest("li [data-level*=2]");//.children().eq(1).text();
        for (var i = 0; i < categories.length; i++) {
            var categoryLabel = $(categories[i]).children().eq(1).text();
            var networks = $(categories[i]).find("i.checked").parent();
            var networkLabel = null;
            networks.each(function (i, val) {
                if (i == 0)
                    networkLabel = val.innerText;
                else
                    networkLabel = networkLabel + "," + val.innerText
            })
            data[i] = categoryLabel + "|" + networkLabel + "**";
        }
        API.prototype.reportOnGenesMultipleTissue(data, $('#genes').val());
    }
}

API.prototype.getNetworkCategories = function (category = null) {
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
            url: '/coexp/GET/GetNetworkCategories',
            type: 'GET',
            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                //If the request has gone as expected, we fill the select by adding 'option' type elements:
                for (var i = 0; i < data.length; i++) {
                    option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                    $('#category')
                        .append(option)
                        .selectpicker('refresh');
                }
            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
}

API.prototype.getAvailableNetworks = function (category, network = null){
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
            url: '/coexp/GET/GetAvailableNetworks?Category=' + category,
            type: 'GET',
            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    net_option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                    $('#network')
                        .append(net_option)
                        .selectpicker('refresh');
                }
            },
            error: function (data) {
                //If an error occurs:
                console.log(data);
            }
        });
}

API.prototype.getGOFromTissue = function (category, tissue, module = null){
    $.ajax({
        url: '/coexp/GET/GetGOFromTissue?Category=' + category + '&Network=' + tissue,
        type: 'GET',
        success: function (data) {
            if (data.includes("Problems")) {
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
                //data = JSON.parse(data);
                $('#goFromTissue_table').DataTable({
                    data: JSON.parse(data),
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
                        { data: 'term_id' },
                        { data: 'domain' },
                        { data: 'term_name' },
                        {
                            data: 'intersection',
                            "visible": false,
                            "searchable": true
                        }
                    ],
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'print'
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

API.prototype.getCellTypeFromTissue = function (category, tissue, moduleColor = null){
    $.ajax({
        url: '/coexp/GET/GetCellTypeFromTissue?Category=' + category + '&Network=' + tissue,
        type: 'GET',
        success: function (data) {
            if (data.includes("Problems")) {
                $("#cellType_divError").children("p").remove();
                $("#cellType_divError").append("<p>" + data + "</p>");
                $("#cellType_divError").show();
            }
            else if (data == "{}") {
                $("#cellType_divError").children("p").remove();
                $("#cellType_divError").append("<p>No data has been received!</p>");
                $("#cellType_divError").show();
            }
            else {
                console.log(data);
                var columns = [];
                data = JSON.parse(data);

                //Create array with columns to show
                columnNames = Object.keys(data[0]);
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
                }
                else {
                    //Delete from 'data' all rows which only has 1s
                    for (var i = 0; i < data.length; i++) {
                        for (var x = 1; x < columns.length; x++)
                            if (Object.values(data[i])[x] === 1) {
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
                        data: data,
                        columns: columns,
                        dom: 'Bfrtip',
                        autoWidth: false,
                        deferRender: true,
                        columnDefs: [
                            {
                                targets: 1,
                                className: 'noVis'
                            }
                        ],
                        buttons: [
                            'copy', 'csv', 'excel', 'print'
                        ],
                        drawCallback: function () {
                            $('#cellType_table').find('td:contains(.)').css('backgroundColor', 'yellow');
                        },
                        "scrollX": true,
                        //"scrollY": "390px",
                        paging: true,
                        scrollCollapse: true
                    })
                        .on('search.dt', function () {
                            var table = $('#cellType_table').DataTable();
                            table.columns({ "filter": "applied" }).every(function () {
                                if (this.data().unique().length == 1 && this.data().unique()[0] == "1")
                                    this.visible(false);
                                else
                                    this.visible(true);
                            });
                        })
                    $('#cellType_table').DataTable().draw();
                }
                $("#cellType_div").show();
                $("#cellType_divError").hide();
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

API.prototype.reportOnGenesMultipleTissue = function (data, genes) {
    try {
        $.ajax({
            url: '/coexp/GET/ReportOnGenesMultipleTissue?MultipleSelectionData=' + data + '&Genes=' + genes,
            type: 'GET',
            success: function (data) {
                if (data.includes("Problems")) {
                    $("#error").children("p").remove();
                    $("#error").append("<p>" + data + "</p>");
                    $("#error").show();
                }
                else {
                    console.log(data);
                    $('#reportOnGenes_table').DataTable({
                        data: JSON.parse(data).report,
                        columns: [
                            {
                                className: "details-control",
                                orderable: false,
                                data: null,
                                defaultContent: ''
                            },
                            { data: 'gene' },
                            { data: 'ensgene' },
                            { data: 'mm' },
                            {
                                data: 'module',
                                render: function (data, type, row, meta) {
                                    if (type === 'display') {
                                        data = '<a href="javascript:API.prototype.searchByModuleColor(\'' + data + '\');" title="Find out more ...">' + data + '</a>';
                                    }
                                    return data;
                                }
                            },
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
                            },
                            { data: 'p_val_mods' },
                            { data: '_row' }
                        ],

                        "order": [[8, 'asc']],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'print',
                            {
                                text: 'BEST RESULTS',
                                action: function (e, dt, node, config) {
                                    //Filter by pvalues lower than 0.05
                                    $("#reportOnGenes_table").dataTable.ext.search.push(
                                        function (settings, data, dataIndex) {
                                            var max = parseFloat(0.05);
                                            var pvalue = parseFloat(data[8]) || 0;

                                            if (isNaN(max) || pvalue <= max || isNaN(max) || pvalue <= max) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    );
                                    dt.draw();
                                }
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

API.prototype.hideRowsGOFromTissue = function (d) {/* Formatting function for row details - modify as you need */
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>genes: </td>' +
        '<td>' + d.intersection + '</td>' +
        '</tr>' +
        '</table>';
}

API.prototype.hideRowsReportOnGenes = function (d) {/* Formatting function for row details - modify as you need */
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>go_report: </td>' +
        '<td>' + d.go_report + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>cell_type_pred: </td>' +
        '<td>' + d.cell_type_pred + '</td>' +
        '</tr>' +
        '</table>';
}

API.prototype.getTreeMenuData = function () {

    $.ajax({
        url: '/coexp/GET/GetTreeMenuData',
        type: 'GET',
        success: function (data) {
            console.log(data);

            simTree({
                el: '#tree',
                data: JSON.parse(data),
                check: true,
                linkParent: true,
                onClick: function (item) {
                    if (item.length > 0)
                        $('#genes')
                            .prop('disabled', false);
                }

            });
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
        }
    });
}

API.prototype.searchByModuleColor = function (moduleColor) {
    $("body").addClass("loading");   

    var category = $("i.checked").closest("li [data-level*=2]").children().eq(1).text();
    var selectedData = $("i.checked").parent();
    var network = null;
    selectedData.each(function (i, val) {
        if (i == 0)
            network = val.innerText;
        else
            network = network + "," + val.innerText
    })
    window.location.href = "/Run/Case1?category=" + category + "&network=" + network + "&modulecolor=" + moduleColor; 
}