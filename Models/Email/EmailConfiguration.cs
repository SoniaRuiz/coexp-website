using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models.Email
{
    public interface IEmailConfiguration
    {
        string SmtpServer { get; }
        int SmtpPort { get; }
        string SmtpUsername { get; set; }
        string SmtpPassword { get; set; }

        //string PopServer { get; }
        //int PopPort { get; }
        //string PopUsername { get; }
        //string PopPassword { get; }
    }

    public class EmailConfiguration : IEmailConfiguration
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }

        //public string PopServer { get; set; }
        //public int PopPort { get; set; }
        //public string PopUsername { get; set; }
        //public string PopPassword { get; set; }
    }
}
