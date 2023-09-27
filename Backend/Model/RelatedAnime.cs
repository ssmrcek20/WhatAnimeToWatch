using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace Backend.Model
{
    public class RelatedAnime
    {
        public int Id { get; set; }
        public Node? Node { get; set; }
        public string? Relation_type { get; set; }
        public string? Relation_type_formatted { get; set; }
    }
}
