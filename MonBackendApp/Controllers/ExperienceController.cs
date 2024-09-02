using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonBackendApp.Data;
using MonBackendApp.Models; // Assurez-vous que le namespace est correct
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonBackendApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExperienceController : ControllerBase
    {
        private readonly badrDbContext _context;

        public ExperienceController(badrDbContext context)
        {
            _context = context;
        }

        // GET: api/Experience
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Experience>>> GetExperiences()
        {
            return await _context.Experiences.ToListAsync();
        }

        // GET: api/Experience/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Experience>> GetExperience(int id)
        {
            var experience = await _context.Experiences.FindAsync(id);

            if (experience == null)
            {
                return NotFound();
            }

            return experience;
        }

        // POST: api/Experience
        [HttpPost]
        public async Task<ActionResult<Experience>> PostExperience(Experience experience)
        {
            _context.Experiences.Add(experience);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExperience), new { id = experience.id }, experience);
        }

        // PUT: api/Experience/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExperience(int id, Experience experience)
        {
            if (id != experience.id)
            {
                return BadRequest();
            }

            _context.Entry(experience).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExperienceExists(id))
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

        // DELETE: api/Experience/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExperience(int id)
        {
            var experience = await _context.Experiences.FindAsync(id);
            if (experience == null)
            {
                return Ok("not deleted");
            }

            _context.Experiences.Remove(experience);
            await _context.SaveChangesAsync();

            return Ok("deleted");
        }

        private bool ExperienceExists(int id)
        {
            return _context.Experiences.Any(e => e.id == id);
        }
    }
}
