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
    public class CentreIntéretsController : ControllerBase
    {
        private readonly badrDbContext _context;

        public CentreIntéretsController(badrDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CentreIntéret>> GetCentreIntérets()
        {
            return _context.CentreIntérets.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<CentreIntéret> GetCentreIntéret(int id)
        {
            var CentreIntéret = _context.CentreIntérets.Find(id);

            if (CentreIntéret == null)
            {
                return NotFound();
            }

            return CentreIntéret;
        }

        [HttpPost]
        public ActionResult<CentreIntéret> PostCentreIntéret(CentreIntéret centreIntéret)
        {
            _context.CentreIntérets.Add(centreIntéret);
            _context.SaveChanges();

            return CreatedAtAction("GetCentreIntéret", new { id = centreIntéret.id }, centreIntéret);
        }

        [HttpPut("{id}")]
        public IActionResult PutCentreIntéret(int id, CentreIntéret centreIntéret)
        {
            if (id != centreIntéret.id)
            {
                return BadRequest();
            }

            _context.Entry(centreIntéret).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCentreIntéret(int id)
        {
            var centreIntéret = _context.CentreIntérets.Find(id);
            if (centreIntéret == null)
            {
                return NotFound();
            }

            _context.CentreIntérets.Remove(centreIntéret);
            _context.SaveChanges();

            return NoContent();
        }
        // alors mn hna lt7t on parle de by personne ----------------------------------------------------------
        // POST: api/centreinteret/personne/5
        [HttpPost("personne/{personneId}")]
        public ActionResult<PerssCent> PostCentreIntéretByPersonne(int personneId, [FromBody] int[] centreIntéretIds)
        {
            foreach (var centreIntéretId in centreIntéretIds)
            {
                var perssCent = new PerssCent
            {
                idPersonnes = personneId,
                idCentreIntérets = centreIntéretId
            };
            _context.PerssCents.Add(perssCent);

            }
            _context.SaveChanges();

            return Ok("interet ajoutées avec succès");
        }
        

        // GET: api/CentreInte/personne/5------------------
        [HttpGet("personne/{idPersonnes}")]
        public ActionResult<IEnumerable<PerssCent>> GetCentreIntéretsByPersonne(int idPersonnes)
        {
            var result = _context.PerssCents
                .Include(pl => pl.CentreIntéret)
                .Where(pl => pl.idPersonnes == idPersonnes)
                .Select(pl => new 
        {
            PersonneNom = pl.personne.nom,
            CentreInteretNom = pl.CentreIntéret.nom,
            idCentreInteret = pl.CentreIntéret.id,
            date_creation = pl.CentreIntéret.datecreation
        })
        .ToList();

    if (result == null || result.Count == 0)
    {
        return Ok("wlh ma kayna chi haja w tahiya l raja");
    }

    return Ok(result);
        }

        // PUT: api/centreineter/personne/5
        [HttpPut("personne/{idPersonnes}")]
        public IActionResult PutCentreInteretByPersonne(int idPersonnes, int idCentreIntérets)
        {
            var perssCent = _context.PerssCents
                .FirstOrDefault(pl => pl.idPersonnes == idPersonnes && pl.idCentreIntérets == idCentreIntérets);

            if (perssCent == null)
            {
                return NotFound();
            }

            _context.Entry(perssCent).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/languess/personne/5
        [HttpDelete("personne/{idPersonnes}/{idCentreIntérets}")]
        public IActionResult DeleteCentreIntéretByPersonne(int idPersonnes, int idCentreIntérets)
        {
            var perssCent = _context.PerssCents
                .FirstOrDefault(pl => pl.idPersonnes == idPersonnes && pl.idCentreIntérets == idCentreIntérets);

            if (perssCent == null)
            {
                return NotFound();
            }

            _context.PerssCents.Remove(perssCent);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

