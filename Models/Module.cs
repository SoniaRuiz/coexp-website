using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models
{
    public class Module
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public int PValue { get; set; }
        public List<string> Genes { get; set; }

        public Module()
        {
            Genes = new List<string>();
        }
    }
}
