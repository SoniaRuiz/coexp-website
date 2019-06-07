using CoExp_Web.Adapters;
using CoExp_Web.Models;
using Microsoft.AspNetCore.Hosting;
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
        /// POST request parameters
        /// </summary>
        private string _postData { get; set; }
        /// <summary>
        /// API production environment URL
        /// </summary>
        public string _productionEnv { get; set; }
        /// <summary>
        /// API test environment URL
        /// </summary>
        public string _testEnv { get; set; }
        /// <summary>
        /// API private environment URL
        /// </summary>
        public string _privateEnv { get; set; }

        
        /// <summary>
        /// Constructor. Here, we initialize all class' properties using default values.
        /// </summary>
        public CoExpRepository(IHostingEnvironment hostingEnvironment)
        {
            _adapter = new HttpAdapter();
            _productionEnv = "https://snca.atica.um.es/rytenlab_api/Coexp/";
            _testEnv = "https://snca.atica.um.es/api_test/";
            _privateEnv = "https://snca.atica.um.es/api_private/";
            _postData = null;
           

            if(hostingEnvironment.EnvironmentName == "Production")
            {
                _coexpURL = _productionEnv;
            }
            else if (hostingEnvironment.EnvironmentName == "Development")
            {
                _coexpURL = _testEnv;
            }
            else if (hostingEnvironment.EnvironmentName == "Private")
            {
                _coexpURL = _privateEnv;
            }

        }
        /// <summary>
        /// Method to obtain data from 'getNetworkCategories' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getNetworkCategories' CoExp API method</param>
        /// <returns>Response received from 'getNetworkCategories' CoExp API method</returns>
        public string GetNetworkCategories()
        {
            string response = string.Empty;
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if(_coexpURL == _productionEnv)
                _coexpURL = _coexpURL + "GetNetworkCategories";
            else
                _coexpURL = _coexpURL + "getNetworkCategories";
            //Make the request
            response = _adapter.GETHttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }
        /// <summary>
        /// Method to obtain data from 'getAvailableNetworks' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getAvailableNetworks' CoExp API method</param>
        /// <returns>Response received from 'getAvailableNetworks' CoExp API method</returns>
        public string GetAvailableNetworks(CoexpParams coexpdata)
        {
            string response = string.Empty;
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (_coexpURL == _productionEnv)
                _coexpURL = _coexpURL + "GetAvailableNetworks?category=" + coexpdata.Category;
            else
                _coexpURL = _coexpURL + "getAvailableNetworks?category=" + coexpdata.Category;

            //Make the request
            response = _adapter.GETHttpRequestJSON(_coexpURL);
            

            //Return the response
            return response;
        }
        /// <summary>
        /// Method to obtain data from 'getGOFromTissue' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getGOFromTissue' CoExp API method</param>
        /// <returns>Response received from 'getGOFromTissue' CoExp API method</returns>
        public string GetGOFromTissue(CoexpParams coexpdata)
        {
            string response = string.Empty;

            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (_coexpURL == _productionEnv)
                _coexpURL = _coexpURL + "GetGOFromTissue?tissue=" + coexpdata.Network + "&category=" + coexpdata.Category;
            else
                _coexpURL = _coexpURL + "getGOFromTissue?tissue=" + coexpdata.Network + "&which.one=" + coexpdata.Category;

           
            //Make the request
            response = _adapter.GETHttpRequestJSON(_coexpURL);


            //Return the response
            return response;
        }
        /// <summary>
        /// Method to obtain data from 'getCellTypeFromTissue' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getCellTypeFromTissue' CoExp API method</param>
        /// <returns>Response received from 'getCellTypeFromTissue' CoExp API method</returns>
        public string GetCellTypeFromTissue(CoexpParams coexpdata)
        {
            string response = string.Empty;

            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (_coexpURL == _productionEnv)
                _coexpURL = _coexpURL + "GetCellTypeFromTissue?tissue=" + coexpdata.Network + "&category=" + coexpdata.Category;
            else
                _coexpURL = _coexpURL + "getCellTypeFromTissue?tissue=" + coexpdata.Network + "&which.one=" + coexpdata.Category;

            
            //Make the request
            response = _adapter.GETHttpRequestJSON(_coexpURL);

            //Return the response
            return response;
        }


        /**************************************************************/
        /********************* POST METHODS ***************************/
        /**************************************************************/

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


                    if (_coexpURL == _productionEnv)
                        _coexpURL = _coexpURL + "ReportOnGenesMultipleTissue";
                    else
                        _coexpURL = _coexpURL + "reportOnGenesMultipleTissue";

                    _postData = "{\"tissues\":\"" + networks + "\",\"which.one\":\"" + categoryLabel + "\",\"genes\":\"" + coexpdata.Genes + "\"}";

                    //Make the request
                    localResponse = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
                    
                    

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
            //Declare initial variables
            string categoriesLabel = string.Empty;
            string localCategory = string.Empty;
            string networks = string.Empty;
            string localNetworks = string.Empty;
            string finalResponse = string.Empty;
            string[] categoryData;
            JArray finalJSONresponse = new JArray();

            //Remove parenthesis
            coexpdata.MultipleSelectionData = coexpdata.MultipleSelectionData.Replace("{", "");
            coexpdata.MultipleSelectionData = coexpdata.MultipleSelectionData.Replace("}", "");

            var categories = (coexpdata.MultipleSelectionData).Split("**");
            
            foreach (var category in categories)
            {
                if (category != String.Empty)
                {
                    categoryData = category.Split("|");
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
                    if (localNetworks.Split(",").Length > 1)
                    {
                        for(var i = 0; i< localNetworks.Split(",").Length-1; i++)
                        {
                            categoriesLabel = categoriesLabel + "," + localCategory;
                        }
                    }
                }
            }


            if (_coexpURL == _productionEnv)
            {
                _coexpURL = _coexpURL + "GlobalReportOnGenes";
                _postData = "{\"categories\":\"" + categoriesLabel + "\",\"networks\":\"" + networks + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
            }
            else
            {
                _coexpURL = _coexpURL + "globalReportOnGenes";
                _postData = "{\"categories\":\"" + categoriesLabel + "\",\"tissues\":\"" + networks + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
            }
            
            //Make the request
            finalResponse = _adapter.POSTHttpRequestJSON(_coexpURL, _postData);
            
            return finalResponse;
        }
    }
}