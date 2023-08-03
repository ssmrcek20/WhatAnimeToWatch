namespace Backend.Model
{
    public class Genre
    {
        public Genre()
        {
            Animes = new HashSet<Anime>();
        }
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<Anime>? Animes { get; set; }
    }
}
