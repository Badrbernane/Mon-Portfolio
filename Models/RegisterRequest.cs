namespace MonBackendApp.Models
{
    public class RegisterRequest
    {
        public string gmail { get; set; }
        public string motdepasse { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
        public string numTelephone { get; set; }
        public string motdepasseconfirmation { get; set; }
    }
}
