using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models
{
    public class CoexpModel
    {
        public string WhichOne { get; set; }
        public string Tissue { get; set; }
        public bool OnlyFile { get; set; }
        public string Module { get; set; }
        public bool InCluster { get; set; }
        public bool DoPlot { get; set; }
        public string NetIn { get; set; }
        public string Legend { get; set; }
        public int Threshold { get; set; }
        public bool ReturnProcessed { get; set; }
        public bool UseGrey { get; set; }
        public string DisplayCats { get; set; }

        //Data received from CoExpAPI
        public List<JToken> ModuleLabels { get; set; }
        public List<JToken> ModuleColors { get; set; }
        //MEs


        /// <summary>
        /// Constructor
        /// </summary>
        public CoexpModel()
        {
            WhichOne = "SNIG";
            Tissue = "rnaseq";
            OnlyFile = false;
            Module = "black";
            InCluster = false;
            DoPlot = true;
            NetIn = null;
            Legend = null;
            Threshold = 20;
            ReturnProcessed = true;
            UseGrey = false;
            DisplayCats = null;
        }

        
    }
}
