using CoExp_Web.Adapters;
using CoExp_Web.Models;
using CoExp_Web.Models.Email;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Hosting;
using MimeKit;
using MimeKit.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
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
        readonly private HttpAdapter _adapter;
        /// <summary>
        /// URL to connect with CoExp R application API (published by Plumber package)
        /// </summary>
        private string coexpURL;
        /// <summary>
        /// POST request parameters
        /// </summary>
        private string PostData { get; set; }
        /// <summary>
        /// API production environment URL
        /// </summary>
        public string ProductionEnv { get; set; }
        /// <summary>
        /// API test environment URL
        /// </summary>
        public string TestEnv { get; set; }
        /// <summary>
        /// API private environment URL
        /// </summary>
        public string PrivateEnv { get; set; }
        /// <summary>
        /// API Docker environment URL
        /// </summary>
        public string DockerEnv { get; set; }



        /// <summary>
        /// Constructor. Here, we initialize all class' properties using default values.
        /// </summary>
        public CoExpRepository(IHostingEnvironment hostingEnvironment)
        {
            _adapter = new HttpAdapter();
            ProductionEnv = "https://rytenlab.com/rytenlab_api/Coexp/";
            TestEnv = "https://rytenlab.com/api_test/";
            PrivateEnv = "https://rytenlab.com/api_private/";
            DockerEnv = "http://rcoexp:8800/";
            PostData = null;
           

            if(hostingEnvironment.EnvironmentName == "Production")
            {
                coexpURL = ProductionEnv;
            }
            else if (hostingEnvironment.EnvironmentName == "Development")
            {
                coexpURL = TestEnv;
            }
            else if (hostingEnvironment.EnvironmentName == "Docker")
            {
                coexpURL = DockerEnv;
            }
            else if (hostingEnvironment.EnvironmentName == "Private")
            {
                coexpURL = PrivateEnv;
            }

        }
        
        /// <summary>
        /// Method to obtain data from 'getNetworkCategories' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getNetworkCategories' CoExp API method</param>
        /// <returns>Response received from 'getNetworkCategories' CoExp API method</returns>
        public string GetNetworkCategories()
        {
            string response;
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if(coexpURL == ProductionEnv)
                coexpURL += "GetNetworkCategories";
            else
                coexpURL += "getNetworkCategories";
            //Make the request
            response = _adapter.GETHttpRequestJSON(coexpURL);

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
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (coexpURL == ProductionEnv)
                coexpURL += "GetAvailableNetworks";
            else
                coexpURL += "getAvailableNetworks";

            PostData = "{\"category\":\"" + coexpdata.Category + "\"}";

            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);

            //Return the response
            return finalResponse;
        }

        public string GetAvailableModules(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GetAvailableModules";
                PostData = "{\"network\":\"" + coexpdata.Network +
                "\",\"category\":\"" + coexpdata.Category + "\"}";
            }
            else
            {
                coexpURL += "getModulesFromTissue";
                PostData = "{\"tissue\":\"" + coexpdata.Network +
                "\",\"which.one\":\"" + coexpdata.Category + "\"}";
            }

            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);

            //Return the response
            return finalResponse;
        }  

        public string GetMM(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GetMM";
                PostData = "{\"network\":\"" + coexpdata.Network +
                "\",\"category\":\"" + coexpdata.Category +
                "\",\"module\":\"" + coexpdata.ModuleColor + "\"}";
            }
            else
            {
                coexpURL += "getMM";
                PostData = "{\"tissue\":\"" + coexpdata.Network +
                "\",\"which.one\":\"" + coexpdata.Category +
                "\",\"module\":\"" + coexpdata.ModuleColor + "\"}";
            }

            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);

            //Return the response
            return finalResponse;
        }

        public void SendFeedback(EmailMessage emailMessage)
        {
            EmailService emailService = new EmailService();
            emailService.Send(emailMessage);
        }






        /// <summary>
        /// Method to obtain data from 'getGOFromTissue' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getGOFromTissue' CoExp API method</param>
        /// <returns>Response received from 'getGOFromTissue' CoExp API method</returns>
        public string GetGOFromTissue(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GetGOFromTissue";
                PostData = "{\"network\":\"" + coexpdata.Network +
                "\",\"category\":\"" + coexpdata.Category + "\"}";
            }
            else
            {
                coexpURL += "getGOFromTissue";
                PostData = "{\"tissue\":\"" + coexpdata.Network +
                "\",\"which.one\":\"" + coexpdata.Category + "\"}";
            }     

            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);

            //Return the response
            return finalResponse;
        }

        /// <summary>
        /// Method to obtain data from 'getCellTypeFromTissue' API method. This method makes a GET request.
        /// </summary>
        /// <param name="coexpdata">Data to be sent to 'getCellTypeFromTissue' CoExp API method</param>
        /// <returns>Response received from 'getCellTypeFromTissue' CoExp API method</returns>
        public string GetCellTypeFromTissue(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GetCellTypeFromTissue";
                PostData = "{\"network\":\"" + coexpdata.Network +
                "\",\"category\":\"" + coexpdata.Category + "\"}";
            }
            else
            {
                coexpURL += "getCellTypeFromTissue";
                PostData = "{\"tissue\":\"" + coexpdata.Network +
                "\",\"which.one\":\"" + coexpdata.Category + "\"}";
            }

            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);

            //Return the response
            return finalResponse;
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
            string localResponse;

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


                    if (coexpURL == ProductionEnv)
                    {
                        coexpURL += "ReportOnGenesMultipleTissue";
                        PostData = "{\"networks\":\"" + networks + "\",\"category\":\"" + categoryLabel + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
                    }
                    else
                    {
                        coexpURL += "reportOnGenesMultipleTissue";
                        PostData = "{\"tissues\":\"" + networks + "\",\"which.one\":\"" + categoryLabel + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
                    }

                    //Make the request
                    localResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);
                                     
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
            string localCategory;
            string networks = string.Empty;
            string localNetworks;
            string finalResponse;
            string[] categoryData;

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


            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GlobalReportOnGenes";
                PostData = "{\"categories\":\"" + categoriesLabel + "\",\"networks\":\"" + networks + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
            }
            else
            {
                coexpURL += "globalReportOnGenes";
                PostData = "{\"categories\":\"" + categoriesLabel + "\",\"tissues\":\"" + networks + "\",\"genes\":\"" + coexpdata.Genes + "\"}";
            }
            
            //Make the request
            finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);
            
            return finalResponse;
        }

        
        public string GetModuleTOMGraph(CoexpParams coexpdata)
        {
            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GetModuleTOMGraph";
                PostData = "{\"network\":\"" + coexpdata.Network +
                "\",\"category\":\"" + coexpdata.Category +
                "\",\"module\":\"" + coexpdata.ModuleColor + "\",\"topgenes\":\"" + coexpdata.TopGenes + "\"}";
            }
            else
            {
                coexpURL += "getModuleTOMGraph";
                PostData = "{\"tissue\":\"" + coexpdata.Network +
                "\",\"which.one\":\"" + coexpdata.Category +
                "\",\"module\":\"" + coexpdata.ModuleColor + "\",\"topgenes\":\"" + coexpdata.TopGenes + "\"}";
            }
            
            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);
            
            return finalResponse.ToString();
        }


        public string GetModuleTOMGenes(CoexpParams coexpdata)
        {
            //Set the URL with parameters. This URL will allow us to establish a communication with
            //CoExp R application API (published using Plumber R package)
            if (coexpURL == ProductionEnv)
            {
                coexpURL += "GetModuleTOMGenes";
                PostData = "{\"network\":\"" + coexpdata.Network +
                "\",\"category\":\"" + coexpdata.Category +
                "\",\"module\":\"" + coexpdata.ModuleColor + "\"}";
            }
            else
            {
                coexpURL += "getModuleTOMGenes";
                PostData = "{\"tissue\":\"" + coexpdata.Network +
                "\",\"which.one\":\"" + coexpdata.Category +
                "\",\"module\":\"" + coexpdata.ModuleColor + "\"}";

            }

            //Make the request
            var finalResponse = _adapter.POSTHttpRequestJSON(coexpURL, PostData);

            //Return the response
            return finalResponse;
        }
    }
}