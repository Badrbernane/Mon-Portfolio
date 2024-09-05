namespace MonBackendApp.Models
{
    public class PerssLang
    {
        public int idPersonnes { get; set; }
        public Personne personne { get; set; }
        public int idLangues { get; set; }
        public Langue langue { get; set; }
        public string niveau { get; set; }
    }
}
