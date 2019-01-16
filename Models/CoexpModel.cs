using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models
{
    /// <summary>
    /// Model to store information sent/received from CoExp R application
    /// </summary>
    public class CoexpModel
    {
        public string WhichOne { get; set; }
        public string Tissue { get; set; }
        public string Module { get; set; }
        public string Category { get; set; }
        public string Genes { get; set; }


        /// <summary>
        /// Constructor
        /// </summary>
        public CoexpModel()
        {
            WhichOne = "SNIG";
            Tissue = "rnaseq";
            Module = "black";
            Category = "rosmap";
            Genes = String.Empty;

        }
    }
}
