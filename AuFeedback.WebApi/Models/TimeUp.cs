using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AuFeedback.WebApi.Models
{
    public class TimeUp
    {
        public bool? IsTimeUp { get; set; }
        public bool IsRecordExisting { get; set; }
    }
}