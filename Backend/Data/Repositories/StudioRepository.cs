using Backend.Model;

namespace Backend.Data.Repositories
{
    public class StudioRepository
    {
        private readonly AnimeContext _context;

        public StudioRepository(AnimeContext context)
        {
            _context=context;
        }

        public async Task<List<Studio>> StudioEditAsync(MyAnimeListApi.Data anime)
        {
            var newStudio = new List<Studio>();
            foreach (var studio in anime.A.Studios)
            {
                var existingStudio = _context.Studio.FirstOrDefault(g => g.Id == studio.Id);
                if (existingStudio != null)
                {
                    newStudio.Add(existingStudio);
                }
                else
                {
                    _context.Studio.Add(studio);
                    await _context.SaveChangesAsync();
                    newStudio.Add(studio);
                }
            }

            return newStudio;
        }
    }
}
