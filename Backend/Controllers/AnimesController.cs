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
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly IWebHostEnvironment _env;

        public AnimesController(AnimeContext context, HttpClient httpClient, string apiKey, IWebHostEnvironment env)
        {
            _context = context;
            _httpClient=httpClient;
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
        public async Task<ActionResult<List<Anime>>> GetAnimeMediaType(string name)
        {
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }
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
        public async Task<ActionResult<int>> PostAnime()
        {
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }

            if (_context.Anime == null)
            {
                return Problem("Entity set 'AnimeContext.Anime'  is null.");
            }

            List<Anime> animeList = new List<Anime>();
            List<MyAnimeListApi.Data> animes;
            try
            {
                var service = new AnimeApiService(_httpClient, _apiKey);
                animes = await service.FetchAnimeDataAsync();
            }
            catch(Exception e)
            {
                return Problem(e.Message);
            }

            var animeRepo = new AnimeRepository(_context);
            foreach (var anime in animes)
            {
                if (!await animeRepo.AnimeExists(anime.A.Id))
                {
                    var genreRepo = new GenreRepository(_context);
                    var newGenres = await genreRepo.GenreEditAsync(anime);
                    anime.A.Genres.Clear();
                    anime.A.Genres.AddRange(newGenres);

                    var studioRepo = new StudioRepository(_context);
                    var newStudios = await studioRepo.StudioEditAsync(anime);
                    anime.A.Studios.Clear();
                    anime.A.Studios.AddRange(newStudios);

                    anime.A.Created_at = anime.A.Created_at?.ToUniversalTime();
                    anime.A.Updated_at = anime.A.Updated_at?.ToUniversalTime();

                    anime.A.Start = ConvertStartDate(anime);

                    anime.A.End = ConvertEndDate(anime);

                    animeList.Add(anime.A);
                }
            }

            await animeRepo.AddAnimeAsync(animeList);
            return Ok(animeList.Count);
        }

        private static DateTime ConvertStartDate(MyAnimeListApi.Data anime)
        {
            if (!string.IsNullOrEmpty(anime.A.Start_date))
            {
                if (DateTime.TryParseExact(anime.A.Start_date, "yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime yearDate))
                {
                    return yearDate.ToUniversalTime();
                }
                else if (DateTime.TryParseExact(anime.A.Start_date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fullDate))
                {
                    return fullDate.ToUniversalTime();
                }
                else
                {
                    return new DateTime(1960, 1, 1).ToUniversalTime();
                }
            }
            else
            {
                return new DateTime(1960, 1, 1).ToUniversalTime();
            }
        }

        private static DateTime ConvertEndDate(MyAnimeListApi.Data anime)
        {
            if (!string.IsNullOrEmpty(anime.A.End_date))
            {
                if (DateTime.TryParseExact(anime.A.End_date, "yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime yearDate))
                {
                    return yearDate.ToUniversalTime();
                }
                else if (DateTime.TryParseExact(anime.A.End_date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fullDate))
                {
                    return fullDate.ToUniversalTime();
                }
                else
                {
                    return new DateTime(1960, 1, 1).ToUniversalTime();
                }
            }
            else
            {
                return new DateTime(1960, 1, 1).ToUniversalTime();
            }
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
