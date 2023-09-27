using static Backend.ViewModels.MyAnimeListApi;
using System.Net.Http;
using System.Text.Json;
using System.Net;
using System.Text.Json.Serialization;
using Backend.ViewModels;
using Backend.Model;

namespace Backend.Services
{
    public class AnimeApiService
    {
        private const string malUrl = "https://api.myanimelist.net/v2/anime/";
        private const string topAnimeUrl = "ranking?ranking_type=all&limit=500&offset=";
        private const string detailsAnimeUrl = "?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
        private const string seasonAnimeUrl = "?sort=anime_num_list_users&limit=50";
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public AnimeApiService(HttpClient httpClient, string apiKey) {
            _httpClient=httpClient;
            _apiKey=apiKey;
            _httpClient.DefaultRequestHeaders.Add("X-MAL-CLIENT-ID", _apiKey);
        }

        public async Task<List<MyAnimeListApi.Data>> FetchAnimeDataAsync(int offset)
        {
            var response = await _httpClient.GetAsync(malUrl+topAnimeUrl+offset);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
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

        public async Task<Anime> FetchAnimeDetailsDataAsync(int id)
        {
            var response = await _httpClient.GetAsync(malUrl+ id + detailsAnimeUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                    IgnoreReadOnlyProperties = true,
                };
                var apiResponse = JsonSerializer.Deserialize<Anime>(responseData, options);

                if (apiResponse != null)
                {
                    return apiResponse;
                }
                throw new Exception("Anime data not found.");
            }

            ThrowError(response);
            return null;
        }

        public async Task<List<MyAnimeListApi.Data>> FetchAnimeDataSeasonAsync()
        {
            DateTime date = DateTime.Now;
            string season;
            if (date.Month >= 1 && date.Month <= 3)
            {
                season = "winter";
            }
            else if (date.Month >= 4 && date.Month <= 6)
            {
                season = "spring";
            }
            else if (date.Month >= 7 && date.Month <= 9)
            {
                season = "summer";
            }
            else
            {
                season = "fall";
            }

            var response = await _httpClient.GetAsync(malUrl + "season/" + date.Year + "/" + season + seasonAnimeUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
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
    }
}
