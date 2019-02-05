using CoExp_Web.Adapters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Repositories
{
    public class ExternalDataRepository
    {
        /// <summary>
        /// Property to manage the http connection
        /// </summary>
        private HttpAdapter _adapter;
        /// <summary>
        /// Constructor. Here we initialize class properties with a default value.
        /// </summary>
        public ExternalDataRepository()
        {
            _adapter = new HttpAdapter();
        }

        public string GetInfoFromQuickGO(string goTerm)
        {
            
            var url = "https://www.ebi.ac.uk/QuickGO/services/ontology/go/terms/" + goTerm;
            //Make the request
            var response = _adapter.HttpRequestJSON(url);

            //Return the response
            return response;
        }
    }
}
