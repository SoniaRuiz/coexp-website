using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoExp_Web.Models;
using CoExp_Web.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace CoExp_Web.Controllers
{
    /// <summary>
    /// API controller (does not return a view) to obtain information from different web services
    /// </summary>
    [Route("/[controller]")]
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
        /// <summary>
        /// Controller method to obtain data from GetNetworkFromTissue RytenLab_API method
        /// </summary>
        /// <param name="coexpdata">Data to be sent to the API</param>
        /// <returns>Response received from the API</returns>
        // GET: api/<controller>
        [HttpGet]
        [Route("GetNetworkFromTissue")]
        public string GetNetworkFromTissue([FromQuery] CoexpModel coexpdata)
        {
            CoExpRepository repository = new CoExpRepository();
            //string response = repository.GetNetworkFromTissue(coexpdata);
            return String.Empty;
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
        public string GetAvailableNetworks([FromQuery] CoexpModel coexpdata)
        {
            CoExpRepository repository = new CoExpRepository();
            string response = repository.GetAvailableNetworks(coexpdata);
            return response;
        }
        [HttpGet]
        [Route("GetGOFromTissue")]
        public string GetGOFromTissue([FromQuery] CoexpModel coexpdata)
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
        public string GetCellTypeFromTissue([FromQuery] CoexpModel coexpdata)
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
        [Route("ReportOnGenes")]
        public string ReportOnGenes([FromQuery] CoexpModel coexpdata)
        {
            //category = which.one
            //network = tissue
            CoExpRepository repository = new CoExpRepository();
            string response = repository.ReportOnGenes(coexpdata);

            string parsed_response = response.Replace("go.report", "go_report");
            parsed_response = parsed_response.Replace("pd.genes", "pd_genes");
            parsed_response = parsed_response.Replace("cell.type.pred", "cell_type_pred");
            parsed_response = parsed_response.Replace("p.val.mods", "p_val_mods");


            return parsed_response;
        }
    }
}