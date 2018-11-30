using CoExp_Web.Adapters;
using CoExp_Web.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Repositories
{
    /// <summary>
    /// Repository to set all operations that can be done in CoExp R application
    /// </summary>
    public class CoExpRepository
    {
        /// <summary>
        /// Property to manage the http connection
        /// </summary>
        private HttpAdapter _adapter;
        /// <summary>
        /// URL to connect with CoExp R application API (published by Plumber package)
        /// </summary>
        private string _coexpURL;
        /// <summary>
        /// Constructor. Here we initialize class properties with a default value.
        /// </summary>
        public CoExpRepository()
        {
            _adapter = new HttpAdapter();
            //TODO: cambiar por la URL de la API correcta!!!!!
            _coexpURL = "http://snca.atica.um.es/coexpapi/";
        }
        /// <summary>
        /// Method to obtain data from 'GetNetworkFromTissue' API method
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'GetNetworkFromTissue' CoExp API method</param>
        /// <returns>Response received from 'GetNetworkFromTissue' CoExp API method</returns>
        public string GetNetworkFromTissue(CoexpModel coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getNetworkFromTissue?tissue=" + coexpdata.Tissue
                + "&which.one=" + coexpdata.WhichOne + "&only.file=" + coexpdata.OnlyFile;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);
            //Process the response
            JObject json = JObject.Parse(response);

            coexpdata.ModuleLabels = (json["moduleLabels"]).ToList();
            coexpdata.ModuleColors = (json["moduleColors"]).ToList();
            //Return the response
            return response;
        }
    }
}