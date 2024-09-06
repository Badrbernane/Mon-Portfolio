namespace MonBackendApp.Models
{
    public class RegisterRequest
    {
        public required string gmail { get; set; }
        public required string motdepasse { get; set; }
        public required string nom { get; set; }
        public required string prenom { get; set; }
        public required string numTelephone { get; set; }
        public required string motdepasseconfirmation { get; set; }
    }
}
