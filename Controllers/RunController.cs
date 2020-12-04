using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoExp_Web.Models;
using CoExp_Web.Repositories;
using Microsoft.AspNetCore.Authorization;

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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
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
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
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

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Help_Introduction()
        {
            return View();
        }
        public IActionResult Help_Catalogue()
        {
            return View();
        }
        public IActionResult Help_Annotation()
        {
            return View();
        }

        public IActionResult Publication()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
