using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models.Email
{
    public class EmailMessage
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string LevelSatisfaction { get; set; }

    }
}
