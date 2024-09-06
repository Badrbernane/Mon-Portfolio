public class Certificat
{
    public int id { get; set; }
    public required string nom { get; set; }
    public required string source { get; set; }
    public required string image { get; set; }
    public DateTime datecreation { get; set; }
    public DateTime datemodification { get; set; }
    public int idPersonnes { get; set; }
}
