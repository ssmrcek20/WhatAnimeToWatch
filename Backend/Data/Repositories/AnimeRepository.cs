using Backend.Model;
using Microsoft.EntityFrameworkCore;

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
    }
}
