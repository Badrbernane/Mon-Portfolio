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
    public class ProjetsController : ControllerBase
    {
        private readonly badrDbContext _context;

        public ProjetsController(badrDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Projet>> GetProjets()
        {
            return _context.Projets.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Projet> GetProjet(int id)
        {
            var projet = _context.Projets.Find(id);

            if (projet == null)
            {
                return NotFound();
            }

            return projet;
        }

        [HttpPost]
        public ActionResult<Projet> PostProjet(Projet projet)
        {
            _context.Projets.Add(projet);
            _context.SaveChanges();

            return CreatedAtAction("GetProjet", new { id = projet.id }, projet);
        }

        [HttpPut("{id}")]
        public IActionResult PutProjet(int id, Projet projet)
        {
            if (id != projet.id)
            {
                return BadRequest();
            }

            _context.Entry(projet).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool ProjetExists(int id)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProjet(int id)
        {
            var projet = _context.Projets.Find(id);
            if (projet == null)
            {
                return Ok("not deleted");
            }

            _context.Projets.Remove(projet);
            _context.SaveChanges();

            return Ok("deleted");
        }
    }
}
