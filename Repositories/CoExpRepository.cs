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
            _coexpURL = "https://snca.atica.um.es/api/";
        }
        /// <summary>
        /// Method to obtain data from 'getNetworkCategories' API method
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getNetworkCategories' CoExp API method</param>
        /// <returns>Response received from 'getNetworkCategories' CoExp API method</returns>
        public string GetNetworkCategories()
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getNetworkCategories";
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string GetAvailableNetworks(CoexpModel coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getAvailableNetworks?category=" + coexpdata.Category;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string GetGOFromTissue(CoexpModel coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getGOFromTissue?tissue=" + coexpdata.Tissue + "&which.one=" + coexpdata.WhichOne;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string GetCellTypeFromTissue(CoexpModel coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getCellTypeFromTissue?tissue=" + coexpdata.Tissue + "&which.one=" + coexpdata.WhichOne;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string ReportOnGenes(CoexpModel coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "reportOnGenes?tissue=" + coexpdata.Tissue + "&which.one=" + coexpdata.WhichOne + "&genes=" + coexpdata.Genes;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }
    }
}