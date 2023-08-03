using static Backend.Model.MyAnimeListApi;
using System.Net.Http;
using System.Text.Json;
using Backend.Model;
using System.Net;

namespace Backend.Services
{
    public class AnimeApiService
    {
        private const string topAnimeUrl = "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=1&offset=499&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public AnimeApiService(HttpClient httpClient, string apiKey) {
            _httpClient=httpClient;
            _apiKey=apiKey;
        }

        public async Task<List<MyAnimeListApi.Data>> FetchAnimeDataAsync()
        {
            _httpClient.DefaultRequestHeaders.Add("X-MAL-CLIENT-ID", _apiKey);
            var response = await _httpClient.GetAsync(topAnimeUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    IgnoreNullValues = true,
                    IgnoreReadOnlyProperties = true,
                };
                var apiResponse = JsonSerializer.Deserialize<ApiResponse>(responseData, options);

                if (apiResponse != null && apiResponse.data != null)
                {
                    return apiResponse.data;
                }
                throw new Exception("Anime data not found.");
            }

            ThrowError(response);
            return null;
        }

        private static void ThrowError(HttpResponseMessage response)
        {
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("Anime data not found.");
            }
            else if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                throw new Exception("Unauthorized to access anime data.");
            }
            else
            {
                throw new Exception($"An error occurred while fetching anime data: {response.StatusCode}");
            }
        }
    }
}
