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
    [Route("api/[controller]")]
    [ApiController]
    public class APIController : ControllerBase
    {
        [HttpGet]
        public string Index()
        {
            return "Done";
        }
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