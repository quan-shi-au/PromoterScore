using AuFeedback.WebApi.Models;

namespace AuFeedback.WebApi.BL
{
    public interface IFeedbackCalculation
    {
        TimeUp GetTimeUp(string userName, string questionType);
        void AddUpdateFeedbackDate(string userName, string questionType);
    }
}
