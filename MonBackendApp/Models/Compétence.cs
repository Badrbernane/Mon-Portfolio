using System.Text.Json.Serialization;
using MonBackendApp.Models;

public class Compétence
{
    public int id { get; set; }
    public string nom { get; set; }
    public DateTime datecreation { get; set; }
    public DateTime datemodification { get; set; }
    [JsonIgnore]
    public ICollection<PerssComp>? PerssComp { get; set; }
}
