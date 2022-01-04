using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class Context : DbContext
    {
        public DbSet<Autor> Autori { get; set; }
        public DbSet<Bibliotekar> Bibliotekari { get; set; }
        public DbSet<Clan> Clanovi { get; set; }
        public DbSet<ClanskaKarta> ClanskeKarte { get; set; }
        public DbSet<Iznajmljivanje> Iznajmljivanje { get; set; }
        public DbSet<Knjiga> Knjige { get; set; }
        public Context(DbContextOptions options)
        : base(options)
        { }
    }
}