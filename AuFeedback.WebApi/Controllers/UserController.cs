using AuFeedback.WebApi.BL;
using AuFeedback.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace AuFeedback.WebApi.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        public JsonResult<TimeUp> Get(string userName, string questionType)
        {
            var feedbackCalculation = new FeedbackCalculation(GetFilePath());

            return Json(feedbackCalculation.GetTimeUp(userName, questionType));;

        }


        //todo: change this into HttpPost
        [HttpGet]
        public JsonResult<GeneralResult> Save(string userName, string questionType)
        {
            try
            {
                var feedbackCalculation = new FeedbackCalculation(GetFilePath());
                feedbackCalculation.AddUpdateFeedbackDate(userName, questionType);

                return Json(new GeneralResult { IsSuccess = true });
            }
            catch (Exception e)
            {
                return Json(new GeneralResult { IsSuccess = false, ErrorMessage = e.Message });
            }

        }

        private string GetFilePath()
        {
            var fileFolder = HttpContext.Current.Server.MapPath("~/App_Data");
            return $"{fileFolder}\\MyFile.csv";

        }
    }
}
