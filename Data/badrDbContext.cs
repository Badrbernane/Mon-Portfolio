using Microsoft.EntityFrameworkCore;
using MonBackendApp.Models;

namespace MonBackendApp.Data
{
    public class badrDbContext : DbContext
    {
        public badrDbContext(DbContextOptions<badrDbContext> options)
            : base(options)
        {
        }

        public DbSet<Personne> Personnes { get; set; }
        public DbSet<Projet> Projets { get; set; }
        public DbSet<Certificat> Certificats { get; set; }
        public DbSet<Formation> Formations { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Langue> Langues { get; set; }
        public DbSet<Compétence> Compétences { get; set; }
        public DbSet<CentreIntéret> CentreIntérets { get; set; }
        public DbSet<PerssLang> PerssLangs { get; set; }
        public DbSet<PerssComp> PerssComps { get; set; }
        public DbSet<PerssCent> PerssCents { get; set; }
        public DbSet<LoginRequest> LoginRequests { get; set; }
        public DbSet<RegisterRequest> registerRequests { get; set; }
        public DbSet<ChangePasswordRequest> ChangePasswordRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuration pour PerssLang----------------------------------------------------------------------
            modelBuilder.Entity<PerssLang>()
                .HasKey(pl => new { pl.idPersonnes, pl.idLangues });

            modelBuilder.Entity<PerssLang>()
                .HasOne(pl => pl.personne)
                .WithMany(p => p.PerssLang)
                .HasForeignKey(pl => pl.idPersonnes);

            modelBuilder.Entity<PerssLang>()
                .HasOne(pl => pl.langue)
                .WithMany(l => l.PerssLang)
                .HasForeignKey(pl => pl.idLangues);
            
            // Configuration pour PerssComp------------------------------------------------------------------
            modelBuilder.Entity<PerssComp>()
                .HasKey(pc => new { pc.idPersonnes, pc.idCompétences });

            modelBuilder.Entity<PerssComp>()
                .HasOne(pc => pc.personne)
                .WithMany(p => p.PerssComp)
                .HasForeignKey(pc => pc.idPersonnes);

            modelBuilder.Entity<PerssComp>()
                .HasOne(pc => pc.Compétence)
                .WithMany(c => c.PerssComp)
                .HasForeignKey(pc => pc.idCompétences);

                
            // Configuration pour PerssCent----------------------------------------------------------------------
            modelBuilder.Entity<PerssCent>()
                .HasKey(pl => new { pl.idPersonnes, pl.idCentreIntérets });

            modelBuilder.Entity<PerssCent>()
                .HasOne(pl => pl.personne)
                .WithMany(p => p.PerssCent)
                .HasForeignKey(pl => pl.idPersonnes);

            modelBuilder.Entity<PerssCent>()
                .HasOne(pl => pl.CentreIntéret)
                .WithMany(l => l.PerssCent)
                .HasForeignKey(pl => pl.idCentreIntérets);

            modelBuilder.Entity<LoginRequest>()
            .HasNoKey();

            modelBuilder.Entity<RegisterRequest>()
            .HasNoKey();

            modelBuilder.Entity<ChangePasswordRequest>()
            .HasNoKey();
        }
    }
}
