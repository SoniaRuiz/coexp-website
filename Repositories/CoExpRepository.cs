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

        public string GetAvailableNetworks(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getAvailableNetworks?category=" + coexpdata.Category;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string GetGOFromTissue(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getGOFromTissue?tissue=" + coexpdata.Network + "&which.one=" + coexpdata.Category;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string GetCellTypeFromTissue(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            _coexpURL = _coexpURL + "getCellTypeFromTissue?tissue=" + coexpdata.Network + "&which.one=" + coexpdata.Category;
            //Make the request
            var response = _adapter.HttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }

        public string ReportOnGenesMultipleTissue(CoexpParams coexpdata)
        {

            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            var finalResponse = string.Empty;
            //"**CoExpROSMAP**probad,ad,**gtexv6**AntCingCortex"
            var categories = (coexpdata.MultipleSelectionData).Split("**,");
            List<JArray> responses = new List<JArray>();
            JArray finalJSONresponse = new JArray();

            foreach (var category in categories)
            {
                if(category != String.Empty)
                {
                    var categoryData = category.Split("|");
                    var categoryLabel = categoryData[0];
                    var networks = string.Empty;
                    if (categoryData[1].Substring(categoryData[1].Length - 1, 1) == (","))
                        networks = categoryData[1].Remove(categoryData[1].Length - 2);
                    else
                        networks = categoryData[1];

                    if(networks.Contains("**"))
                        networks = networks.Remove(networks.Length - 2);

                    var url = _coexpURL + "reportOnGenesMultipleTissue?tissues=" + networks + "&which.one=" + categoryLabel + "&genes=" + coexpdata.Genes;
                    var localResponse = _adapter.HttpRequestJSON(url);

                    if (!localResponse.Contains("error"))
                    {
                        JObject item = JObject.Parse(localResponse);                     
                        responses.Add((JArray)item.SelectToken("report"));
                    }
                    else
                    {
                        finalResponse = localResponse;
                        break;
                    }
                }
            }
            //finalJSONresponse = responses[0];
            if (finalResponse == string.Empty)
            {
    
                foreach (JArray response in responses)
                {
                    foreach(var e in response)
                    {
                        finalJSONresponse.Add(e);
                    }
                    
                }

                return finalJSONresponse.ToString();
            }
            else
            //Return the response
            return finalResponse;
        }

    }
}