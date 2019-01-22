// JavaScript source code
var API = function () {
    /// <summary>
    /// API namespace constructor
    /// </summary>
};


API.prototype.menuInit = function (view) {


    //At the beginning, we fill the first select
    API.prototype.getNetworkCategories();

    //Disable second select
    $('#network')
        .prop("disabled", true)
        .selectpicker('refresh');

    //Disable 'send' button
    $('#send_button').prop("disabled", true);

    if (view == 1) {
        //Disable third select
        $('#module_selection')
            .prop('disabled', true)
            .selectpicker('refresh');

        //Hide results divs
        $("#goFromTissue_div").hide();
        $("#cellType_div").hide();
        $("#error").hide();
    }
    else if (view == 2) {
        $("#reportOnGenes_div").hide();
        $('#genes').prop('disabled', true);
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
        $("body").addClass("loading");
        if (view == 1) {
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
                    API.prototype.getGOFromTissue($('#category').val(), $('#network').val());
                    $("#cellType_div").hide();
                }
                else {//only bycelltype
                    API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val());
                    $("#goFromTissue_div").hide();
                }
            }
            else if (module_selection_types.length == 2) {//both bycelltype and bycolor
                API.prototype.getGOFromTissue($('#category').val(), $('#network').val());
                API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val());
            }
            else {
                $('#goFromTissue_div').hide();
                $('#cellType_div').hide();
                $('#error').show();
            }
        }
        else if (view == 2) {
            if ($('#reportOnGenes_table tr').length > 1) {
                $('#reportOnGenes_table').DataTable().destroy();
            }
            API.prototype.reportOnGenes($('#category').val(), $('#network').val(), $('#genes').val());
        }
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
            row.child(API.prototype.formatGOFromTissue(row.data())).show();
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
            row.child(API.prototype.formatReportOnGenes(row.data())).show();
            tr.addClass('shown');
        }
    });



}


API.prototype.getNetworkCategories = function() {
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

API.prototype.getAvailableNetworks = function (category){
    //Realizamos la petición
    $.ajax({
        url: '/coexp/GET/GetAvailableNetworks?category=' + category,
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

API.prototype.getGOFromTissue = function (category, tissue){
    $.ajax({
        url: '/coexp/GET/GetGOFromTissue?WhichOne=' + category + '&Tissue=' + tissue,
        type: 'GET',
        success: function (data) {

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
            $("body").removeClass("loading");
            $("#goFromTissue_div").show();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}

var global = false;
API.prototype.getCellTypeFromTissue = function (category, tissue){
    $.ajax({
        url: '/coexp/GET/GetCellTypeFromTissue?WhichOne=' + category + '&Tissue=' + tissue,
        type: 'GET',
        success: function (data) {

            console.log(data);
            var columns = [];
            data = JSON.parse(data);

            var hasPValue = false;
            var cols = Object.keys(data[0]);
            for (var x = 1; x < cols.length; x++) {
                for (var i = 0; i < data.length; i++) {
                    if (Object.values(data[i])[x] !== 1) {
                        hasPValue = true;
                        break;
                    }
                }
                if (!hasPValue) {
                    for (var i = 0; i < data.length; i++) {
                        delete (data[i][Object.keys(data[i])[x]])
                    }
                    x--;
                }
                hasPValue = false;
            }

            columnNames = Object.keys(data[0]);
            for (var i in columnNames) {
                columns.push({
                    data: columnNames[i],
                    title: columnNames[i]
                });
            }
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
                    'copy', 'csv', 'excel', 'print'/*,
                    {  
                        extend: 'colvis',
                        collectionLayout: 'fixed two-column'
                    }*/
                ],
                drawCallback: function () {
                    $('#cellType_table').find('td:contains(.)').css('backgroundColor', 'yellow');
                },
                "scrollX": true,
                paging: true,
                scrollCollapse: true/*,
                fixedColumns: {
                    leftColumns: 1
                }*/
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
            $("body").removeClass("loading");
            $("#cellType_div").show();
            $('#cellType_table').DataTable().draw();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}

API.prototype.reportOnGenes = function (category, tissue, genes) {
    try {
        $.ajax({
            url: '/coexp/GET/ReportOnGenes?WhichOne=' + category + '&Tissue=' + tissue + '&Genes=' + genes,
            type: 'GET',
            success: function (data) {
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
                        { data: 'module' },
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
                    "order": [[1, 'asc']],
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'print'
                    ]
                });
                $("body").removeClass("loading");
                $("#reportOnGenes_div").show();
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

API.prototype.formatGOFromTissue = function (d) {/* Formatting function for row details - modify as you need */
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>genes: </td>' +
        '<td>' + d.intersection + '</td>' +
        '</tr>' +
        '</table>';
}

API.prototype.formatReportOnGenes = function (d) {/* Formatting function for row details - modify as you need */
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

