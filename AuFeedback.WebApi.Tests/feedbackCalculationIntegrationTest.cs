using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AuFeedback.WebApi.BL;
using AuFeedback.WebApi.Controllers;

namespace AuFeedback.WebApi.Tests
{
    [TestClass]
    public class feedbackCalculationIntegrationTest
    {
        [TestMethod]
        public void ShouldSaveUser()
        {
            var filePath = "test.csv";
            var feedbackCalculation = new FeedbackCalculation(filePath, new Repository());

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

            var feedbackCalculation = new FeedbackCalculation(filePath, new Repository());
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "site");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsTrue(timeUp.IsTimeUp ?? false);
        }
    }
}
