using AuFeedback.WebApi.Models;
using CsvHelper;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AuFeedback.WebApi.Controllers
{
    public class Repository : IRepository
    {
        public List<UserRecord> ReadFiles(string filePath)
        {
            if (!File.Exists(filePath))
                return new List<UserRecord>();

            using (var reader = File.OpenText(filePath))
            {
                CsvReader csvFile = new CsvReader(reader);
                csvFile.Configuration.HasHeaderRecord = true;

                var records = csvFile.GetRecords<UserRecord>().ToList();

                return records;
            }

        }

        public void WriteRecord(string filePath, IEnumerable<UserRecord> records)
        {
            using (var sw = new StreamWriter(filePath))
            {
                var writer = new CsvWriter(sw);

                writer.WriteRecords(records);
            }
        }
    }
}