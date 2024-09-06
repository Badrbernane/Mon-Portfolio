public class Projet
{
    public int id { get; set; }
    public required string titre { get; set; }
    public DateTime dateprojet { get; set; }
    public required string client { get; set; }
    public required string photo { get; set; }
    public required string lien { get; set; }
    public required string Remarque { get; set; }
    public DateTime datecreation { get; set; }
    public DateTime datemodification { get; set; }
    public int idPersonnes { get; set; }
}
