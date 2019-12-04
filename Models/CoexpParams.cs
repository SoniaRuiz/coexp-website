using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models
{
    /// <summary>
    /// Model created to store information both sent and received from CoExp R application
    /// </summary>
    public class CoexpParams
    {
        
        public string Category { get; set; }
        public string Network { get; set; }
        public string ModuleColor { get; set; }
        public string Genes { get; set; }
        public string MultipleSelectionData { get; set; }
        public int TopGenes { get; set; }

    }
}
