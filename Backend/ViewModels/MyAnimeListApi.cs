using System.Text.Json.Serialization;
using Backend.Model;

namespace Backend.ViewModels
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
