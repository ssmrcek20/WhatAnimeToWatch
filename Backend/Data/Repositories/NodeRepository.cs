using Backend.Model;

namespace Backend.Data.Repositories
{
    public class NodeRepository
    {
        private AnimeContext _context;

        public NodeRepository(AnimeContext context)
        {
            _context=context;
        }

        public async Task<Node> NodeEditRelatedAsync(RelatedAnime anime)
        {
            Node newNode;

            var existingNode = _context.Node.FirstOrDefault(n => n.Id == anime.Node.Id);
            if (existingNode != null)
            {
                newNode = existingNode;
            }
            else
            {
                _context.Node.Add(anime.Node);
                await _context.SaveChangesAsync();
                newNode = anime.Node;
            }

            return newNode;
        }

        public async Task<Node> NodeEditRecAsync(Recommendations anime)
        {
            Node newNode;

            var existingNode = _context.Node.FirstOrDefault(n => n.Id == anime.Node.Id);
            if (existingNode != null)
            {
                newNode = existingNode;
            }
            else
            {
                _context.Node.Add(anime.Node);
                await _context.SaveChangesAsync();
                newNode = anime.Node;
            }

            return newNode;
        }
    }
}
