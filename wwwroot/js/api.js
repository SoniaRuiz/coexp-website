// JavaScript source code
var API = function () {
    /// <summary>
    /// API namespace constructor
    /// </summary>
};


API.prototype.menuInit = function(view) {


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
        $("#by_ontologycolor").hide();
        $("#by_celltype").hide();
        $("#error").hide();
    }
    else if (view == 2) {
        $("#geneannotation_div").hide();
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
            $("#by_ontologycolor").hide();
            $("#by_celltype").hide();
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
            if ($('#by_ontologycolor_table tr').length > 1) {
                $('#by_ontologycolor_table').DataTable().destroy()
            }
            if ($('#by_celltype_table tr').length > 1) {
                $('#by_celltype_table').DataTable().destroy()
            }
            //show result divs
            if (module_selection_types.length == 1) {
                if (module_selection_types[0] == "1") { //only byontology and bycolor
                    API.prototype.getGOFromTissue($('#category').val(), $('#network').val());
                    $("#by_celltype").hide();
                }
                else {//only bycelltype
                    API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val());   
                    $("#by_ontologycolor").hide();
                }
            }
            else if (module_selection_types.length == 2) {//both bycelltype and bycolor
                API.prototype.getGOFromTissue($('#category').val(), $('#network').val());
                API.prototype.getCellTypeFromTissue($('#category').val(), $('#network').val());
            }
            else {
                $('#by_ontologycolor').hide();
                $('#by_celltype').hide();
                $('#error').show();
            }
        }
        else if (view == 2) {
            if ($('#geneannotation_table tr').length > 1) {
                $('#geneannotation_table').DataTable().destroy();
            }
            API.prototype.reportOnGenes($('#category').val(), $('#network').val(), $('#genes').val());
        }
    });

}


API.prototype.getNetworkCategories = function() {
    $.ajax({
        url: '/api/API/GetNetworkCategories',
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
        url: '/api/API/GetAvailableNetworks?category=' + category,
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
        url: '/api/API/GetGOFromTissue?WhichOne=' + category + '&Tissue=' + tissue,
        type: 'GET',
        success: function (data) {

            console.log(data);
            //data = JSON.parse(data);
            $('#by_ontologycolor_table').DataTable({
                data: JSON.parse(data),
                columns: [
                    //{ data: "X" },
                    { data: "query_number" },
                    //{ data: 'significant' },
                    { data: 'p_value' },
                    //{ data: 'term_size' },
                    { data: 'query_size' },
                    //{ data: 'overlap_size' },
                    //{ data: 'recall' },
                    //{ data: 'precision' },
                    { data: 'term_id' },
                    { data: 'domain' },
                    //{ data: 'subgraph_number' },
                    { data: 'term_name' },
                    //{ data: 'relative_depth' },
                    { data: 'intersection' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
            $("body").removeClass("loading");
            $("#by_ontologycolor").show();
        },
        error: function (data) {
            //If an error occurs:
            console.log(data);
            $("body").removeClass("loading");
        }
    });
}

API.prototype.getCellTypeFromTissue = function (category, tissue){
    $.ajax({
        url: '/api/API/GetCellTypeFromTissue?WhichOne=' + category + '&Tissue=' + tissue,
        type: 'GET',
        success: function (data) {

            console.log(data);
            $('#by_celltype_table').DataTable({
                data: JSON.parse(data),
                columns: [
                    { title: 'module' },
                    { title: 'term' },
                    { title: 'p-value' },
                    { title: 'ontology' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
            $("body").removeClass("loading");
            $("#by_celltype").show();
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
            url: '/api/API/ReportOnGenes?WhichOne=' + category + '&Tissue=' + tissue + '&Genes=' + genes,
            type: 'GET',
            success: function (data) {
                console.log(data);
                $('#geneannotation_table').DataTable({
                    data: JSON.parse(data).report,
                    columns: [
                        { data: 'gene' },
                        { data: 'ensgene' },
                        { data: 'mm' },
                        { data: 'module' },
                        { data: 'size' },
                        { data: 'go_report' },
                        { data: 'pd_genes' },
                        { data: 'preservation' },
                        { data: 'cell_type_pred' },
                        { data: 'p_val_mods' },
                        { data: '_row' }
                    ],
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                });
                $("body").removeClass("loading");
                $("#geneannotation_div").show();
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
