namespace MonBackendApp.Models
{
    public class PerssCent
    {
        public int idPersonnes { get; set; }
        public Personne personne { get; set; } = null!;
        public int idCentreIntérets { get; set; }
        public CentreIntéret CentreIntéret { get; set; } = null!;
    }
}