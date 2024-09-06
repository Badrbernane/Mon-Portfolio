namespace MonBackendApp.Models
{
    public class PerssLang
    {
        public int idPersonnes { get; set; }
        public Personne personne { get; set; } = null!;
        public int idLangues { get; set; }
        public Langue langue { get; set; } = null!;
        public required string niveau { get; set; }
    }
}
