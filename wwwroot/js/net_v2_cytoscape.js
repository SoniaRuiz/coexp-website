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
                    '","weight": "' + parseFloat(data_network_raw[i][j]).toFixed(4) + '" } },';
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
        maxZoom: 1,
        pixelRatio: 1,
        //boxSelectionEnabled: false,
        renderer: {
            name: 'canvas'
        },
        layout: {
            name: 'fcose',
            convergenceThreshold: 8, // end layout sooner, may be a bit lower quality
            animate: false,
            avoidOverlapPadding: 2,
            randomize: true,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            maxSimulationTime: 1000,
            quality: "proof",
            fit: true,
            padding: 100,
            nodeSeparation: 100

        },
        //pixelRatio: 1, // default:'auto', normalise pixel ratio to 1 here so different screens don't alter performance
        //hideEdgesOnViewport: false, // default:false for cyjs, cytoscape-desktop does something like this by default
        elements: JSON.parse("\""{
   "nodes": [
            {
                "data": {
                    "id": "0",
                    "label": "FEM1B"
                }
            },
            {
                "data": {
                    "id": "1",
                    "label": "CAMK2D"
                }
            },
            {
                "data": {
                    "id": "2",
                    "label": "MFN2"
                }
            },
            {
                "data": {
                    "id": "3",
                    "label": "CFL2"
                }
            },
            {
                "data": {
                    "id": "4",
                    "label": "DUSP27"
                }
            },
            {
                "data": {
                    "id": "5",
                    "label": "MYPN"
                }
            },
            {
                "data": {
                    "id": "6",
                    "label": "SVIL"
                }
            },
            {
                "data": {
                    "id": "7",
                    "label": "ANKRD1"
                }
            },
            {
                "data": {
                    "id": "8",
                    "label": "USP28"
                }
            },
            {
                "data": {
                    "id": "9",
                    "label": "ACTN2"
                }
            },
            {
                "data": {
                    "id": "10",
                    "label": "PTCHD3P1"
                }
            },
            {
                "data": {
                    "id": "11",
                    "label": "DNAJB5"
                }
            },
            {
                "data": {
                    "id": "12",
                    "label": "SLMAP"
                }
            },
            {
                "data": {
                    "id": "13",
                    "label": "FAM129A"
                }
            },
            {
                "data": {
                    "id": "14",
                    "label": "WDR1"
                }
            },
            {
                "data": {
                    "id": "15",
                    "label": "PDLIM5"
                }
            },
            {
                "data": {
                    "id": "16",
                    "label": "MYOM1"
                }
            },
            {
                "data": {
                    "id": "17",
                    "label": "SBDS"
                }
            },
            {
                "data": {
                    "id": "18",
                    "label": "SRF"
                }
            },
            {
                "data": {
                    "id": "19",
                    "label": "FLNC"
                }
            },
            {
                "data": {
                    "id": "20",
                    "label": "MYL12A"
                }
            },
            {
                "data": {
                    "id": "21",
                    "label": "RP11-309L24.2"
                }
            },
            {
                "data": {
                    "id": "22",
                    "label": "RP13-270P17.1"
                }
            },
            {
                "data": {
                    "id": "23",
                    "label": "MAPRE2"
                }
            },
            {
                "data": {
                    "id": "24",
                    "label": "TRIM55"
                }
            },
            {
                "data": {
                    "id": "25",
                    "label": "MSRB3"
                }
            },
            {
                "data": {
                    "id": "26",
                    "label": "RNF115"
                }
            },
            {
                "data": {
                    "id": "27",
                    "label": "SYNM"
                }
            },
            {
                "data": {
                    "id": "28",
                    "label": "ALPK3"
                }
            },
            {
                "data": {
                    "id": "29",
                    "label": "RP11-1069G10.2"
                }
            },
            {
                "data": {
                    "id": "30",
                    "label": "MYO18B"
                }
            },
            {
                "data": {
                    "id": "31",
                    "label": "CTA-125H2.2"
                }
            },
            {
                "data": {
                    "id": "32",
                    "label": "NRAP"
                }
            },
            {
                "data": {
                    "id": "33",
                    "label": "RP11-6O2.4"
                }
            },
            {
                "data": {
                    "id": "34",
                    "label": "ACOT9"
                }
            },
            {
                "data": {
                    "id": "35",
                    "label": "DAPK3"
                }
            },
            {
                "data": {
                    "id": "36",
                    "label": "SLC20A2"
                }
            },
            {
                "data": {
                    "id": "37",
                    "label": "SAMD4A"
                }
            },
            {
                "data": {
                    "id": "38",
                    "label": "ILK"
                }
            },
            {
                "data": {
                    "id": "39",
                    "label": "CAV2"
                }
            },
            {
                "data": {
                    "id": "40",
                    "label": "MYBL1"
                }
            },
            {
                "data": {
                    "id": "41",
                    "label": "CYP2J2"
                }
            },
            {
                "data": {
                    "id": "42",
                    "label": "GPATCH2L"
                }
            },
            {
                "data": {
                    "id": "43",
                    "label": "CNN1"
                }
            },
            {
                "data": {
                    "id": "44",
                    "label": "XIRP1"
                }
            },
            {
                "data": {
                    "id": "45",
                    "label": "HOMER1"
                }
            },
            {
                "data": {
                    "id": "46",
                    "label": "CASZ1"
                }
            },
            {
                "data": {
                    "id": "47",
                    "label": "BVES"
                }
            },
            {
                "data": {
                    "id": "48",
                    "label": "ACTC1"
                }
            },
            {
                "data": {
                    "id": "49",
                    "label": "PACSIN3"
                }
            },
            {
                "data": {
                    "id": "50",
                    "label": "TPM1"
                }
            },
            {
                "data": {
                    "id": "51",
                    "label": "CDC42EP3"
                }
            },
            {
                "data": {
                    "id": "52",
                    "label": "RP11-732A19.2"
                }
            },
            {
                "data": {
                    "id": "53",
                    "label": "SORBS1"
                }
            },
            {
                "data": {
                    "id": "54",
                    "label": "ACOX3"
                }
            },
            {
                "data": {
                    "id": "55",
                    "label": "ACTA1"
                }
            },
            {
                "data": {
                    "id": "56",
                    "label": "CPEB4"
                }
            },
            {
                "data": {
                    "id": "57",
                    "label": "ENSG00000272078"
                }
            },
            {
                "data": {
                    "id": "58",
                    "label": "PRKAR1A"
                }
            },
            {
                "data": {
                    "id": "59",
                    "label": "TNFRSF12A"
                }
            },
            {
                "data": {
                    "id": "60",
                    "label": "STK38L"
                }
            },
            {
                "data": {
                    "id": "61",
                    "label": "CAV1"
                }
            },
            {
                "data": {
                    "id": "62",
                    "label": "RP11-894P9.2"
                }
            },
            {
                "data": {
                    "id": "63",
                    "label": "ARHGEF9"
                }
            },
            {
                "data": {
                    "id": "64",
                    "label": "ARHGAP23"
                }
            },
            {
                "data": {
                    "id": "65",
                    "label": "RP11-334E6.3"
                }
            },
            {
                "data": {
                    "id": "66",
                    "label": "RP11-125B21.2"
                }
            },
            {
                "data": {
                    "id": "67",
                    "label": "PTPLA"
                }
            },
            {
                "data": {
                    "id": "68",
                    "label": "RNF34"
                }
            },
            {
                "data": {
                    "id": "69",
                    "label": "JPH1"
                }
            },
            {
                "data": {
                    "id": "70",
                    "label": "MAP4"
                }
            },
            {
                "data": {
                    "id": "71",
                    "label": "NES"
                }
            },
            {
                "data": {
                    "id": "72",
                    "label": "DOK7"
                }
            },
            {
                "data": {
                    "id": "73",
                    "label": "PDK3"
                }
            },
            {
                "data": {
                    "id": "74",
                    "label": "FHL1"
                }
            },
            {
                "data": {
                    "id": "75",
                    "label": "RAB15"
                }
            },
            {
                "data": {
                    "id": "76",
                    "label": "SH3BGR"
                }
            },
            {
                "data": {
                    "id": "77",
                    "label": "RRAS2"
                }
            },
            {
                "data": {
                    "id": "78",
                    "label": "RP11-357C3.3"
                }
            },
            {
                "data": {
                    "id": "79",
                    "label": "JPH2"
                }
            },
            {
                "data": {
                    "id": "80",
                    "label": "RP11-732A19.8"
                }
            },
            {
                "data": {
                    "id": "81",
                    "label": "RP11-766F14.2"
                }
            },
            {
                "data": {
                    "id": "82",
                    "label": "TUFT1"
                }
            },
            {
                "data": {
                    "id": "83",
                    "label": "PRKAG2"
                }
            },
            {
                "data": {
                    "id": "84",
                    "label": "DES"
                }
            },
            {
                "data": {
                    "id": "85",
                    "label": "CRYAB"
                }
            },
            {
                "data": {
                    "id": "86",
                    "label": "POPDC2"
                }
            },
            {
                "data": {
                    "id": "87",
                    "label": "ADAMTSL5"
                }
            },
            {
                "data": {
                    "id": "88",
                    "label": "VCL"
                }
            },
            {
                "data": {
                    "id": "89",
                    "label": "LRRC49"
                }
            },
            {
                "data": {
                    "id": "90",
                    "label": "TANC1"
                }
            },
            {
                "data": {
                    "id": "91",
                    "label": "CYB5R1"
                }
            },
            {
                "data": {
                    "id": "92",
                    "label": "CALD1"
                }
            },
            {
                "data": {
                    "id": "93",
                    "label": "C9orf3"
                }
            },
            {
                "data": {
                    "id": "94",
                    "label": "RP11-867G23.10"
                }
            },
            {
                "data": {
                    "id": "95",
                    "label": "ANKRD2"
                }
            },
            {
                "data": {
                    "id": "96",
                    "label": "NEXN-AS1"
                }
            },
            {
                "data": {
                    "id": "97",
                    "label": "GJC1"
                }
            },
            {
                "data": {
                    "id": "98",
                    "label": "LMOD2"
                }
            },
            {
                "data": {
                    "id": "99",
                    "label": "CTB-25B13.9"
                }
            },
            {
                "data": {
                    "id": "100",
                    "label": "IFT43"
                }
            },
            {
                "data": {
                    "id": "101",
                    "label": "ENTPD6"
                }
            },
            {
                "data": {
                    "id": "102",
                    "label": "PRR26"
                }
            },
            {
                "data": {
                    "id": "103",
                    "label": "DYSF"
                }
            },
            {
                "data": {
                    "id": "104",
                    "label": "TP53INP2"
                }
            },
            {
                "data": {
                    "id": "105",
                    "label": "STAT4"
                }
            },
            {
                "data": {
                    "id": "106",
                    "label": "AC006369.2"
                }
            },
            {
                "data": {
                    "id": "107",
                    "label": "AC106722.1"
                }
            },
            {
                "data": {
                    "id": "108",
                    "label": "WIPI1"
                }
            },
            {
                "data": {
                    "id": "109",
                    "label": "ABRA"
                }
            },
            {
                "data": {
                    "id": "110",
                    "label": "ASB2"
                }
            },
            {
                "data": {
                    "id": "111",
                    "label": "CASQ1"
                }
            },
            {
                "data": {
                    "id": "112",
                    "label": "LINC00702"
                }
            },
            {
                "data": {
                    "id": "113",
                    "label": "NPPB"
                }
            },
            {
                "data": {
                    "id": "114",
                    "label": "TPM3"
                }
            },
            {
                "data": {
                    "id": "115",
                    "label": "AC053503.6"
                }
            },
            {
                "data": {
                    "id": "116",
                    "label": "HSPA2"
                }
            },
            {
                "data": {
                    "id": "117",
                    "label": "ABHD2"
                }
            },
            {
                "data": {
                    "id": "118",
                    "label": "TMEM40"
                }
            },
            {
                "data": {
                    "id": "119",
                    "label": "ILDR2"
                }
            },
            {
                "data": {
                    "id": "120",
                    "label": "MAGI1"
                }
            },
            {
                "data": {
                    "id": "121",
                    "label": "CACNA1C"
                }
            },
            {
                "data": {
                    "id": "122",
                    "label": "RN7SL431P"
                }
            },
            {
                "data": {
                    "id": "123",
                    "label": "CACNA1C-AS2"
                }
            },
            {
                "data": {
                    "id": "124",
                    "label": "MT1HL1"
                }
            },
            {
                "data": {
                    "id": "125",
                    "label": "CTC-296K1.4"
                }
            },
            {
                "data": {
                    "id": "126",
                    "label": "RNF216"
                }
            },
            {
                "data": {
                    "id": "127",
                    "label": "CENPN"
                }
            },
            {
                "data": {
                    "id": "128",
                    "label": "FAM46B"
                }
            },
            {
                "data": {
                    "id": "129",
                    "label": "MYZAP"
                }
            },
            {
                "data": {
                    "id": "130",
                    "label": "XYLT1"
                }
            },
            {
                "data": {
                    "id": "131",
                    "label": "CACNA1C-AS1"
                }
            },
            {
                "data": {
                    "id": "132",
                    "label": "AC067945.4"
                }
            },
            {
                "data": {
                    "id": "133",
                    "label": "ACTA2"
                }
            },
            {
                "data": {
                    "id": "134",
                    "label": "KCNJ4"
                }
            },
            {
                "data": {
                    "id": "135",
                    "label": "AC018464.3"
                }
            },
            {
                "data": {
                    "id": "136",
                    "label": "GJD2"
                }
            },
            {
                "data": {
                    "id": "137",
                    "label": "XIRP2"
                }
            },
            {
                "data": {
                    "id": "138",
                    "label": "RP3-434P1.6"
                }
            },
            {
                "data": {
                    "id": "139",
                    "label": "TTC23"
                }
            },
            {
                "data": {
                    "id": "140",
                    "label": "ALDH1B1"
                }
            },
            {
                "data": {
                    "id": "141",
                    "label": "RP11-522D2.1"
                }
            },
            {
                "data": {
                    "id": "142",
                    "label": "CTC-296K1.3"
                }
            },
            {
                "data": {
                    "id": "143",
                    "label": "JAK2"
                }
            },
            {
                "data": {
                    "id": "144",
                    "label": "CXorf64"
                }
            },
            {
                "data": {
                    "id": "145",
                    "label": "SOGA2"
                }
            },
            {
                "data": {
                    "id": "146",
                    "label": "CTIF"
                }
            },
            {
                "data": {
                    "id": "147",
                    "label": "ENSG00000272899"
                }
            },
            {
                "data": {
                    "id": "148",
                    "label": "CTD-2576D5.4"
                }
            },
            {
                "data": {
                    "id": "149",
                    "label": "GRIN2A"
                }
            },
            {
                "data": {
                    "id": "150",
                    "label": "ACTA2-AS1"
                }
            },
            {
                "data": {
                    "id": "151",
                    "label": "PCDH20"
                }
            },
            {
                "data": {
                    "id": "152",
                    "label": "LAD1"
                }
            },
            {
                "data": {
                    "id": "153",
                    "label": "RP11-452K12.7"
                }
            },
            {
                "data": {
                    "id": "154",
                    "label": "ERC2"
                }
            },
            {
                "data": {
                    "id": "155",
                    "label": "ZNF774"
                }
            },
            {
                "data": {
                    "id": "156",
                    "label": "MTTP"
                }
            },
            {
                "data": {
                    "id": "157",
                    "label": "MYL2"
                }
            },
            {
                "data": {
                    "id": "158",
                    "label": "TPM2"
                }
            },
            {
                "data": {
                    "id": "159",
                    "label": "RP11-654A16.3"
                }
            },
            {
                "data": {
                    "id": "160",
                    "label": "ENSG00000272198"
                }
            },
            {
                "data": {
                    "id": "161",
                    "label": "XXyac-YX155B6.2"
                }
            },
            {
                "data": {
                    "id": "162",
                    "label": "TAGLN"
                }
            },
            {
                "data": {
                    "id": "163",
                    "label": "DUSP13"
                }
            },
            {
                "data": {
                    "id": "164",
                    "label": "MCAM"
                }
            },
            {
                "data": {
                    "id": "165",
                    "label": "RAD9B"
                }
            },
            {
                "data": {
                    "id": "166",
                    "label": "NMRK2"
                }
            },
            {
                "data": {
                    "id": "167",
                    "label": "SHROOM3"
                }
            },
            {
                "data": {
                    "id": "168",
                    "label": "CTC-308K20.1"
                }
            },
            {
                "data": {
                    "id": "169",
                    "label": "SHISA4"
                }
            },
            {
                "data": {
                    "id": "170",
                    "label": "MXRA7"
                }
            },
            {
                "data": {
                    "id": "171",
                    "label": "RP11-6O2.3"
                }
            },
            {
                "data": {
                    "id": "172",
                    "label": "RP11-303E16.2"
                }
            },
            {
                "data": {
                    "id": "173",
                    "label": "XRCC4"
                }
            },
            {
                "data": {
                    "id": "174",
                    "label": "RP13-270P17.2"
                }
            },
            {
                "data": {
                    "id": "175",
                    "label": "RN7SKP276"
                }
            },
            {
                "data": {
                    "id": "176",
                    "label": "PRUNE2"
                }
            },
            {
                "data": {
                    "id": "177",
                    "label": "GRIP2"
                }
            },
            {
                "data": {
                    "id": "178",
                    "label": "CTD-2587H24.5"
                }
            },
            {
                "data": {
                    "id": "179",
                    "label": "RP11-1166P10.1"
                }
            },
            {
                "data": {
                    "id": "180",
                    "label": "SNX8"
                }
            },
            {
                "data": {
                    "id": "181",
                    "label": "MYH7"
                }
            }
        ],
            "edges": [
            {
                "data": {
                    "id": "1000045",
                    "source": "0",
                    "target": "44",
                    "weight": "0.0601"
                }
            },
            {
                "data": {
                    "id": "1000063",
                    "source": "1",
                    "target": "16",
                    "weight": "0.0627"
                }
            },
            {
                "data": {
                    "id": "1000082",
                    "source": "2",
                    "target": "16",
                    "weight": "0.0670"
                }
            },
            {
                "data": {
                    "id": "1000090",
                    "source": "3",
                    "target": "4",
                    "weight": "0.0656"
                }
            },
            {
                "data": {
                    "id": "1000107",
                    "source": "4",
                    "target": "12",
                    "weight": "0.0618"
                }
            },
            {
                "data": {
                    "id": "1000120",
                    "source": "5",
                    "target": "7",
                    "weight": "0.0592"
                }
            },
            {
                "data": {
                    "id": "1000143",
                    "source": "6",
                    "target": "16",
                    "weight": "0.0567"
                }
            },
            {
                "data": {
                    "id": "1000163",
                    "source": "7",
                    "target": "12",
                    "weight": "0.0545"
                }
            },
            {
                "data": {
                    "id": "1000184",
                    "source": "8",
                    "target": "12",
                    "weight": "0.0568"
                }
            },
            {
                "data": {
                    "id": "1000214",
                    "source": "9",
                    "target": "20",
                    "weight": "0.0576"
                }
            },
            {
                "data": {
                    "id": "1000262",
                    "source": "10",
                    "target": "37",
                    "weight": "0.0390"
                }
            },
            {
                "data": {
                    "id": "1000295",
                    "source": "11",
                    "target": "21",
                    "weight": "0.0560"
                }
            },
            {
                "data": {
                    "id": "1000337",
                    "source": "12",
                    "target": "29",
                    "weight": "0.0515"
                }
            },
            {
                "data": {
                    "id": "1000367",
                    "source": "13",
                    "target": "16",
                    "weight": "0.0523"
                }
            },
            {
                "data": {
                    "id": "1000441",
                    "source": "14",
                    "target": "59",
                    "weight": "0.0557"
                }
            },
            {
                "data": {
                    "id": "1000474",
                    "source": "15",
                    "target": "17",
                    "weight": "0.0440"
                }
            },
            {
                "data": {
                    "id": "1000539",
                    "source": "16",
                    "target": "48",
                    "weight": "0.0551"
                }
            },
            {
                "data": {
                    "id": "1000615",
                    "source": "17",
                    "target": "58",
                    "weight": "0.0461"
                }
            },
            {
                "data": {
                    "id": "1000663",
                    "source": "18",
                    "target": "29",
                    "weight": "0.0461"
                }
            },
            {
                "data": {
                    "id": "1000704",
                    "source": "19",
                    "target": "21",
                    "weight": "0.0544"
                }
            },
            {
                "data": {
                    "id": "1000747",
                    "source": "20",
                    "target": "22",
                    "weight": "0.0503"
                }
            },
            {
                "data": {
                    "id": "1000804",
                    "source": "21",
                    "target": "35",
                    "weight": "0.0547"
                }
            },
            {
                "data": {
                    "id": "1000877",
                    "source": "22",
                    "target": "50",
                    "weight": "0.0474"
                }
            },
            {
                "data": {
                    "id": "1000927",
                    "source": "23",
                    "target": "26",
                    "weight": "0.0464"
                }
            },
            {
                "data": {
                    "id": "1000979",
                    "source": "24",
                    "target": "27",
                    "weight": "0.0413"
                }
            },
            {
                "data": {
                    "id": "1001032",
                    "source": "25",
                    "target": "27",
                    "weight": "0.0398"
                }
            },
            {
                "data": {
                    "id": "1001155",
                    "source": "26",
                    "target": "96",
                    "weight": "0.0411"
                }
            },
            {
                "data": {
                    "id": "1001216",
                    "source": "27",
                    "target": "33",
                    "weight": "0.0416"
                }
            },
            {
                "data": {
                    "id": "1001276",
                    "source": "28",
                    "target": "31",
                    "weight": "0.0425"
                }
            },
            {
                "data": {
                    "id": "1001349",
                    "source": "29",
                    "target": "43",
                    "weight": "0.0368"
                }
            },
            {
                "data": {
                    "id": "1001411",
                    "source": "30",
                    "target": "31",
                    "weight": "0.0439"
                }
            },
            {
                "data": {
                    "id": "1001478",
                    "source": "31",
                    "target": "35",
                    "weight": "0.0405"
                }
            },
            {
                "data": {
                    "id": "1001546",
                    "source": "32",
                    "target": "35",
                    "weight": "0.0384"
                }
            },
            {
                "data": {
                    "id": "1001616",
                    "source": "33",
                    "target": "36",
                    "weight": "0.0385"
                }
            },
            {
                "data": {
                    "id": "1001706",
                    "source": "34",
                    "target": "55",
                    "weight": "0.0412"
                }
            },
            {
                "data": {
                    "id": "1001786",
                    "source": "35",
                    "target": "44",
                    "weight": "0.0548"
                }
            },
            {
                "data": {
                    "id": "1001888",
                    "source": "36",
                    "target": "65",
                    "weight": "0.0399"
                }
            },
            {
                "data": {
                    "id": "1001968",
                    "source": "37",
                    "target": "42",
                    "weight": "0.0342"
                }
            },
            {
                "data": {
                    "id": "1002059",
                    "source": "38",
                    "target": "52",
                    "weight": "0.0406"
                }
            },
            {
                "data": {
                    "id": "1002160",
                    "source": "39",
                    "target": "61",
                    "weight": "0.0358"
                }
            },
            {
                "data": {
                    "id": "1002242",
                    "source": "40",
                    "target": "41",
                    "weight": "0.0332"
                }
            },
            {
                "data": {
                    "id": "1002339",
                    "source": "41",
                    "target": "55",
                    "weight": "0.0360"
                }
            },
            {
                "data": {
                    "id": "1002426",
                    "source": "42",
                    "target": "44",
                    "weight": "0.0389"
                }
            },
            {
                "data": {
                    "id": "1002529",
                    "source": "43",
                    "target": "59",
                    "weight": "0.0428"
                }
            },
            {
                "data": {
                    "id": "1002633",
                    "source": "44",
                    "target": "59",
                    "weight": "0.0573"
                }
            },
            {
                "data": {
                    "id": "1002735",
                    "source": "45",
                    "target": "56",
                    "weight": "0.0336"
                }
            },
            {
                "data": {
                    "id": "1002847",
                    "source": "46",
                    "target": "65",
                    "weight": "0.0357"
                }
            },
            {
                "data": {
                    "id": "1002960",
                    "source": "47",
                    "target": "65",
                    "weight": "0.0325"
                }
            },
            {
                "data": {
                    "id": "1003059",
                    "source": "48",
                    "target": "50",
                    "weight": "0.0467"
                }
            },
            {
                "data": {
                    "id": "1003193",
                    "source": "49",
                    "target": "84",
                    "weight": "0.0472"
                }
            },
            {
                "data": {
                    "id": "1003328",
                    "source": "50",
                    "target": "84",
                    "weight": "0.0461"
                }
            },
            {
                "data": {
                    "id": "1003449",
                    "source": "51",
                    "target": "69",
                    "weight": "0.0314"
                }
            },
            {
                "data": {
                    "id": "1003581",
                    "source": "52",
                    "target": "79",
                    "weight": "0.0357"
                }
            },
            {
                "data": {
                    "id": "1003731",
                    "source": "53",
                    "target": "96",
                    "weight": "0.0444"
                }
            },
            {
                "data": {
                    "id": "1003858",
                    "source": "54",
                    "target": "72",
                    "weight": "0.0350"
                }
            },
            {
                "data": {
                    "id": "1003973",
                    "source": "55",
                    "target": "59",
                    "weight": "0.0425"
                }
            },
            {
                "data": {
                    "id": "1004090",
                    "source": "56",
                    "target": "60",
                    "weight": "0.0367"
                }
            },
            {
                "data": {
                    "id": "1004220",
                    "source": "57",
                    "target": "72",
                    "weight": "0.0286"
                }
            },
            {
                "data": {
                    "id": "1004362",
                    "source": "58",
                    "target": "83",
                    "weight": "0.0350"
                }
            },
            {
                "data": {
                    "id": "1004497",
                    "source": "59",
                    "target": "75",
                    "weight": "0.0477"
                }
            },
            {
                "data": {
                    "id": "1004650",
                    "source": "60",
                    "target": "92",
                    "weight": "0.0345"
                }
            },
            {
                "data": {
                    "id": "1004781",
                    "source": "61",
                    "target": "69",
                    "weight": "0.0288"
                }
            },
            {
                "data": {
                    "id": "1004907",
                    "source": "62",
                    "target": "63",
                    "weight": "0.0361"
                }
            },
            {
                "data": {
                    "id": "1005067",
                    "source": "63",
                    "target": "96",
                    "weight": "0.0325"
                }
            },
            {
                "data": {
                    "id": "1005213",
                    "source": "64",
                    "target": "81",
                    "weight": "0.0257"
                }
            },
            {
                "data": {
                    "id": "1005346",
                    "source": "65",
                    "target": "67",
                    "weight": "0.0324"
                }
            },
            {
                "data": {
                    "id": "1005509",
                    "source": "66",
                    "target": "96",
                    "weight": "0.0257"
                }
            },
            {
                "data": {
                    "id": "1005663",
                    "source": "67",
                    "target": "86",
                    "weight": "0.0308"
                }
            },
            {
                "data": {
                    "id": "1005809",
                    "source": "68",
                    "target": "77",
                    "weight": "0.0278"
                }
            },
            {
                "data": {
                    "id": "1005952",
                    "source": "69",
                    "target": "73",
                    "weight": "0.0256"
                }
            },
            {
                "data": {
                    "id": "1006094",
                    "source": "70",
                    "target": "71",
                    "weight": "0.0349"
                }
            },
            {
                "data": {
                    "id": "1006253",
                    "source": "71",
                    "target": "87",
                    "weight": "0.0317"
                }
            },
            {
                "data": {
                    "id": "1006426",
                    "source": "72",
                    "target": "100",
                    "weight": "0.0305"
                }
            },
            {
                "data": {
                    "id": "1006583",
                    "source": "73",
                    "target": "83",
                    "weight": "0.0249"
                }
            },
            {
                "data": {
                    "id": "1006745",
                    "source": "74",
                    "target": "87",
                    "weight": "0.0302"
                }
            },
            {
                "data": {
                    "id": "1006902",
                    "source": "75",
                    "target": "81",
                    "weight": "0.0414"
                }
            },
            {
                "data": {
                    "id": "1007064",
                    "source": "76",
                    "target": "85",
                    "weight": "0.0302"
                }
            },
            {
                "data": {
                    "id": "1007234",
                    "source": "77",
                    "target": "92",
                    "weight": "0.0272"
                }
            },
            {
                "data": {
                    "id": "1007405",
                    "source": "78",
                    "target": "92",
                    "weight": "0.0260"
                }
            },
            {
                "data": {
                    "id": "1007613",
                    "source": "79",
                    "target": "128",
                    "weight": "0.0295"
                }
            },
            {
                "data": {
                    "id": "1007778",
                    "source": "80",
                    "target": "84",
                    "weight": "0.0246"
                }
            },
            {
                "data": {
                    "id": "1007954",
                    "source": "81",
                    "target": "94",
                    "weight": "0.0325"
                }
            },
            {
                "data": {
                    "id": "1008129",
                    "source": "82",
                    "target": "92",
                    "weight": "0.0270"
                }
            },
            {
                "data": {
                    "id": "1008303",
                    "source": "83",
                    "target": "90",
                    "weight": "0.0263"
                }
            },
            {
                "data": {
                    "id": "1008503",
                    "source": "84",
                    "target": "115",
                    "weight": "0.0433"
                }
            },
            {
                "data": {
                    "id": "1008704",
                    "source": "85",
                    "target": "115",
                    "weight": "0.0275"
                }
            },
            {
                "data": {
                    "id": "1008882",
                    "source": "86",
                    "target": "91",
                    "weight": "0.0257"
                }
            },
            {
                "data": {
                    "id": "1009069",
                    "source": "87",
                    "target": "99",
                    "weight": "0.0337"
                }
            },
            {
                "data": {
                    "id": "1009254",
                    "source": "88",
                    "target": "96",
                    "weight": "0.0357"
                }
            },
            {
                "data": {
                    "id": "1009469",
                    "source": "89",
                    "target": "125",
                    "weight": "0.0299"
                }
            },
            {
                "data": {
                    "id": "1009677",
                    "source": "90",
                    "target": "117",
                    "weight": "0.0257"
                }
            },
            {
                "data": {
                    "id": "1009884",
                    "source": "91",
                    "target": "115",
                    "weight": "0.0301"
                }
            },
            {
                "data": {
                    "id": "1010124",
                    "source": "92",
                    "target": "147",
                    "weight": "0.0265"
                }
            },
            {
                "data": {
                    "id": "1010312",
                    "source": "93",
                    "target": "94",
                    "weight": "0.0317"
                }
            },
            {
                "data": {
                    "id": "1010509",
                    "source": "94",
                    "target": "102",
                    "weight": "0.0261"
                }
            },
            {
                "data": {
                    "id": "1010720",
                    "source": "95",
                    "target": "115",
                    "weight": "0.0303"
                }
            },
            {
                "data": {
                    "id": "1010915",
                    "source": "96",
                    "target": "98",
                    "weight": "0.0298"
                }
            },
            {
                "data": {
                    "id": "1011173",
                    "source": "97",
                    "target": "160",
                    "weight": "0.0214"
                }
            },
            {
                "data": {
                    "id": "1011421",
                    "source": "98",
                    "target": "149",
                    "weight": "0.0278"
                }
            },
            {
                "data": {
                    "id": "1011636",
                    "source": "99",
                    "target": "115",
                    "weight": "0.0270"
                }
            },
            {
                "data": {
                    "id": "1011903",
                    "source": "100",
                    "target": "166",
                    "weight": "0.0258"
                }
            },
            {
                "data": {
                    "id": "1012133",
                    "source": "101",
                    "target": "128",
                    "weight": "0.0251"
                }
            },
            {
                "data": {
                    "id": "1012345",
                    "source": "102",
                    "target": "109",
                    "weight": "0.0242"
                }
            },
            {
                "data": {
                    "id": "1012612",
                    "source": "103",
                    "target": "163",
                    "weight": "0.0255"
                }
            },
            {
                "data": {
                    "id": "1012842",
                    "source": "104",
                    "target": "125",
                    "weight": "0.0228"
                }
            },
            {
                "data": {
                    "id": "1013080",
                    "source": "105",
                    "target": "132",
                    "weight": "0.0281"
                }
            },
            {
                "data": {
                    "id": "1013294",
                    "source": "106",
                    "target": "107",
                    "weight": "0.0245"
                }
            },
            {
                "data": {
                    "id": "1013529",
                    "source": "107",
                    "target": "127",
                    "weight": "0.0275"
                }
            },
            {
                "data": {
                    "id": "1013755",
                    "source": "108",
                    "target": "117",
                    "weight": "0.0270"
                }
            },
            {
                "data": {
                    "id": "1013989",
                    "source": "109",
                    "target": "124",
                    "weight": "0.0254"
                }
            },
            {
                "data": {
                    "id": "1014228",
                    "source": "110",
                    "target": "128",
                    "weight": "0.0253"
                }
            },
            {
                "data": {
                    "id": "1014492",
                    "source": "111",
                    "target": "152",
                    "weight": "0.0254"
                }
            },
            {
                "data": {
                    "id": "1014731",
                    "source": "112",
                    "target": "126",
                    "weight": "0.0243"
                }
            },
            {
                "data": {
                    "id": "1014975",
                    "source": "113",
                    "target": "130",
                    "weight": "0.0287"
                }
            },
            {
                "data": {
                    "id": "1015220",
                    "source": "114",
                    "target": "130",
                    "weight": "0.0201"
                }
            },
            {
                "data": {
                    "id": "1015470",
                    "source": "115",
                    "target": "134",
                    "weight": "0.0264"
                }
            },
            {
                "data": {
                    "id": "1015727",
                    "source": "116",
                    "target": "140",
                    "weight": "0.0195"
                }
            },
            {
                "data": {
                    "id": "1015975",
                    "source": "117",
                    "target": "130",
                    "weight": "0.0276"
                }
            },
            {
                "data": {
                    "id": "1016228",
                    "source": "118",
                    "target": "134",
                    "weight": "0.0189"
                }
            },
            {
                "data": {
                    "id": "1016487",
                    "source": "119",
                    "target": "139",
                    "weight": "0.0203"
                }
            },
            {
                "data": {
                    "id": "1016751",
                    "source": "120",
                    "target": "143",
                    "weight": "0.0220"
                }
            },
            {
                "data": {
                    "id": "1016996",
                    "source": "121",
                    "target": "123",
                    "weight": "0.0285"
                }
            },
            {
                "data": {
                    "id": "1017244",
                    "source": "122",
                    "target": "125",
                    "weight": "0.0196"
                }
            },
            {
                "data": {
                    "id": "1017499",
                    "source": "123",
                    "target": "131",
                    "weight": "0.0263"
                }
            },
            {
                "data": {
                    "id": "1017763",
                    "source": "124",
                    "target": "139",
                    "weight": "0.0219"
                }
            },
            {
                "data": {
                    "id": "1018031",
                    "source": "125",
                    "target": "142",
                    "weight": "0.0317"
                }
            },
            {
                "data": {
                    "id": "1018304",
                    "source": "126",
                    "target": "146",
                    "weight": "0.0220"
                }
            },
            {
                "data": {
                    "id": "1018562",
                    "source": "127",
                    "target": "130",
                    "weight": "0.0240"
                }
            },
            {
                "data": {
                    "id": "1018825",
                    "source": "128",
                    "target": "134",
                    "weight": "0.0221"
                }
            },
            {
                "data": {
                    "id": "1019097",
                    "source": "129",
                    "target": "142",
                    "weight": "0.0204"
                }
            },
            {
                "data": {
                    "id": "1019376",
                    "source": "130",
                    "target": "148",
                    "weight": "0.0281"
                }
            },
            {
                "data": {
                    "id": "1019666",
                    "source": "131",
                    "target": "158",
                    "weight": "0.0186"
                }
            },
            {
                "data": {
                    "id": "1019963",
                    "source": "132",
                    "target": "164",
                    "weight": "0.0189"
                }
            },
            {
                "data": {
                    "id": "1020247",
                    "source": "133",
                    "target": "150",
                    "weight": "0.0311"
                }
            },
            {
                "data": {
                    "id": "1020520",
                    "source": "134",
                    "target": "138",
                    "weight": "0.0327"
                }
            },
            {
                "data": {
                    "id": "1020798",
                    "source": "135",
                    "target": "142",
                    "weight": "0.0170"
                }
            },
            {
                "data": {
                    "id": "1021077",
                    "source": "136",
                    "target": "142",
                    "weight": "0.0201"
                }
            },
            {
                "data": {
                    "id": "1021353",
                    "source": "137",
                    "target": "138",
                    "weight": "0.0205"
                }
            },
            {
                "data": {
                    "id": "1021673",
                    "source": "138",
                    "target": "181",
                    "weight": "0.0215"
                }
            },
            {
                "data": {
                    "id": "1021984",
                    "source": "139",
                    "target": "171",
                    "weight": "0.0277"
                }
            },
            {
                "data": {
                    "id": "1022290",
                    "source": "140",
                    "target": "165",
                    "weight": "0.0216"
                }
            },
            {
                "data": {
                    "id": "1022578",
                    "source": "141",
                    "target": "146",
                    "weight": "0.0195"
                }
            },
            {
                "data": {
                    "id": "1022871",
                    "source": "142",
                    "target": "150",
                    "weight": "0.0268"
                }
            },
            {
                "data": {
                    "id": "1023162",
                    "source": "143",
                    "target": "147",
                    "weight": "0.0201"
                }
            },
            {
                "data": {
                    "id": "1023469",
                    "source": "144",
                    "target": "162",
                    "weight": "0.0234"
                }
            },
            {
                "data": {
                    "id": "1023792",
                    "source": "145",
                    "target": "177",
                    "weight": "0.0185"
                }
            },
            {
                "data": {
                    "id": "1024091",
                    "source": "146",
                    "target": "152",
                    "weight": "0.0206"
                }
            },
            {
                "data": {
                    "id": "1024410",
                    "source": "147",
                    "target": "171",
                    "weight": "0.0202"
                }
            },
            {
                "data": {
                    "id": "1024710",
                    "source": "148",
                    "target": "151",
                    "weight": "0.0194"
                }
            },
            {
                "data": {
                    "id": "1025016",
                    "source": "149",
                    "target": "156",
                    "weight": "0.0218"
                }
            },
            {
                "data": {
                    "id": "1025325",
                    "source": "150",
                    "target": "158",
                    "weight": "0.0183"
                }
            },
            {
                "data": {
                    "id": "1025642",
                    "source": "151",
                    "target": "165",
                    "weight": "0.0185"
                }
            },
            {
                "data": {
                    "id": "1025964",
                    "source": "152",
                    "target": "169",
                    "weight": "0.0242"
                }
            },
            {
                "data": {
                    "id": "1026283",
                    "source": "153",
                    "target": "165",
                    "weight": "0.0196"
                }
            },
            {
                "data": {
                    "id": "1026599",
                    "source": "154",
                    "target": "161",
                    "weight": "0.0142"
                }
            },
            {
                "data": {
                    "id": "1026923",
                    "source": "155",
                    "target": "168",
                    "weight": "0.0158"
                }
            },
            {
                "data": {
                    "id": "1027254",
                    "source": "156",
                    "target": "174",
                    "weight": "0.0170"
                }
            },
            {
                "data": {
                    "id": "1027570",
                    "source": "157",
                    "target": "158",
                    "weight": "0.0186"
                }
            },
            {
                "data": {
                    "id": "1027898",
                    "source": "158",
                    "target": "169",
                    "weight": "0.0188"
                }
            },
            {
                "data": {
                    "id": "1028237",
                    "source": "159",
                    "target": "179",
                    "weight": "0.0150"
                }
            },
            {
                "data": {
                    "id": "1028572",
                    "source": "160",
                    "target": "174",
                    "weight": "0.0138"
                }
            },
            {
                "data": {
                    "id": "1028912",
                    "source": "161",
                    "target": "178",
                    "weight": "0.0186"
                }
            },
            {
                "data": {
                    "id": "1029239",
                    "source": "162",
                    "target": "164",
                    "weight": "0.0198"
                }
            },
            {
                "data": {
                    "id": "1029572",
                    "source": "163",
                    "target": "169",
                    "weight": "0.0195"
                }
            },
            {
                "data": {
                    "id": "1029905",
                    "source": "164",
                    "target": "168",
                    "weight": "0.0194"
                }
            },
            {
                "data": {
                    "id": "1030239",
                    "source": "165",
                    "target": "168",
                    "weight": "0.0182"
                }
            },
            {
                "data": {
                    "id": "1030586",
                    "source": "166",
                    "target": "180",
                    "weight": "0.0139"
                }
            },
            {
                "data": {
                    "id": "1030923",
                    "source": "167",
                    "target": "169",
                    "weight": "0.0164"
                }
            },
            {
                "data": {
                    "id": "1031263",
                    "source": "168",
                    "target": "171",
                    "weight": "0.0141"
                }
            },
            {
                "data": {
                    "id": "1031613",
                    "source": "169",
                    "target": "180",
                    "weight": "0.0186"
                }
            },
            {
                "data": {
                    "id": "1031965",
                    "source": "170",
                    "target": "181",
                    "weight": "0.0141"
                }
            },
            {
                "data": {
                    "id": "1032311",
                    "source": "171",
                    "target": "174",
                    "weight": "0.0150"
                }
            },
            {
                "data": {
                    "id": "1032657",
                    "source": "172",
                    "target": "173",
                    "weight": "0.0120"
                }
            },
            {
                "data": {
                    "id": "1033007",
                    "source": "173",
                    "target": "176",
                    "weight": "0.0120"
                }
            },
            {
                "data": {
                    "id": "1033357",
                    "source": "174",
                    "target": "175",
                    "weight": "0.0127"
                }
            },
            {
                "data": {
                    "id": "1033711",
                    "source": "175",
                    "target": "178",
                    "weight": "0.0140"
                }
            },
            {
                "data": {
                    "id": "1034068",
                    "source": "176",
                    "target": "180",
                    "weight": "0.0116"
                }
            },
            {
                "data": {
                    "id": "1034424",
                    "source": "177",
                    "target": "178",
                    "weight": "0.0158"
                }
            },
            {
                "data": {
                    "id": "1034784",
                    "source": "178",
                    "target": "181",
                    "weight": "0.0204"
                }
            },
            {
                "data": {
                    "id": "1035144",
                    "source": "179",
                    "target": "180",
                    "weight": "0.0112"
                }
            },
            {
                "data": {
                    "id": "1035506",
                    "source": "180",
                    "target": "181",
                    "weight": "0.0112"
                }
            }
        ]
}'),
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    //'font-size': '14px',
                    'stroke': '#fff',
                    'stroke-width': '4px',
                    'background-color': '#999',
                    'border-color': 'white',
                    'border-width': '4px'//,
                    //'width': '100%'
                    //'height': '75%'
                }
            },
            {
                selector: 'edge',
                style: {
                    'label': 'data(weight)',
                    'font-size': '7px',
                    "text-rotation": "autorotate",
                    "text-margin-x": "0px",
                    "text-margin-y": "0px",
                    "text-outline-color": "white",
                    "text-outline-width": 1,
                    'opacity': 0.5,
                    'line-color': '#333'
                }
            },
            {
                selector: "node[[degree < 3]]",
                css: {
                    'font-size': '100',
                    'width': '150',
                    'height': '150'
                }
            },
            {
                selector: "node[[degree >= 3]]",
                css: {
                    'font-size': '100',
                    'width': '250',
                    'height': '250'
                }
            },
            {
                selector: "node[[degree >= 5]]",
                css: {
                    'font-size': '100',
                    'width': '300',
                    'height': '300'
                }
            },
            {
                selector: "node[[degree >= 7]]",
                css: {
                    'font-size': '150',
                    'width': '400',
                    'height': '400'
                }
            },
            {
                selector: "node[[degree >= 9]]",
                css: {
                    'font-size': '150',
                    'width': '600',
                    'height': '600'
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
                    'font-size': '55%'

                }
            },
            {
                selector: 'edge.highlight',
                style: {
                    'line-color': $('#module_dropdown').find(":selected").val(),
                    'opacity': 1,
                    'width': 6,
                    'font-size': '20%'
                    
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
    }""\");
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
    target_nodes = cy.elements('node[label = "DYSF"]');
    target_nodes.css({
        "background-color": "blue"
    });
    

    /*
     * HIGHLIGHT THE NODES IN WHICH THE USER HAS CLICKED
     * */

    cy.on('mouseover', 'node', function (e) {
        let node = e.cyTarget;

        if (((e.cy.elements().length + 1) / 2) > 60) {
            node.addClass('highlight_large').outgoers().addClass('highlight_large');
            node.addClass('highlight_large').incomers().addClass('highlight_large');
            node.addClass('highlight_large');
            node.connectedEdges().addClass('highlight_large')
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
    cy.on('mouseout mouseup touchend', 'node', function (e) {
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
        if ($("#geneInfo").length > 0) {
            $("#geneInfo").remove();
        }
    });

    /* 
     * POPPER WITH INFO ABOUT THE GENE
     * */
    cy.on('mousedown touchstart', 'node', function (e) {
        if ($("#geneInfo").length > 0) {
            $("#geneInfo").remove();
        }

        let node = e.cyTarget;
        if (((e.cy.elements().length + 1) / 2) > 60) {
            node.addClass('highlight_large').outgoers().addClass('highlight_large');
            node.addClass('highlight_large').incomers().addClass('highlight_large');
            node.addClass('highlight_large');
            node.connectedEdges().addClass('highlight_large')
        } else {
            node.addClass('highlight').outgoers().addClass('highlight');
            node.addClass('highlight').incomers().addClass('highlight');
            node.addClass('highlight').connectedEdges().addClass('highlight')
        }

        let connected = node
        connected = connected.union(node.outgoers())
        connected = connected.union(node.incomers())
        cy.elements().not(connected).addClass('semitransp');

        let gene = node.data().label;
        let url = '/' + environment + '/API/GetInfoFromGeneNetwork';

        $.ajax({
            url: url,
            type: 'POST',
            data: { term: gene },
            success: function (data) {
                if (data.indexOf("Problems") == -1) {

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
                }
            },
            error: function () {
                //return "No results found!";
                $("body").removeClass("loading");
            }
        })
    });
    

    /***************************************
     * HIGHLIGHT THE EDGES *****************
     ***************************************/

    cy.on('mouseover mousedown touchstart', 'edge', function (e) {
        let edge = e.cyTarget;
        edge.connectedNodes().addClass('highlight');
        edge.addClass('highlight');

        let connected = edge
        connected = connected.union(edge.connectedNodes())
        cy.elements().not(connected).addClass('semitransp');
    });
    cy.on('mouseout mouseup touchend', 'edge', function (e) {
        let edge = e.cyTarget;
        edge.connectedNodes().removeClass('highlight');
        edge.removeClass('highlight');

        cy.elements().removeClass('semitransp');
    });




    
    /*
     * BUTTONS TO DOWNLOAD THE GRAPH DATA
     * */
    cy.ready(function (event) {
        $('#button_area').show();
    });
    $("#save-plot").click(function () {
        var png64 = cy.png({
            full: true,
            bg: "#FFFFFF",//scale:10,
            maxWidth: "1950px",
            maxHeight:"2700px"
    });

        $('#save-plot').attr('href', png64);


    });
    $("#save-data").click(function () {
        //var json = cy.json();
        $('#save-data').attr('href', "data:application/json," + encodeURIComponent(json_data));
    });

}
window.addEventListener('resize', function (event) {
    cy.center();
});
