using Backend.Model;

namespace Backend.Data.Repositories
{
    public class GenreRepository
    {
        private AnimeContext _context;

        public GenreRepository(AnimeContext context)
        {
            _context=context;
        }

        public async Task<List<Genre>> GenreEditAsync(MyAnimeListApi.Data anime)
        {
            var newGenres = new List<Genre>();
            foreach (var genre in anime.A.Genres)
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

            return newGenres;
        }
    }
}
