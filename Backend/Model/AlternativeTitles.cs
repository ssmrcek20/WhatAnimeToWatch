namespace Backend.Model
{
    public class AlternativeTitles
    {
        public int Id { get; set; }
        public List<string>? Synonyms { get; set; }
        public string? En { get; set; }
        public string? Ja { get; set; }
    }
}
