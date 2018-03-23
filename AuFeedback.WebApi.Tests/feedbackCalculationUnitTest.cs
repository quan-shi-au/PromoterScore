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
        public void ShouldCalculateDaysLessThan180()
        {

            var userRecords = new List<UserRecord>
            {
                new UserRecord {UserName = "TestUser", FeedbackDate=DateTime.Now.AddDays(-10).ToString("yyyyMMdd"), QuestionType="green" }
            };

            var mockRepository = Substitute.For<IRepository>();
            mockRepository.ReadFiles(Arg.Any<string>()).Returns(userRecords);

            var feedbackCalculation = new FeedbackCalculation(string.Empty, mockRepository);
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "green");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsFalse(timeUp.IsTimeUp ?? true);
        }

        [TestMethod]
        public void ShouldCalculateDaysEqual180()
        {

            var userRecords = new List<UserRecord>
            {
                new UserRecord {UserName = "TestUser", FeedbackDate=DateTime.Now.AddDays(-180).ToString("yyyyMMdd"), QuestionType="red" }
            };

            var mockRepository = Substitute.For<IRepository>();
            mockRepository.ReadFiles(Arg.Any<string>()).Returns(userRecords);

            var feedbackCalculation = new FeedbackCalculation(string.Empty, mockRepository);
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "red");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsFalse(timeUp.IsTimeUp ?? true);
        }

        [TestMethod]
        public void ShouldCalculateDaysMoreThan180()
        {

            var userRecords = new List<UserRecord>
            {
                new UserRecord {UserName = "TestUser", FeedbackDate=DateTime.Now.AddDays(-200).ToString("yyyyMMdd"), QuestionType="site" }
            };

            var mockRepository = Substitute.For<IRepository>();
            mockRepository.ReadFiles(Arg.Any<string>()).Returns(userRecords);

            var feedbackCalculation = new FeedbackCalculation(string.Empty, mockRepository);
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "site");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsTrue(timeUp.IsTimeUp ?? false);
        }


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

    }
}
