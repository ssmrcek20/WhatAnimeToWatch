using Backend.Model;

namespace Backend.ViewModels
{
    public class FilteredAnime
    {
        public List<Anime> animes { get; set; }
        public int totalPages { get; set; }
    }
}
