namespace Backend.Model
{
    public class Recommendations
    {
        public int Id { get; set; }
        public Node? Node { get; set; }
        public int? Num_recommendations { get; set; }
    }
}
