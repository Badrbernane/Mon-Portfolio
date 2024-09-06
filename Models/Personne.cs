using System.Text.Json.Serialization;

namespace MonBackendApp.Models
{
    public class Personne
    {
        public int id { get; set; }
        public required string nom { get; set; }
        public required string prenom { get; set; }
        public int? age { get; set; }
        public required string codepostal { get; set; }
        public required string gmail { get; set; }
        public required string motdepasse { get; set; }
        public required string permis { get; set; }
        public required string description { get; set; }
        public required string titreposte { get; set; }
        public required string photo { get; set; }
        public required string lienfacebook { get; set; }
        public required string lienlinkdin { get; set; }
        public required string lieninstagram { get; set; }
        public required string lientwitter { get; set; }
        public required string cv { get; set; }
        public required string numTelephone { get; set; }
        public int? nombredexperience { get; set; }
        public DateTime datecreation { get; set; }
        public DateTime datemodification { get; set; }
        [JsonIgnore]
        public ICollection<PerssLang>? PerssLang { get; set; }
        [JsonIgnore]
        public ICollection<PerssComp>? PerssComp { get; set; }
        [JsonIgnore]
        public ICollection<PerssCent>? PerssCent { get; set; }
    }
}