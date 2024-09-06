namespace MonBackendApp.Models
{
    public class PerssComp
    {
        public int idPersonnes { get; set; }
        public required Personne personne { get; set; }
        public int idCompétences { get; set; }
        public required Compétence Compétence { get; set; }
    }
}
