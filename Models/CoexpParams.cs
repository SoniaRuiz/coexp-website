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
    public class CoexpParams
    {
        
        public string Category { get; set; }
        public string Network { get; set; }
        public string ModuleColor { get; set; }
        public string Genes { get; set; }
        public string MultipleSelectionData { get; set; }


        /// <summary>
        /// Constructor
        /// </summary>
        public CoexpParams()
        {
            //    Category = "CoExpROSMAP";
            //    Network = "ad";
            //    ModuleColor = "black";
            //    Genes = String.Empty;
            //MultipleSelectionData = new List<string>();
        }
    }
}
