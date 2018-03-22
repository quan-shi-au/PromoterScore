using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AuFeedback.WebApi.Models
{
    public class GeneralResult
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
    }
}