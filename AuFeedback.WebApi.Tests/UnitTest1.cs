using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AuFeedback.WebApi.BL;

namespace AuFeedback.WebApi.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var filePath = "test.csv";
            var feedbackCalculation = new FeedbackCalculation(filePath);

            feedbackCalculation.AddUpdateFeedbackDate("TestUser", "site");
            var timeUp = feedbackCalculation.GetTimeUp("TestUser", "site");

            Assert.IsTrue(timeUp.IsRecordExisting);
            Assert.IsFalse(timeUp.IsTimeUp ?? true);

        }
    }
}
