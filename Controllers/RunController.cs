using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoExp_Web.Models;
using CoExp_Web.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace CoExp_Web.Controllers
{
    /// <summary>
    /// Controller to return views.
    /// </summary>
    public class RunController : Controller
    {


        public IActionResult Index() { 
            return View();
        }

        public IActionResult Catalogue(CoexpParams coexpParams)
        {
            try
            {
                return View(coexpParams);
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }

        public IActionResult Annotated(CoexpParams coexpParams)
        {
            try
            {
                return View(coexpParams);
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }

        public IActionResult Help()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }
        public IActionResult About()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Plot()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Terms()
        {
            try
            {
                return View("TermsAndConditions");
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }
        public IActionResult Datasets()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
            
        }
        public IActionResult Privacy()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }

        public IActionResult Help_Introduction()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }
        public IActionResult Help_Catalogue()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }
        public IActionResult Help_Annotation()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }

        public IActionResult Publication()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                
                this.LogError(e);
                ErrorViewModel errorModel = new ErrorViewModel()
                {
                    Message = e.Message
                };
                return View("Error", errorModel);
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private void LogError(Exception ex)
        {
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            string path = @"~/MyTest.txt";

            //// This text is added only once to the file.

            //File.WriteAllText(path, message);
            

            //// This text is always added, making the file longer over time
            //// if it is not deleted.
            //string appendText = "This is extra text" + Environment.NewLine;
            //File.AppendAllText(path, appendText);

            //// Open the file to read from.
            //string readText = File.ReadAllText(path);
            //Console.WriteLine(readText);
            //string path = Server.MapPath("~/ErrorLog.txt");
            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }
    }
}
