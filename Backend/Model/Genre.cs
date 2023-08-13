using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public virtual ICollection<Anime>? Animes { get; set; }
    }
}
