using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoExp_Web.Models;
using CoExp_Web.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoExp_Web.Controllers
{
    /// <summary>
    /// API controller (does not return a view) to obtain information from different web services
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class APIController : ControllerBase
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
            string response = repository.GetNetworkFromTissue(coexpdata);
            return response;
        }
    }
}