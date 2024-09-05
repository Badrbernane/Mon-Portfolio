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
    public class LanguessController : ControllerBase
    {
        private readonly badrDbContext _context;

        public LanguessController(badrDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Langue>> GetLangue()
        {
            return _context.Langues.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Langue> GetProjet(int id)
        {
            var langue = _context.Langues.Find(id);

            if (langue == null)
            {
                return NotFound();
            }

            return langue;
        }

        [HttpPost]
        public ActionResult<Langue> PostLangue(Langue langue)
        {
            _context.Langues.Add(langue);
            _context.SaveChanges();

            return CreatedAtAction("GetProjet", new { id = langue.id }, langue);
        }

        [HttpPut("{id}")]
        public IActionResult PutLangue(int id, Langue langue)
        {
            if (id != langue.id)
            {
                return BadRequest();
            }

            _context.Entry(langue).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLangue(int id)
        {
            var langue = _context.Langues.Find(id);
            if (langue == null)
            {
                return NotFound();
            }

            _context.Langues.Remove(langue);
            _context.SaveChanges();

            return NoContent();
        }
        // POST: api/languess/personne/5
        [HttpPost("personne/{personneId}")]
public ActionResult PostLangueByPersonne(int personneId, [FromQuery] int[] langueId, [FromQuery] string[] niveau)
{
    if (langueId.Length != niveau.Length)
    {
        return BadRequest("Les tableaux langueId et niveau doivent avoir la même longueur.");
    }

    for (int i = 0; i < langueId.Length; i++)
    {
        var perssLang = new PerssLang
        {
            idPersonnes = personneId,
            idLangues = langueId[i],
            niveau = niveau[i]
        };

        _context.PerssLangs.Add(perssLang);
    }

    _context.SaveChanges();

    return Ok("Langues ajoutées avec succès");
}


        // GET: api/languess/personne/5
        [HttpGet("personne/{idPersonnes}")]
        public ActionResult<IEnumerable<PerssLang>> GetLanguesByPersonne(int idPersonnes)
        {
            var result = _context.PerssLangs
                .Include(pl => pl.langue)
                .Where(pl => pl.idPersonnes == idPersonnes)
                .Select(pl => new 
        {
            PersonneNom = pl.personne.nom,
            LangueNom = pl.langue.nom,
            IdLangue = pl.langue.id,
            Niveau = pl.niveau
        })
        .ToList();

    if (result == null || result.Count == 0)
    {
        return Ok("khoya sf rah salina sf rah salaw");
    }

    return Ok(result);
        }

        // PUT: api/languess/personne/5
    

        // DELETE: api/languess/personne/5
        [HttpDelete("personne/{idPersonnes}/{idLangues}")]
        public IActionResult DeleteLangueByPersonne(int idPersonnes, int idLangues)
        {
            var perssLang = _context.PerssLangs
                .FirstOrDefault(pl => pl.idPersonnes == idPersonnes && pl.idLangues == idLangues);

            if (perssLang == null)
            {
                return NotFound();
            }

            _context.PerssLangs.Remove(perssLang);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
