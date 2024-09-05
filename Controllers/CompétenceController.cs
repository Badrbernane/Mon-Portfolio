using Microsoft.AspNetCore.Mvc;
using MonBackendApp.Data;
using MonBackendApp.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MonBackendApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompétencesController : ControllerBase
    {
        private readonly badrDbContext _context;

        public CompétencesController(badrDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Compétence>> GetCompétences()
        {
            return _context.Compétences.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Compétence> GetCompétence(int id)
        {
            var Compétence = _context.Compétences.Find(id);

            if (Compétence == null)
            {
                return NotFound();
            }

            return Compétence;
        }

        [HttpPost]
        public ActionResult<Compétence> PostCompétence(Compétence compétence)
        {
            _context.Compétences.Add(compétence);
            _context.SaveChanges();

            return CreatedAtAction("GetCompétence", new { id = compétence.id }, compétence);
        }

        [HttpPut("{id}")]
        public IActionResult PutCompétence(int id, Compétence compétence)
        {
            if (id != compétence.id)
            {
                return BadRequest();
            }

            _context.Entry(compétence).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCompétence(int id)
        {
            var compétence = _context.Compétences.Find(id);
            if (compétence == null)
            {
                return NotFound();
            }

            _context.Compétences.Remove(compétence);
            _context.SaveChanges();

            return NoContent();
        }
        // alors mn hna lt7t on parle de by personne ----------------------------------------------------------
        // POST: api/competence/personne/5
        [HttpPost("personne/{personneId}")]
public ActionResult PostCompétencesByPersonne(int personneId, [FromBody] int[] competenceIds)
{
    foreach (var competenceId in competenceIds)
    {
        var perssComp = new PerssComp
        {
            idPersonnes = personneId,
            idCompétences = competenceId
        };

        _context.PerssComps.Add(perssComp);
    }

    _context.SaveChanges();

    return Ok("Compétences ajoutées avec succès");
}
        // GET: api/languess/personne/5
        [HttpGet("personne/{idPersonnes}")]
        public ActionResult<IEnumerable<PerssComp>> GetCompétencesByPersonne(int idPersonnes)
        {
            var result = _context.PerssComps
                .Include(pl => pl.Compétence)
                .Where(pl => pl.idPersonnes == idPersonnes)
                .Select(pl => new 
        {
            PersonneNom = pl.personne.nom,
            CompetenceNom = pl.Compétence.nom,
            IdCompetence = pl.idCompétences,
            date_creation = pl.Compétence.datecreation        // ID de la compétence
        })
        .ToList();

    if (result == null || result.Count == 0)
    {
        return Ok("wlh ma kayna chi haja w tahiya l raja");
    }

    return Ok(result);
        }

        // PUT: api/languess/personne/5
        [HttpPut("personne/{idPersonnes}")]
        public IActionResult PutLangueByPersonne(int idPersonnes, int idCompétences)
        {
            var perssComp = _context.PerssComps
                .FirstOrDefault(pl => pl.idPersonnes == idPersonnes && pl.idCompétences == idCompétences);

            if (perssComp == null)
            {
                return NotFound();
            }

            _context.Entry(perssComp).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/languess/personne/5
        [HttpDelete("personne/{idPersonnes}/{idCompétences}")]
        public IActionResult DeleteLangueByPersonne(int idPersonnes, int idCompétences)
        {
            var perssComp = _context.PerssComps
                .FirstOrDefault(pl => pl.idPersonnes == idPersonnes && pl.idCompétences == idCompétences);

            if (perssComp == null)
            {
                return NotFound();
            }

            _context.PerssComps.Remove(perssComp);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
