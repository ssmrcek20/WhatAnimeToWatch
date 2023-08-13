using Backend.Model;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Globalization;
using static Backend.ViewModels.AnimeFilters;
using static NuGet.Packaging.PackagingConstants;

namespace Backend.Data.Repositories
{
    public class AnimeRepository
    {
        private readonly AnimeContext _context;

        public AnimeRepository(AnimeContext context)
        {
            _context = context;
        }

        public async Task<bool> AnimeExists(int? animeId)
        {
            return await _context.Anime.AnyAsync(a => a.Id == animeId);
        }

        public async Task AddAnimeAsync(List<Anime> animes)
        {
            _context.Anime.AddRange(animes);
            await _context.SaveChangesAsync();
        }

        public async Task<Anime> GetAnimeAsync(int animeId)
        {
            return await _context.Anime
                .Include(a => a.Main_picture)
                .Include(a => a.Alternative_titles)
                .Include(a => a.Start_season)
                .Include(a => a.Broadcast)
                .FirstOrDefaultAsync(a => a.Id == animeId);
        }

        public async Task DeleteAnimeAsync(Anime anime)
        {
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
        }

        public async Task<ActionResult<List<Anime>>> GetFilteredAnimeAsync(AnimeFilter animeFilter)
        {
            IQueryable<Anime> query = _context.Anime.Include(a => a.Genres).Include(a => a.Studios);

            if (animeFilter.mediaType != null)
            {
                var mediaTypes = checkMediaTypes(animeFilter);

                if (mediaTypes.Any())
                {
                    query = query.Where(a => mediaTypes.Contains(a.Media_type));
                }
            }

            if (animeFilter.numEp.min != null && animeFilter.numEp.max != null)
            {
                query = query.Where(a => a.Num_episodes >= animeFilter.numEp.min && a.Num_episodes <= animeFilter.numEp.max);
            }

            if (animeFilter.epDur.min != null && animeFilter.epDur.max != null)
            {
                query = query.Where(a => a.Average_episode_duration >= animeFilter.epDur.min*60 && a.Average_episode_duration <= animeFilter.epDur.max*60);
            }

            if (animeFilter.genre != null && animeFilter.genre.selectedGenres?.Any() == true)
            {
                var genreIds = animeFilter.genre.selectedGenres.Select(g => g.id);
                query = query.Where(a => a.Genres.Any(g => genreIds.Contains(g.Id)));
            }

            if (animeFilter.status != null)
            {
                List<string> Statuses = checkStatuses(animeFilter);

                if (Statuses.Any())
                {
                    query = query.Where(a => Statuses.Contains(a.Status));
                }
            }

            if (animeFilter.source != null && animeFilter.source.selectedSources?.Any() == true)
            {
                query = query.Where(a => animeFilter.source.selectedSources.Contains(a.Source));
            }

            if (animeFilter.studio != null && animeFilter.studio.selectedStudios?.Any() == true)
            {
                var studioIds = animeFilter.studio.selectedStudios.Select(s => s.id);
                query = query.Where(a => a.Studios.Any(s => studioIds.Contains(s.Id)));
            }

            if (animeFilter.ageR != null)
            {
                List<string> ageRatings = checkRatings(animeFilter);

                if (ageRatings.Any())
                {
                    query = query.Where(a => ageRatings.Contains(a.Rating));
                }
            }

            List<Anime> filteredAnime = await query.ToListAsync();

            if (animeFilter.relDate.startDate != null && animeFilter.relDate.endDate != null)
            {
                filteredAnime = filteredAnime
                    .Where(a =>
                        a.Start_date != null &&
                        DateTime.ParseExact(a.Start_date, "yyyy-MM-dd", CultureInfo.InvariantCulture) >= animeFilter.relDate.startDate &&
                        DateTime.ParseExact(a.Start_date, "yyyy-MM-dd", CultureInfo.InvariantCulture) <= animeFilter.relDate.endDate)
                    .ToList();
            }
            System.Diagnostics.Debug.WriteLine("> > > " + filteredAnime.Count());

            return filteredAnime;
        }

        private static List<string> checkRatings(AnimeFilter animeFilter)
        {
            var ageRatings = new List<string>();

            if (animeFilter.ageR.g?.Any() == true)
            {
                ageRatings.AddRange(animeFilter.ageR.g);
            }
            if (animeFilter.ageR.pg?.Any() == true)
            {
                ageRatings.AddRange(animeFilter.ageR.pg);
            }
            if (animeFilter.ageR.pg13?.Any() == true)
            {
                ageRatings.AddRange(animeFilter.ageR.pg13);
            }
            if (animeFilter.ageR.r?.Any() == true)
            {
                ageRatings.AddRange(animeFilter.ageR.r);
            }
            if (animeFilter.ageR.rPlus?.Any() == true)
            {
                ageRatings.AddRange(animeFilter.ageR.rPlus);
            }
            if (animeFilter.ageR.rx?.Any() == true)
            {
                ageRatings.AddRange(animeFilter.ageR.rx);
            }

            return ageRatings;
        }

        private static List<string> checkStatuses(AnimeFilter animeFilter)
        {
            var Statuses = new List<string>();

            if (animeFilter.status.finished_airing?.Any() == true)
            {
                Statuses.AddRange(animeFilter.status.finished_airing);
            }
            if (animeFilter.status.currently_airing?.Any() == true)
            {
                Statuses.AddRange(animeFilter.status.currently_airing);
            }
            if (animeFilter.status.not_yet_aired?.Any() == true)
            {
                Statuses.AddRange(animeFilter.status.not_yet_aired);
            }

            return Statuses;
        }

        private static List<string> checkMediaTypes(AnimeFilter animeFilter)
        {
            var mediaTypes = new List<string>();

            if (animeFilter.mediaType.tv?.Any() == true)
            {
                mediaTypes.AddRange(animeFilter.mediaType.tv);
            }
            if (animeFilter.mediaType.ova?.Any() == true)
            {
                mediaTypes.AddRange(animeFilter.mediaType.ova);
            }
            if (animeFilter.mediaType.movie?.Any() == true)
            {
                mediaTypes.AddRange(animeFilter.mediaType.movie);
            }
            if (animeFilter.mediaType.special?.Any() == true)
            {
                mediaTypes.AddRange(animeFilter.mediaType.special);
            }
            if (animeFilter.mediaType.ona?.Any() == true)
            {
                mediaTypes.AddRange(animeFilter.mediaType.ona);
            }
            if (animeFilter.mediaType.music?.Any() == true)
            {
                mediaTypes.AddRange(animeFilter.mediaType.music);
            }

            return mediaTypes;
        }
    }
}
