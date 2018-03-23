using AuFeedback.WebApi.Models;
using System.Collections.Generic;

namespace AuFeedback.WebApi.BackendData
{
    public interface IRepository
    {
        List<UserRecord> ReadFiles(string filePath);
        void WriteRecord(string filePath, IEnumerable<UserRecord> records);
    }
}
