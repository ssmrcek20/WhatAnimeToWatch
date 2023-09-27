using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;
using static Backend.ViewModels.MyAnimeListApi;
using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using NuGet.Packaging;
using Humanizer.Localisation;
using Backend.Services;
using Backend.Data.Repositories;
using Microsoft.AspNetCore.Mvc.Formatters;
using Backend.ViewModels;
using System.Text.Json.Serialization;
using static Backend.ViewModels.AnimeFilters;
using System.Globalization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimesController : ControllerBase
    {
        private readonly AnimeContext _context;
        private readonly string _apiKey;
        private readonly IWebHostEnvironment _env;

        public AnimesController(AnimeContext context, string apiKey, IWebHostEnvironment env)
        {
            _context = context;
            _apiKey=apiKey;
            _env=env;
        }

        // GET: api/Animes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anime>>> GetAnime()
        {
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }

            if (_context.Anime == null)
            {
                return NotFound();
            }

            return await _context.Anime.ToListAsync();
        }

        // GET: api/Animes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Anime>> GetAnime(int id)
        {
            if (_context.Anime == null)
            {
                return NotFound();
            }
            var anime = await _context.Anime.FindAsync(id);

            if (anime == null)
            {
                return NotFound();
            }

            return anime;
        }

        // GET: api/Animes/test
        [HttpGet("test")]
        public IActionResult WakeUpServer()
        {
            return Content("Server is awake!", "text/plain");
        }

        // GET: api/Animes/MediaType/tv
        [HttpGet("MediaType/{name}")]
        [ServiceFilter(typeof(ApiKeyAuthFilter))]
        public async Task<ActionResult<List<Anime>>> GetAnimeMediaType(string name)
        {
            if (_context.Anime == null)
            {
                return NotFound();
            }
            List<Anime> animeList = await _context.Anime
                .Where(anime => string.Equals(anime.Media_type, name))
                .ToListAsync();

            if (animeList == null || animeList.Count == 0)
            {
                return NotFound();
            }

            return animeList;
        }

        // POST: api/Animes/Filter/page
        [HttpPost("Filter/{page}")]
        public async Task<ActionResult<FilteredAnime>> GetFilteredAnime(int page, [FromBody] AnimeFilter animeFilter)
        {
            if (_context.Anime == null)
            {
                return NotFound();
            }

            var animeRepo = new AnimeRepository(_context);
            var data = await animeRepo.GetFilteredAnimeAsync(animeFilter, page);

            if (data.Value.animes == null || data.Value.animes.Count == 0)
            {
                return NoContent();
            }

            return data;
        }

        // POST: api/Animes
        [HttpPost]
        [ServiceFilter(typeof(ApiKeyAuthFilter))]
        public async Task<ActionResult<int>> PostAnime()
        {
            if (_context.Anime == null)
            {
                return Problem("Entity set 'AnimeContext.Anime'  is null.");
            }

            int counter = 0;
            for (int i = 0; i < 5000; i+=500)
            {
                List<Anime> animeList = new List<Anime>();
                List<MyAnimeListApi.Data> animes;
                try
                {
                    var httpClient = new HttpClient();
                    var service = new AnimeApiService(httpClient, _apiKey);
                    animes = await service.FetchAnimeDataAsync(i);
                }
                catch (Exception e)
                {
                    return Problem(e.Message + " first");
                }

                var animeRepo = new AnimeRepository(_context);
                foreach (var anime in animes)
                {
                    if (!await animeRepo.AnimeExists(anime.A.Id))
                    {
                        Anime animeDetails;
                        try
                        {
                            var httpClient = new HttpClient();
                            var service = new AnimeApiService(httpClient, _apiKey);
                            await Task.Delay(TimeSpan.FromMilliseconds(500));
                            animeDetails = await service.FetchAnimeDetailsDataAsync(anime.A.Id);
                        }
                        catch (Exception e)
                        {
                            return Problem(e.Message + " - " + e.Data);
                        }

                        var genreRepo = new GenreRepository(_context);
                        var newGenres = await genreRepo.GenreEditAsync(animeDetails);
                        animeDetails.Genres.Clear();
                        animeDetails.Genres.AddRange(newGenres);

                        var studioRepo = new StudioRepository(_context);
                        var newStudios = await studioRepo.StudioEditAsync(animeDetails);
                        animeDetails.Studios.Clear();
                        animeDetails.Studios.AddRange(newStudios);

                        animeDetails.Created_at = animeDetails.Created_at?.ToUniversalTime();
                        animeDetails.Updated_at = animeDetails.Updated_at?.ToUniversalTime();

                        animeDetails.Start = ConvertStartDate(animeDetails);

                        animeDetails.End = ConvertEndDate(animeDetails);

                        var nodeRepo = new NodeRepository(_context);
                        foreach (var relatedAnime in animeDetails.Related_anime)
                        {
                            var newNode = await nodeRepo.NodeEditRelatedAsync(relatedAnime);
                            relatedAnime.Node = newNode;
                        }

                        foreach (var recAnime in animeDetails.Recommendations)
                        {
                            var newNode = await nodeRepo.NodeEditRecAsync(recAnime);
                            recAnime.Node = newNode;
                        }

                        animeList.Add(animeDetails);
                    }
                }

                await animeRepo.AddAnimeAsync(animeList);
                counter += animeList.Count;
            }

            return Ok(counter);
        }

        private static DateTime? ConvertStartDate(Anime anime)
        {
            if (!string.IsNullOrEmpty(anime.Start_date))
            {
                if (DateTime.TryParseExact(anime.Start_date, "yyyy", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime yearDate))
                {
                    return DateTime.SpecifyKind(yearDate, DateTimeKind.Utc);
                }
                else if (DateTime.TryParseExact(anime.Start_date, "yyyy-MM", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime mouthDate))
                {
                    return DateTime.SpecifyKind(mouthDate, DateTimeKind.Utc);
                }
                else if (DateTime.TryParseExact(anime.Start_date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime fullDate))
                {
                    return DateTime.SpecifyKind(fullDate, DateTimeKind.Utc);
                }
            }
            return null;
        }

        private static DateTime? ConvertEndDate(Anime anime)
        {
            if (!string.IsNullOrEmpty(anime.End_date))
            {
                if (DateTime.TryParseExact(anime.End_date, "yyyy", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime yearDate))
                {
                    return DateTime.SpecifyKind(yearDate, DateTimeKind.Utc);
                }
                else if (DateTime.TryParseExact(anime.End_date, "yyyy-MM", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime mouthDate))
                {
                    return DateTime.SpecifyKind(mouthDate, DateTimeKind.Utc);
                }
                else if (DateTime.TryParseExact(anime.End_date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime fullDate))
                {
                    return DateTime.SpecifyKind(fullDate, DateTimeKind.Utc);
                }
            }
            return null;
        }

        // PUT: api/Animes
        [HttpPut]
        [ServiceFilter(typeof(ApiKeyAuthFilter))]
        public async Task<ActionResult<int>> PutAnime()
        {
            if (_context.Anime == null)
            {
                return Problem("Entity set 'AnimeContext.Anime'  is null.");
            }

            List<Anime> newAnimeList = new List<Anime>();
            List<Anime> oldAnimeList = new List<Anime>();
            List<MyAnimeListApi.Data> animes;
            try
            {
                var httpClient = new HttpClient();
                var service = new AnimeApiService(httpClient, _apiKey);
                animes = await service.FetchAnimeDataSeasonAsync();
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }

            var animeRepo = new AnimeRepository(_context);
            foreach (var anime in animes)
            {
                Anime animeDetails;
                try
                {
                    var httpClient = new HttpClient();
                    var service = new AnimeApiService(httpClient, _apiKey);
                    animeDetails = await service.FetchAnimeDetailsDataAsync(anime.A.Id);
                }
                catch (Exception e)
                {
                    return Problem(e.Message);
                }

                var genreRepo = new GenreRepository(_context);
                var newGenres = await genreRepo.GenreEditAsync(animeDetails);
                animeDetails.Genres.Clear();
                animeDetails.Genres.AddRange(newGenres);

                var studioRepo = new StudioRepository(_context);
                var newStudios = await studioRepo.StudioEditAsync(animeDetails);
                animeDetails.Studios.Clear();
                animeDetails.Studios.AddRange(newStudios);

                animeDetails.Created_at = animeDetails.Created_at?.ToUniversalTime();
                animeDetails.Updated_at = animeDetails.Updated_at?.ToUniversalTime();

                animeDetails.Start = ConvertStartDate(animeDetails);

                animeDetails.End = ConvertEndDate(animeDetails);

                var nodeRepo = new NodeRepository(_context);
                foreach (var relatedAnime in animeDetails.Related_anime)
                {
                    var newNode = await nodeRepo.NodeEditRelatedAsync(relatedAnime);
                    relatedAnime.Node = newNode;
                }

                foreach (var recAnime in animeDetails.Recommendations)
                {
                    var newNode = await nodeRepo.NodeEditRecAsync(recAnime);
                    recAnime.Node = newNode;
                }

                if (!await animeRepo.AnimeExists(anime.A.Id))
                {
                    newAnimeList.Add(animeDetails);
                } else
                {
                    oldAnimeList.Add(animeDetails);
                }

            }

            await animeRepo.AddAnimeAsync(newAnimeList);
            await animeRepo.UpdateAnimeAsync(oldAnimeList);

            return Ok("New Anime: "+newAnimeList.Count + "\nUpdated Anime: "+oldAnimeList.Count);
        }

        // DELETE: api/Animes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnime(int id)
        {
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }

            if (_context.Anime == null)
            {
                return NotFound();
            }

            var animeRepo = new AnimeRepository(_context);
            var anime = await animeRepo.GetAnimeAsync(id);

            if (anime == null)
            {
                return NotFound();
            }

            await animeRepo.DeleteAnimeAsync(anime);

            return NoContent();
        }
    }
}
