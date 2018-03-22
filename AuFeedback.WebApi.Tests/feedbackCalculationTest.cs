using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AuFeedback.WebApi.BL;

namespace AuFeedback.WebApi.Tests
{
    [TestClass]
    public class feedbackCalculationTest
    {
        [TestMethod]
        public void ShouldSaveUser()
        {
            var filePath = "test.csv";
            var feedbackCalculation = new FeedbackCalculation(filePath);

            feedbackCalculation.AddUpdateFeedbackDate("TestUser", "site");
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "site");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsFalse(timeUp.IsTimeUp ?? true);

        }

        [TestMethod]
        public void ShouldCalculateDays()
        {
            var filePath = "test.csv";

            string[] lines = { "UserName,FeedbackDate,QuestionType", "TestUser,20170322,site"};
            System.IO.File.WriteAllLines(filePath, lines);

            var feedbackCalculation = new FeedbackCalculation(filePath);
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "site");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsTrue(timeUp.IsTimeUp ?? false);
        }
    }
}
