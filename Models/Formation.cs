namespace MonBackendApp.Models
{
    public class Formation
    {
        public int id { get; set; }
        public string titre { get; set; }
        public DateTime datedebut { get; set; }
        public DateTime datefin { get; set; }
        public string ecole { get; set; }
        public bool actuel { get; set; }
        public DateTime date_creation { get; set; }
        public DateTime date_modification { get; set; }
        public string description { get; set; }
        public int idPersonnes { get; set; }
    }
}
