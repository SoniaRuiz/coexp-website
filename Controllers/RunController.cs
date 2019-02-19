﻿using System;
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
    public class RunController : Controller
    {
        
        public IActionResult Catalog(CoexpParams coexpParams)
        {
            return View("Case1",coexpParams);
        }
      
        public IActionResult Annotated(CoexpParams coexpParams)
        {
            return View("Case2", coexpParams);
        }



        public IActionResult Privacy()
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
