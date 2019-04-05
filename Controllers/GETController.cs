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
    public class GETController : ControllerBase
    {
        /// <summary>
        /// Welcome method. Used as a tester.
        /// </summary>
        /// <returns>Welcome string</returns>
        [HttpGet]
        public string Index()
        {
            return "Welcome!";
        }

        //[HttpGet]
        //[Route("GetNetworkFromTissue")]
        //public string GetNetworkFromTissue([FromQuery] CoexpModel coexpdata)
        //{
        //    CoExpRepository repository = new CoExpRepository();
        //    //string response = repository.GetNetworkFromTissue(coexpdata);
        //    return String.Empty;
        //}

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
        [Route("ReportOnGenesMultipleTissue")]
        public string ReportOnGenesMultipleTissue([FromQuery] CoexpParams coexpdata)
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

        [HttpGet]
        [Route("GlobalReportOnGenes")]
        public string GlobalReportOnGenes([FromQuery] CoexpParams coexpdata)
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

        [HttpGet]
        [Route("GetTreeMenuData")]
        public string GetTreeMenuData(string query)
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
    }
}