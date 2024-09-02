using System.Text.Json.Serialization;
using MonBackendApp.Models;

public class CentreIntéret
{
    public int id { get; set; }
    public string nom { get; set; }
    public DateTime datecreation { get; set; }
    public DateTime datemodification { get; set; }
    [JsonIgnore]
    public ICollection<PerssCent>? PerssCent { get; set; }
}
