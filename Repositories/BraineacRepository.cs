using CoExp_Web.Adapters;
using CoExp_Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Repositories
{
    public class BraineacRepository
    {
        /// <summary>
        /// Property to manage the http connection
        /// </summary>
        private HttpAdapter _adapter;
        /// <summary>
        /// URL to connect to Braineac API
        /// </summary>
        private string _braineacURL;
        
        /// <summary>
        /// Constructor. Here we initialize class properties with a default value.
        /// </summary>
        public BraineacRepository()
        {
            _adapter = new HttpAdapter();
            _braineacURL = "http://braineacv2.inf.um.es/";
        }
        
        public string GetJSONTomData(BraineacParams data)
        {
            string response = string.Empty;
            //Set the URL with parameters. This URL will allow us to establish a communication with
            _braineacURL = _braineacURL + "tomdata?module=" + data.ModuleColor + "&tissue=" + data.Network + "&top=" + data.Top;
            //Make the request
            response = "hello everybody";//_adapter.GETHttpRequestJSON(_braineacURL);

            //Return the response
            return response;
        }
    }
}