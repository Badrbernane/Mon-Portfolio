using System.Text.Json.Serialization;

namespace MonBackendApp.Models
{
    public class Personne
    {
        public int id { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
        public int? age { get; set; }
        public string codepostal { get; set; }
        public string gmail { get; set; }
        public string motdepasse { get; set; }
        public string permis { get; set; }
        public string description { get; set; }
        public string titreposte { get; set; }
        public string photo { get; set; }
        public string lienfacebook { get; set; }
        public string lienlinkdin { get; set; }
        public string lieninstagram { get; set; }
        public string lientwitter { get; set; }
        public string cv { get; set; }
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