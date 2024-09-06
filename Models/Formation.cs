namespace MonBackendApp.Models
{
    public class Formation
    {
        public int id { get; set; }
        public required string titre { get; set; }
        public DateTime datedebut { get; set; }
        public DateTime datefin { get; set; }
        public required string ecole { get; set; }
        public bool actuel { get; set; }
        public DateTime date_creation { get; set; }
        public DateTime date_modification { get; set; }
        public required string description { get; set; }
        public int idPersonnes { get; set; }
    }
}
