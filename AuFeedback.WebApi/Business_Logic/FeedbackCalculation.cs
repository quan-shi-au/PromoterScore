using AuFeedback.WebApi.Controllers;
using AuFeedback.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace AuFeedback.WebApi.BL
{
    public class FeedbackCalculation : IFeedbackCalculation
    {
        private readonly string _filePath;
        private const string _dateFormat = "yyyyMMdd";

        public FeedbackCalculation(string filePath)
        {
            _filePath = filePath;
        }

        public TimeUp GetTimeUp(string userName, string questionType)
        {
            DateTime lastAnswerDate;
            bool isRecordExisting = false;
            bool? isTimeUp = null;

            var allRecords = Repository.ReadFiles(_filePath);
            var existingRecord = allRecords.FirstOrDefault(x => x.UserName == userName && x.QuestionType == questionType);
            if (existingRecord != null)
            {
                isRecordExisting = true;

                if (DateTime.TryParseExact(existingRecord.FeedbackDate,
                                       _dateFormat,
                                       CultureInfo.InvariantCulture,
                                       DateTimeStyles.None,
                                       out lastAnswerDate))
                {
                    if ((DateTime.Now.Date - lastAnswerDate).Days > 180)
                        isTimeUp = true;
                    else
                        isTimeUp = false;
                }
            }

            return new TimeUp { IsRecordExisting = isRecordExisting, IsTimeUp = isTimeUp };

        }

        public void AddUpdateFeedbackDate(string userName, string questionType)
        {

            var todayDate = DateTime.Now.ToString(_dateFormat);

            var allRecords = Repository.ReadFiles(_filePath);
            var existingRecord = allRecords.FirstOrDefault(x => x.UserName == userName && x.QuestionType == questionType);
            if (existingRecord != null)
                existingRecord.FeedbackDate = todayDate;
            else
                allRecords.Add(new UserRecord { UserName = userName, FeedbackDate = todayDate, QuestionType=questionType });

            Repository.WriteRecord(_filePath, allRecords);
        }

    }
}