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
        /// HttpRequest method
        /// </summary>
        private string _method { get; set; }
        /// <summary>
        /// POST request parameters
        /// </summary>
        private string _postData { get; set; }
        /// <summary>
        /// Constructor. Here we initialize class properties with a default value.
        /// </summary>
        public CoExpRepository()
        {
            _adapter = new HttpAdapter();
            //var production_env = "https://snca.atica.um.es/rytenlab_api/";
            //var test_env = "https://snca.atica.um.es/api_test/";
            //var private_env = "https://snca.atica.um.es/api_private/";
            _coexpURL = "https://snca.atica.um.es/api_test/";
            _method = "POST";
            _postData = null;

        }
        /// <summary>
        /// Method to obtain data from 'getNetworkCategories' API method
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getNetworkCategories' CoExp API method</param>
        /// <returns>Response received from 'getNetworkCategories' CoExp API method</returns>
        public string GetNetworkCategories()
        {
            string response = string.Empty;
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (_method == "POST")
            {
                _coexpURL = _coexpURL + "getNetworkCategories";
                //Make the request
                response = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
            }

            //Return the response
            return response;
        }

        public string GetAvailableNetworks(CoexpParams coexpdata)
        {
            string response = string.Empty;
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (_method == "POST")
            {
                _coexpURL = _coexpURL + "getAvailableNetworks";
                
                _postData = "{\"category\":\"" + coexpdata.Category + "\"}";

                //Make the request
                response = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
            }
            else
            {
                _coexpURL = _coexpURL + "getAvailableNetworks?category=" + coexpdata.Category;
                //Make the request
                response = _adapter.HttpRequestJSON(_coexpURL);
            }

            //Return the response
            return response;
        }

        public string GetGOFromTissue(CoexpParams coexpdata)
        {
            string response = string.Empty;
            if (_method == "POST")
            {
                _coexpURL = _coexpURL + "getGOFromTissue";

                _postData = "{\"tissue\":\"" + coexpdata.Network + "\",\"which.one\":\"" + coexpdata.Category + "\"}";

                //Make the request
                response = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
            }
            else
            {
                //Set the URL with parameters. This URL will allow us to establish a communication with
                //CoExp R application API (published using Plumber R package)
                _coexpURL = _coexpURL + "getGOFromTissue?tissue=" + coexpdata.Network + "&which.one=" + coexpdata.Category;
                //Make the request
                response = _adapter.HttpRequestJSON(_coexpURL);
            }

            //Return the response
            return response;
        }

        public string GetCellTypeFromTissue(CoexpParams coexpdata)
        {
            string response = string.Empty;
            if (_method == "POST")
            {
                _coexpURL = _coexpURL + "getCellTypeFromTissue";

                _postData = "{\"tissue\":\"" + coexpdata.Network + "\",\"which.one\":\"" + coexpdata.Category + "\"}";

                //Make the request
                response = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
            }
            else
            {
                //Set the URL with parameters. This URL will allow us to establish a communication with
                //CoExp R application API (published using Plumber R package)
                _coexpURL = _coexpURL + "getCellTypeFromTissue?tissue=" + coexpdata.Network + "&which.one=" + coexpdata.Category;
                //Make the request
                response = _adapter.HttpRequestJSON(_coexpURL);
            }
            

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
            string localResponse = string.Empty;

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

                    
                    if (_method == "POST")
                    {
                        _coexpURL = _coexpURL + "reportOnGenesMultipleTissue";
                        _postData = "{\"tissues\":\"" + networks + "\",\"which.one\":\"" + categoryLabel + "\",\"genes\":\"" + coexpdata.Genes + "\"}";

                        //Make the request
                        localResponse = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
                    }
                    else
                    {
                        _coexpURL = _coexpURL + "reportOnGenesMultipleTissue?tissues=" + networks + "&which.one=" + categoryLabel + "&genes=" + coexpdata.Genes;
                        localResponse = _adapter.HttpRequestJSON(_coexpURL);
                        
                    }
                    

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

        public string GlobalReportOnGenes(CoexpParams coexpdata)
        {
            coexpdata.MultipleSelectionData = coexpdata.MultipleSelectionData.Remove(0, 1);
            coexpdata.MultipleSelectionData = coexpdata.MultipleSelectionData.Remove(coexpdata.MultipleSelectionData.Length - 1, 1);

            //"**CoExpROSMAP**probad,ad,**gtexv6**AntCingCortex"
            var categories = (coexpdata.MultipleSelectionData).Split("**,");
            
            
            var categoriesLabel = string.Empty;
            var localCategory = string.Empty;
            var networks = string.Empty;
            var localNetworks = string.Empty;
            var finalResponse = string.Empty;

            JArray finalJSONresponse = new JArray();

            foreach (var category in categories)
            {
                if (category != String.Empty)
                {
                    var categoryData = category.Split("|");
                    localCategory = categoryData[0];
                    if (categoriesLabel.Length == 0)
                        categoriesLabel = categoryData[0];
                    else
                        categoriesLabel = categoriesLabel + "," + categoryData[0];


                    if (categoryData[1].Substring(categoryData[1].Length - 1, 1) == (","))
                    {
                        localNetworks = categoryData[1].Remove(categoryData[1].Length - 2);
                        if (networks.Length > 0)
                            networks = networks + "," + categoryData[1].Remove(categoryData[1].Length - 2);
                        else
                            networks = categoryData[1].Remove(categoryData[1].Length - 2);
                    }
                    else
                    {
                        localNetworks = categoryData[1];
                        if (networks.Length > 0)
                            networks = networks + "," + categoryData[1];
                        else
                            networks = categoryData[1];
                    }

                    if (networks.Contains("**"))
                        networks = networks.Remove(networks.Length - 2);

                    String[] allNetworks = networks.Split(",");
                    String[] allCategories = networks.Split(",");
                    if (localNetworks.Split(",").Length > 1)
                    {
                        for(var i = 0; i< localNetworks.Split(",").Length-1; i++)
                        {
                            categoriesLabel = categoriesLabel + "," + localCategory;
                        }
                    }
                }
            }
            if (_method == "POST")
            {
                _coexpURL = _coexpURL + "globalReportOnGenes";
                _postData = "{\"tissues\":\"" + networks + "\",\"categories\":\"" + categoriesLabel + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
                //Make the request
                finalResponse = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
            }
            else
            {
                _coexpURL = _coexpURL + "globalReportOnGenes?tissues=" + networks + "&categories=" + categoriesLabel + "&genes=" + coexpdata.Genes;
                finalResponse = _adapter.HttpRequestJSON(_coexpURL);
            }

            return finalResponse;
        }
    }
}