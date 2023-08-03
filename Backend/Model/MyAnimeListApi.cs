using System.Text.Json.Serialization;

namespace Backend.Model
{
    public class MyAnimeListApi
    {
        public class Data
        {
            [JsonPropertyName("node")]
            public Anime? A { get; set; }
        }
        public class Paging
        {
            public string? next { get; set; }
        }
        public class ApiResponse
        {
            public List<Data>? data { get; set; }
            public Paging? paging { get; set; }
        }
    }
}
