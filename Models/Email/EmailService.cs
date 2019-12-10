using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Models.Email
{
    public interface IEmailService
    {
        void Send(EmailMessage emailMessage);
        //List<EmailMessage> ReceiveEmail(int maxCount = 10);
    }

    public class EmailService : IEmailService
    {
        private readonly String _smtpServer = "smtp.office365.com";
        private readonly int _smptPort = 587;

        //public EmailService(IOptions<EmailConfiguration> emailConfiguration)
        //{
        //    _emailConfiguration = emailConfiguration;
        //}

        //public List<EmailMessage> ReceiveEmail(int maxCount = 10)
        //{
        //    throw new NotImplementedException();
        //}

        public void Send(EmailMessage emailMessage)
        {
            var message = new MimeMessage();
            message.To.Add(new MailboxAddress("Sonia Garcia", "s.ruiz@ucl.ac.uk"));
            message.From.Add(new MailboxAddress(emailMessage.Name, emailMessage.Address));

            message.Subject = emailMessage.Subject;
            //We will say we are sending HTML. But there are options for plaintext etc. 
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = "<u><b>Comments:</b></u><br/>" + emailMessage.Content + "<br/><br/><u><b>Level of satisfaction:</b></u>" + emailMessage.LevelSatisfaction
            };

            //Be careful that the SmtpClient class is the one from Mailkit not the framework!
            using (var emailClient = new SmtpClient())
            {
                //The last parameter here is to use SSL (Which you should!)
                emailClient.Connect(_smtpServer, _smptPort, false);

                //Remove any OAuth functionality as we won't be using it. 
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

                emailClient.Authenticate("", "");

                emailClient.Send(message);

                emailClient.Disconnect(true);
            }
        }
    }
}
