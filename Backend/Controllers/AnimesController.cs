using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;
using static Backend.Model.MyAnimeListApi;
using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using NuGet.Packaging;
using Humanizer.Localisation;

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
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }
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

        // PUT: api/Animes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnime(int id, Anime anime)
        {
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }
            if (id != anime.Id)
            {
                return BadRequest();
            }

            _context.Entry(anime).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Animes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Anime>>> PostAnime()
        {
            if (!_env.IsDevelopment())
            {
                return Forbid(); // Return 403 Forbidden if not in development mode
            }
            if (_context.Anime == null)
          {
              return Problem("Entity set 'AnimeContext.Anime'  is null.");
          }
            string apiUrl = "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=500&offset=0&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
            _httpClient.DefaultRequestHeaders.Add("X-MAL-CLIENT-ID", _apiKey);
            var response = await _httpClient.GetAsync(apiUrl);
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    IgnoreNullValues = true,
                    IgnoreReadOnlyProperties = true,
                };
                var animes = JsonSerializer.Deserialize<ApiResponse>(responseData, options);
                List<Anime> animeList = new List<Anime>();

                foreach (var anime in animes.data)
                {
                    var existingAnime = _context.Anime.FirstOrDefault(a => a.Id == anime.node.Id);
                    if(existingAnime == null)
                    {
                        var newGenres = new List<Genre>();
                        foreach (var genre in anime.node.Genres)
                        {
                            var existingGenre = _context.Genre.FirstOrDefault(g => g.Id == genre.Id);
                            if (existingGenre != null)
                            {
                               newGenres.Add(existingGenre);
                            }
                            else
                            {
                                _context.Genre.Add(genre);
                                await _context.SaveChangesAsync();
                                newGenres.Add(genre);
                            }
                        }

                        anime.node.Genres.Clear();
                        anime.node.Genres.AddRange(newGenres);

                        var newStudios = new List<Studio>();
                        foreach (var studio in anime.node.Studios)
                        {
                            var existingStudio = _context.Studio.FirstOrDefault(s => s.Id == studio.Id);
                            if (existingStudio != null)
                            {

                                newStudios.Add(existingStudio);
                            }
                            else
                            {
                                _context.Studio.Add(studio);
                                await _context.SaveChangesAsync();
                                newStudios.Add(studio);
                            }
                        }

                        anime.node.Studios.Clear();
                        anime.node.Studios.AddRange(newStudios);

                        anime.node.Created_at = anime.node.Created_at?.ToUniversalTime();
                        anime.node.Updated_at = anime.node.Updated_at?.ToUniversalTime();

                        animeList.Add(anime.node);
                    }
                }

                _context.Anime.AddRange(animeList);
                await _context.SaveChangesAsync();
                return Ok(animeList);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
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
            var anime = await _context.Anime.Include(a => a.Main_picture)
                                            .Include(a => a.Alternative_titles)
                                            .Include(a => a.Start_season)
                                            .Include(a => a.Broadcast)
                                            .FirstOrDefaultAsync(a => a.Id == id);
            if (anime == null)
            {
                return NotFound();
            }
            if (anime.Main_picture != null)
            {
                _context.Remove(anime.Main_picture);
            }

            if (anime.Alternative_titles != null)
            {
                _context.Remove(anime.Alternative_titles);
            }

            if (anime.Start_season != null)
            {
                _context.Remove(anime.Start_season);
            }

            if (anime.Broadcast != null)
            {
                _context.Remove(anime.Broadcast);
            }

            _context.Anime.Remove(anime);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnimeExists(int id)
        {
            return (_context.Anime?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
