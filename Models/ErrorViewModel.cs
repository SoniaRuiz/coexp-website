using System;

namespace CoExp_Web.Models
{
    /// <summary>
    /// Model created to store information about errors
    /// </summary>
    public class ErrorViewModel
    {
        public string RequestId { get; set; }
        public string Message { get; set; }
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}