using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CoExp_Web.Adapters
{
    public class HttpAdapter
    {
        public string HttpRequestJSON(string url)
        {
            try
            {
                var request = WebRequest.Create(url);
                string data = null;
                request.Timeout = 15000;
                var response = (HttpWebResponse)request.GetResponse();

                request.ContentType = "application/json; charset=utf-8";

                using (var sr = new StreamReader(response.GetResponseStream()))
                {
                    data = sr.ReadToEnd();
                }

                return data;
            }
            catch (Exception e)
            {
                string message = "Problems with web service connection. Please try again. " + e.Message;
                return message;
            }
        }
    }
}
