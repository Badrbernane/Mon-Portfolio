namespace MonBackendApp.Models
{
    public class Experience
    {
        public int id { get; set; }
        public string entreprise { get; set; }
        public DateTime datedebut { get; set; }
        public DateTime datefin { get; set; }
        public string remarque { get; set; }
        public DateTime datecreation { get; set; }
        public DateTime datemodification { get; set; }
        public int idPersonnes { get; set; }
    }
}