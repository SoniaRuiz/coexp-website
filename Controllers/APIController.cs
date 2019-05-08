using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoExp_Web.Models;
using CoExp_Web.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace CoExp_Web.Controllers
{
    /// <summary>
    /// API controller (does not return a view) to obtain information from different web services
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class APIController : ControllerBase
    {
        /****************************************************************************/
        /******************************* GET METHODS *******************************/
        /****************************************************************************/

        /// <summary>
        /// Welcome method. Used as a tester.
        /// </summary>
        /// <returns>Welcome string</returns>
        [HttpGet]
        public string Index()
        {
            return "Welcome!";
        }

        [HttpGet]
        [Route("GetNetworkCategories")]
        public string GetNetworkCategories()
        {
            //getNetworkCategories()
            CoExpRepository repository = new CoExpRepository();
            string response = repository.GetNetworkCategories();
            return response;
        }

        [HttpGet]
        [Route("GetAvailableNetworks")]
        public string GetAvailableNetworks([FromQuery] CoexpParams coexpdata)
        {
            CoExpRepository repository = new CoExpRepository();
            string response = repository.GetAvailableNetworks(coexpdata);
            return response;
        }

        [HttpGet]
        [Route("GetGOFromTissue")]
        public string GetGOFromTissue([FromQuery] CoexpParams coexpdata)
        {
            //category = which.one
            //network = tissue
            CoExpRepository repository = new CoExpRepository();
            string response = repository.GetGOFromTissue(coexpdata);
            
            //REPLACE CHARACTERS
            string parsed_response = response.Replace("query.number", "query_number");
            parsed_response = parsed_response.Replace("p.value", "p_value");
            parsed_response = parsed_response.Replace("term.size", "term_size");
            parsed_response = parsed_response.Replace("query.size", "query_size");
            parsed_response = parsed_response.Replace("overlap.size", "overlap_size");
            parsed_response = parsed_response.Replace("term.id", "term_id");
            parsed_response = parsed_response.Replace("subgraph.number", "subgraph_number");
            parsed_response = parsed_response.Replace("term.name", "term_name");
            parsed_response = parsed_response.Replace("relative.depth", "relative_depth");
            parsed_response = parsed_response.Replace(",", ", ");

            return parsed_response;
        }

        [HttpGet]
        [Route("GetCellTypeFromTissue")]
        public string GetCellTypeFromTissue([FromQuery] CoexpParams coexpdata)
        {
            //category = which.one
            //network = tissue
            //request to 'getCellTypeFromTissue'

            CoExpRepository repository = new CoExpRepository();
            string response = repository.GetCellTypeFromTissue(coexpdata);
            return response;
            //return "[[\"green\", \"ensheathment of neurons GO:0007272\", \"5.83E-10\", \"REACTOME\"],[\"green\", \"axon ensheathment GO:0008366\", \"5.83E-10\", \"REACTOME\"],[\"green\", \"myelination GO:0042552\", \"2.76E-09\", \"MF\"],[\"green\", \"oligodendrocyte differentiation GO:0048709\", \"6.78E-09\", \"REACTOME\"],[\"green\", \"glial cell differentiation GO:0010001\", \"1.57E-07\", \"KEGG\"],[\"yellow\", \"oligodendrocyte differentiation GO:0048709\", \"6.78E-09\", \"CC\"],[\"yellow\", \"glial cell differentiation GO:0010001\", \"1.57E-07\", \"CC\"],[\"black\", \"ensheathment of neurons GO:0007272\", \"5.83E-10\", \"BB\"],[\"black\", \"axon ensheathment GO:0008366\", \"5.83E-10\", \"BB\"],[\"black\", \"myelination GO:0042552\", \"2.76E-09\", \"BB\"],[\"black\", \"oligodendrocyte differentiation GO:0048709\", \"6.78E-09\", \"BB\"],[\"black\", \"glial cell differentiation GO:0010001\", \"1.57E-07\", \"BB\"],[\"yellow\", \"ensheathment of neurons GO:0007272\", \"5.83E-10\", \"CC\"],[\"yellow\", \"axon ensheathment GO:0008366\", \"5.83E-10\", \"CC\"],[\"yellow\", \"myelination GO:0042552\", \"2.76E-09\", \"CC\"]]";
        }

        [HttpGet]
        [Route("GetTreeMenuData")]
        public string GetTreeMenuData()
        {
            try
            {
                dynamic jsonCategories = JsonConvert.DeserializeObject(GetNetworkCategories());
                List<TreeMenuNode> nodes = new List<TreeMenuNode>();
                //List<Network> networks = new List<Network>();
                int categoryID = 1;
                int networkID = 100;

                TreeMenuNode all = new TreeMenuNode();
                all.name = "All";
                all.id = "0";
                all.pid = string.Empty;
                nodes.Add(all);

                foreach (var categoryName in jsonCategories)
                {
                    TreeMenuNode category = new TreeMenuNode();
                    category.name = categoryName;
                    category.id = categoryID.ToString();
                    category.pid = "0";
                    category.label = categoryName;
                    nodes.Add(category);

                    CoexpParams coexpParams = new CoexpParams();
                    coexpParams.Category = category.name;


                    dynamic jsonNetworks = JsonConvert.DeserializeObject(GetAvailableNetworks(coexpParams));
                    foreach (var networkName in jsonNetworks)
                    {
                        TreeMenuNode network = new TreeMenuNode();
                        network.name = networkName;
                        network.id = networkID.ToString();
                        network.pid = categoryID.ToString();
                        network.label = categoryName;

                        nodes.Add(network);
                        networkID++;

                    }



                    categoryID++;
                    networkID = 100;
                }
                var jsonAllData = JsonConvert.SerializeObject(nodes);
                return jsonAllData;
            }
            catch(Exception ex)
            {
                return "Problems with web service connection. " + ex.Message;
            }

        }

        [HttpGet]
        [Route("GetTomDataBRAINEAC")]
        public string GetTomDataBRAINEAC([FromQuery] BraineacParams braineacData)
        {
            BraineacRepository repository = new BraineacRepository();
            //string response = repository.GetJSONTomData(braineacData);
            string response = "{\"columns\": [\"gene\", \"ensg\", \"module\", \"ENSG00000187231\", \"ENSG00000151240\", \"ENSG00000234531\", \"ENSG00000131386\", \"ENSG00000270405\", \"ENSG00000249772\", \"ENSG00000159256\", \"ENSG00000188486\", \"ENSG00000100221\", \"ENSG00000271468\", \"ENSG00000012048\", \"ENSG00000130684\", \"ENSG00000164989\", \"ENSG00000230409\", \"ENSG00000179468\"], \"results\": [[\"SESTD1\", \"ENSG00000187231\", \"black\", 1.0, 0.025687040761113167, 0.009459679014980793, 0.02879427932202816, 0.008128294721245766, 0.0007437103195115924, 0.03078741766512394, 0.025316674262285233, 0.026060927659273148, 0.005704238545149565, 0.03298395127058029, 0.025317203253507614, 0.015101919881999493, 0.0012175124138593674, 0.023385992273688316], [\"DIP2C\", \"ENSG00000151240\", \"black\", 0.025687040761113167, 1.0, 0.007483768276870251, 0.023943811655044556, 0.004429688211530447, 0.0020409829448908567, 0.02957707643508911, 0.022492941468954086, 0.0157569982111454, 0.006598545704036951, 0.028065131977200508, 0.02624683640897274, 0.018264364451169968, 0.003234490053728223, 0.023445168510079384], [\"ENSG00000234531\", \"ENSG00000234531\", \"black\", 0.02694907784461975, 0.027676744386553764, 0.0075879222713410854, 0.025976963341236115, 0.004463933873921633, 0.0013728711055591702, 0.022432049736380577, 0.0250238124281168, 0.017466753721237183, 0.00658737076446414, 0.0234923604875803, 0.02312091924250126, 0.01613883674144745, 0.0016403078334406018, 0.022129451856017113], [\"GALNT15\", \"ENSG00000131386\", \"black\", 0.02879427932202816, 0.023943811655044556, 0.009009561501443386, 1.0, 0.0051169805228710175, 0.0008638509316369891, 0.020532239228487015, 0.023323724046349525, 0.018774406984448433, 0.006558761466294527, 0.02395596355199814, 0.021586155518889427, 0.012724828906357288, 0.0008401742670685053, 0.025316443294286728], [\"RP11-208G20.3\", \"ENSG00000270405\", \"black\", 0.025571981444954872, 0.02145686000585556, 0.008321776986122131, 0.023885715752840042, 0.00521918386220932, 0.0009071534732356668, 0.019221600145101547, 0.01829192228615284, 0.01769404113292694, 0.004662211984395981, 0.019005030393600464, 0.018946370109915733, 0.012668509036302567, 0.0005404310650192201, 0.018619144335389137], [\"CTD-2193P3.2\", \"ENSG00000249772\", \"black\", 0.01734722964465618, 0.016828114166855812, 0.008317960426211357, 0.019513098523020744, 0.003741820575669408, 0.0018715017940849066, 0.013656864874064922, 0.015887852758169174, 0.012731848284602165, 0.007021049503237009, 0.015216384083032608, 0.013979561626911163, 0.012404303066432476, 0.0010405398206785321, 0.020917560905218124], [\"MORC3\", \"ENSG00000159256\", \"black\", 0.03078741766512394, 0.02957707643508911, 0.006544962991029024, 0.020532239228487015, 0.0053050322458148, 0.0018873404478654265, 1.0, 0.014810344204306602, 0.0161086805164814, 0.005871774163097143, 0.02492176555097103, 0.019997650757431984, 0.015555905178189278, 0.0020519753452390432, 0.020270776003599167], [\"H2AFX\", \"ENSG00000188486\", \"black\", 0.025316674262285233, 0.022492941468954086, 0.008786095306277275, 0.023323724046349525, 0.0026264593470841646, 0.0010213620262220502, 0.014810344204306602, 1.0, 0.020568059757351875, 0.006317521911114454, 0.017539242282509804, 0.021803591400384903, 0.012112051248550415, 0.0007208164897747338, 0.014638250693678856], [\"JOSD1\", \"ENSG00000100221\", \"black\", 0.026060927659273148, 0.0157569982111454, 0.0070524574257433414, 0.018774406984448433, 0.005806672852486372, 0.0012481162557378411, 0.0161086805164814, 0.020568059757351875, 1.0, 0.004381935112178326, 0.016445331275463104, 0.014913261868059635, 0.011004101485013962, 0.000378751487005502, 0.011198540218174458], [\"RP11-14N4.1\", \"ENSG00000271468\", \"black\", 0.024890070781111717, 0.02425944246351719, 0.006220581941306591, 0.020979326218366623, 0.0035342497285455465, 0.0009882345329970121, 0.01620231755077839, 0.02430913597345352, 0.014570282772183418, 0.0058647580444812775, 0.017743131145834923, 0.01950937882065773, 0.012524313293397427, 0.0011318684555590153, 0.016440484672784805], [\"BRCA1\", \"ENSG00000012048\", \"black\", 0.03298395127058029, 0.028065131977200508, 0.0062448796816170216, 0.02395596355199814, 0.004151421133428812, 0.0010041099740192294, 0.02492176555097103, 0.017539242282509804, 0.016445331275463104, 0.004986126441508532, 1.0, 0.01909768395125866, 0.01287049986422062, 0.001403965288773179, 0.018955135717988014], [\"ZNF337\", \"ENSG00000130684\", \"black\", 0.025317203253507614, 0.02624683640897274, 0.00814109854400158, 0.021586155518889427, 0.0037593264132738113, 0.001238395576365292, 0.019997650757431984, 0.021803591400384903, 0.014913261868059635, 0.006155587267130613, 0.01909768395125866, 1.0, 0.012828875333070755, 0.0010170933092013001, 0.016897737979888916], [\"CCDC171\", \"ENSG00000164989\", \"black\", 0.015101919881999493, 0.018264364451169968, 0.008478691801428795, 0.012724828906357288, 0.0056767649948596954, 0.004097258672118187, 0.015555905178189278, 0.012112051248550415, 0.011004101485013962, 0.008734142407774925, 0.01287049986422062, 0.012828875333070755, 1.0, 0.0013921927893534303, 0.012334204278886318], [\"TCEA1P2\", \"ENSG00000230409\", \"black\", 0.024407224729657173, 0.023091996088624, 0.0061336602084338665, 0.017719479277729988, 0.0044401283375918865, 0.0011032001348212361, 0.017839523032307625, 0.014590143226087093, 0.013349298387765884, 0.0044470978900790215, 0.018015429377555847, 0.015455069951713085, 0.012020690366625786, 0.0011268854141235352, 0.01715189963579178], [\"OR9A2\", \"ENSG00000179468\", \"black\", 0.023385992273688316, 0.023445168510079384, 0.006016986910253763, 0.025316443294286728, 0.004783258307725191, 0.001323903794400394, 0.020270776003599167, 0.014638250693678856, 0.011198540218174458, 0.005658883135765791, 0.018955135717988014, 0.016897737979888916, 0.012334204278886318, 0.0016319321002811193, 1.0]]}";
            return response;
        }

        /****************************************************************************/
        /******************************* POST METHODS *******************************/
        /****************************************************************************/

        [HttpPost]
        [Route("GetInfoFromQuickGO")]
        public string GetInfoFromQuickGO([FromForm]string term)
        {
            ExternalDataRepository repository = new ExternalDataRepository();
            string response = repository.GetInfoFromQuickGO(term);

            return response;
        }

        [HttpPost]
        [Route("GetInfoFromREACTOME")]
        public string GetInfoFromREACTOME([FromForm]string term)
        {
            ExternalDataRepository repository = new ExternalDataRepository();
            string response = repository.GetInfoFromREACTOME(term);

            return response;
        }

        [HttpPost]
        [Route("GetInfoFromKEGG")]
        public string GetInfoFromKEGG([FromForm]string term)
        {
            ExternalDataRepository repository = new ExternalDataRepository();
            string response = repository.GetInfoFromKEGG(term);

            return response;
        }

        [HttpPost]
        [Route("PostReportOnGenesMultipleTissue")]
        public string PostReportOnGenesMultipleTissue([FromBody] CoexpParams coexpdata)
        {
            //category = which.one
            //network = tissue
            CoExpRepository repository = new CoExpRepository();
            string response = repository.ReportOnGenesMultipleTissue(coexpdata);

            string parsed_response = response.Replace("go.report", "go_report");
            parsed_response = parsed_response.Replace("pd.genes", "pd_genes");
            parsed_response = parsed_response.Replace("cell.type.pred", "cell_type_pred");
            //parsed_response = parsed_response.Replace("p.val.mods", "p_val_mods");
            parsed_response = parsed_response.Replace("tissue", "network");


            return parsed_response;
        }

        [HttpPost]
        [Route("PostGlobalReportOnGenes")]
        public string PostGlobalReportOnGenes([FromBody] CoexpParams coexpdata)
        {
            //category = which.one
            //network = tissue
            CoExpRepository repository = new CoExpRepository();
            string response = repository.GlobalReportOnGenes(coexpdata);

            string parsed_response = response.Replace("go.report", "go_report");
            parsed_response = parsed_response.Replace("pd.genes", "pd_genes");
            parsed_response = parsed_response.Replace("cell.type.pred", "cell_type_pred");
            //parsed_response = parsed_response.Replace("p.val.mods", "p_val_mods");
            parsed_response = parsed_response.Replace("tissue", "network");


            return parsed_response;
        }
 
    }
}