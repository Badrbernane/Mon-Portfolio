using System.Text.Json.Serialization;
using MonBackendApp.Models;

public class Langue
{
    public int id { get; set; }
    public string nom { get; set; }
    public DateTime date_creation { get; set; }
    public DateTime date_modification { get; set; }
    [JsonIgnore]
    public ICollection<PerssLang>? PerssLang { get; set; }
}
