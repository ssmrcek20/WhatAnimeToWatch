using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AnimeContext : DbContext
    {
        public AnimeContext (DbContextOptions<AnimeContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Model.Anime> Anime { get; set; } = default!;

        public DbSet<Backend.Model.Genre> Genre { get; set; } = default!;

        public DbSet<Backend.Model.Studio> Studio { get; set; } = default!;

        public DbSet<Backend.Model.Node> Node { get; set; } = default!;
    }
}
