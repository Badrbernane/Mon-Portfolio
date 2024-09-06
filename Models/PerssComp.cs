namespace MonBackendApp.Models
{
    public class PerssComp
    {
        public int idPersonnes { get; set; }
        public Personne? personne { get; set; }
        public int idCompétences { get; set; }
        public Compétence? Compétence { get; set; }
    }
}
