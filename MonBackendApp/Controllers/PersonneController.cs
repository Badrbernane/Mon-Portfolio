// Controllers/PersonneController.cs
using Microsoft.AspNetCore.Mvc;
using MonBackendApp.Data;
using MonBackendApp.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace MonBackendApp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PersonneController : ControllerBase
    {
        private readonly badrDbContext _context;

        public PersonneController(badrDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public ActionResult<Personne> Login([FromBody] LoginRequest loginRequest)
        {
         // Rechercher la personne dans la base de données
            var personne = _context.Personnes
            .FirstOrDefault(p => p.gmail == loginRequest.gmail && p.motdepasse == loginRequest.motdepasse);

            if (personne == null)
                {
                    return Ok(new { message = "Gmail ou mot de passe incorrect.", result = false });
                }
        // Assurez-vous que les valeurs ne sont pas nulles avant de les utiliser
            if (string.IsNullOrEmpty(personne.gmail) || string.IsNullOrEmpty(personne.motdepasse))
                {
                    return StatusCode(500, new { message = "Une erreur s'est produite lors de la récupération des données.", result = false });
                }
            return Ok(new { message = "Connexion réussie.", result = true, personneId = personne.id });
        }

        //hada howa enrgis----------------------------------------------------------------------------------------------------------------------------------------
        // Ajout d'un endpoint pour l'enregistrement
        [HttpPost("register")]
        public ActionResult Register([FromBody] RegisterRequest registerRequest)
        {
            if (registerRequest.motdepasse != registerRequest.motdepasseconfirmation)
            {
                return BadRequest(new { message = "Les mots de passe ne correspondent pas.", result = false });
            }

            var existingPersonne = _context.Personnes.FirstOrDefault(p => p.gmail == registerRequest.gmail);
            if (existingPersonne != null)
            {
                return Conflict(new { message = "Un compte avec cet email existe déjà.", result = false });
            }

            var newPersonne = new Personne
            {
                nom = registerRequest.nom,
                prenom = registerRequest.prenom,
                gmail = registerRequest.gmail,
                numTelephone = registerRequest.numTelephone,
                motdepasse = registerRequest.motdepasse,
                age  = 0,
                photo = "string",
                codepostal = "string",
                permis = "string",
                description = "string",
                titreposte = "string",
                lienfacebook = "string",
                lienlinkdin = "string",
                lieninstagram = "string",
                lientwitter = "string",
                cv = "string",
                nombredexperience = 0,
            };

            _context.Personnes.Add(newPersonne);
            _context.SaveChanges();

            return Ok(new { message = "Compte créé avec succès.", result = true });
        }

        // -----------------------------------------------------------------------------------------------------------------------
        
        

        [HttpGet("{id}")]
        public ActionResult<Personne> GetPersonne(int id)
        {
            var personne = _context.Personnes.Find(id);

            if (personne == null)
            {
                return NotFound();
            }

            return personne;
        }

        [HttpPost]
        public ActionResult<Personne> PostPersonne(Personne personne)
        {
            _context.Personnes.Add(personne);
            _context.SaveChanges();

            return CreatedAtAction("GetPersonne", new { id = personne.id }, personne);
        }

        [HttpPut("{id}")]
        public IActionResult PutPersonne(int id, Personne personne)
        {
    // Vérifier si l'ID dans l'URL correspond à l'ID de l'objet personne
            if (id != personne.id)
            {
                return BadRequest("L'ID dans l'URL ne correspond pas à l'ID de l'objet.");
            }

    // Vérifier si l'objet personne existe dans la base de données
            var existingPersonne = _context.Personnes.Find(id);
            if (existingPersonne == null)
            {
                return NotFound("La personne avec l'ID spécifié n'a pas été trouvée.");
            }

    // Mettre à jour les propriétés de l'objet existant avec les nouvelles valeurs
            _context.Entry(existingPersonne).CurrentValues.SetValues(personne);

    // Sauvegarder les changements
            try
            {
            _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur lors de la mise à jour de la personne.");
            }

            return NoContent();
}

        [HttpDelete("{id}")]
        public IActionResult DeletePersonne(int id)
        {
            var personne = _context.Personnes.Find(id);
            if (personne == null)
            {
                return NotFound();
            }

            _context.Personnes.Remove(personne);
            _context.SaveChanges();

            return NoContent();
        }
    

    [HttpPut("change-password")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            // Trouver la personne par ID
            var personne = _context.Personnes.Find(changePasswordRequest.Id);
            if (personne == null)
            {
                return NotFound(new { message = "Personne non trouvée.", result = false });
            }

            // Vérifier l'ancien mot de passe
            if (personne.motdepasse != changePasswordRequest.OldPassword)
            {
                return BadRequest(new { message = "Ancien mot de passe incorrect.", result = false });
            }

            // Vérifier si les nouveaux mots de passe correspondent
            if (changePasswordRequest.NewPassword != changePasswordRequest.ConfirmNewPassword)
            {
                return BadRequest(new { message = "Les nouveaux mots de passe ne correspondent pas.", result = false });
            }

            // Mettre à jour le mot de passe
            personne.motdepasse = changePasswordRequest.NewPassword;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erreur lors de la mise à jour du mot de passe.");
            }

            return Ok(new { message = "Mot de passe changé avec succès.", result = true });
        }
    }
}


