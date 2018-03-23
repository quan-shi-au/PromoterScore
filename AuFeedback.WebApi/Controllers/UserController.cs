using AuFeedback.WebApi.BackendData;
using AuFeedback.WebApi.BL;
using AuFeedback.WebApi.Models;
using System;
using System.Web;
using System.Web.Http;

using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace AuFeedback.WebApi.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private readonly IRepository _repository;

        public UserController(IRepository repository)
        {
            _repository = repository;
        }

        public JsonResult<TimeUp> Get(string userName, string questionType)
        {
            var feedbackCalculation = new FeedbackCalculation(GetFilePath(), _repository);

            return Json(feedbackCalculation.GetTimeUp(userName, questionType));

        }

        [HttpPost]
        public JsonResult<GeneralResult> Post(string userName, string questionType)
        {
            try
            {
                var feedbackCalculation = new FeedbackCalculation(GetFilePath(), _repository);
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
