using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CoExp_Web.Adapters
{
    /// <summary>
    /// Class to make http requests
    /// </summary>
    public class HttpAdapter
    {
        /// <summary>
        /// Method to make a GET http request and have a JSON as response
        /// </summary>
        /// <param name="url">URL where we want to make the request</param>
        /// <returns>Response (in JSON format) received from the URL</returns>
        public string GETHttpRequestJSON(string url)
        {
            try
            {
                var request = WebRequest.Create(url);

                string data = null;
                request.Timeout = 1500000;
                request.ContentType = "application/json; charset=utf-8";
                //request.Headers["Access-Control-Allow-Origin"] = "*";
                //request.Headers["Access-Control-Allow-Headers"] = "Content-Type";
                //request.Headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";
                //request.Headers["Access-Control-Allow-Credentials"] = "true";
                //request.Headers[HttpRequestHeader.Allow] = "*";
                //request.Headers[HttpRequestHeader.Authorization] = "*";
  


                //Make the request
                var response = (HttpWebResponse)request.GetResponse();
                //Read the response
                using (var sr = new StreamReader(response.GetResponseStream()))
                {
                    data = sr.ReadToEnd();
                }
                //Return data
                return data;
            }
            catch (Exception e)
            {
                string message = "Problems with web service connection. Please try again. " + e.Message;
                return message;
            }
        }

        /// <summary>
        /// Method to make a POST http request and have a JSON as response
        /// </summary>
        /// <param name="url">URL where we want to make the request</param>
        /// <param name="postData">parameters to send in the request body</param>
        /// <returns>Response (in JSON format) received from the URL</returns>
        public string POSTHttpRequestJSON(string url, string postData = null)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                
                //request.Timeout = 1500000;
                request.Method = "POST";
                request.ContentType = "application/json; charset=utf-8";


                //request.Headers["Access-Control-Allow-Origin"] = "*";
                //request.Headers["Access-Control-Allow-Headers"] = "Content-Type";
                //request.Headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";
                //request.Headers["Access-Control-Allow-Credentials"] = "true";
                //request.Headers[HttpRequestHeader.Allow] = "*";
                //request.Headers[HttpRequestHeader.Authorization] = "*";



                if (postData != null)
                {
                    using(var streamWriter = new StreamWriter(request.GetRequestStream()))
                    {
                        Debug.Write(postData);
                        streamWriter.Write(postData);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }
                }
                var response = (HttpWebResponse)request.GetResponse();
                string responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                //Return data
                return responseString;
            }
            catch (Exception e)
            {
                string message = "Problems with web service connection. Please try again. " + e.Message;
                return message;
            }
        }
    }
}