using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AuFeedback.WebApi.Models
{
    public class UserRecord
    {
        public string UserName { get; set; }
        public string FeedbackDate { get; set; }
        public string QuestionType { get; set; }
    }
}