namespace MonBackendApp.Models
{
    public class PerssLang
    {
        public int idPersonnes { get; set; }
        public required Personne personne { get; set; }
        public int idLangues { get; set; }
        public required Langue langue { get; set; }
        public required string niveau { get; set; }
    }
}
