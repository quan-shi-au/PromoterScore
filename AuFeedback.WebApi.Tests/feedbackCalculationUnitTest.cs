using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AuFeedback.WebApi.BL;
using AuFeedback.WebApi.Controllers;
using NSubstitute;
using AuFeedback.WebApi.Models;
using System.Collections.Generic;

namespace AuFeedback.WebApi.Tests
{
    [TestClass]
    public class feedbackCalculationUnitTest
    {
        [TestMethod]
        public void ShouldSaveUser()
        {
            var userRecords = new List<UserRecord>
            {
                new UserRecord {UserName = "TestUser", FeedbackDate=DateTime.Now.ToString("yyyyMMdd"), QuestionType="site" }
            };

            var mockRepository = Substitute.For<IRepository>();
            mockRepository.ReadFiles(Arg.Any<string>()).Returns(userRecords);
            mockRepository.WriteRecord(Arg.Any<string>(), userRecords);

            var feedbackCalculation = new FeedbackCalculation(string.Empty, mockRepository);
            feedbackCalculation.AddUpdateFeedbackDate("TestUser", "site");
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "site");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsFalse(timeUp.IsTimeUp ?? true);

        }

        [TestMethod]
        public void ShouldCalculateDays()
        {

            var userRecords = new List<UserRecord>
            {
                new UserRecord {UserName = "TestUser", FeedbackDate=DateTime.Now.ToString("yyyyMMdd"), QuestionType="green" }
            };

            var mockRepository = Substitute.For<IRepository>();
            mockRepository.ReadFiles(Arg.Any<string>()).Returns(userRecords);
            mockRepository.WriteRecord(Arg.Any<string>(), userRecords);

            var feedbackCalculation = new FeedbackCalculation(string.Empty, mockRepository);
            feedbackCalculation.AddUpdateFeedbackDate("TestUser", "green");
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "green");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsFalse(timeUp.IsTimeUp ?? true);
        }
    }
}
