namespace Backend.Model
{
    public class Studio
    {
        public Studio()
        {
            Animes = new HashSet<Anime>();
        }
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<Anime>? Animes { get; set; }
    }
}
