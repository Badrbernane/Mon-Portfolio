namespace MonBackendApp.Models
{
    public class PerssCent
    {
        public int idPersonnes { get; set; }
        public required Personne personne { get; set; }
        public int idCentreIntérets { get; set; }
        public required CentreIntéret CentreIntéret { get; set; }
    }
}