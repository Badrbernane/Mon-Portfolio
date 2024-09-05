using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonBackendApp.Data;
using MonBackendApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class FormationsController : ControllerBase
{
    private readonly badrDbContext _context;

    public FormationsController(badrDbContext context)
    {
        _context = context;
    }

    // GET: api/Formations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Formation>>> GetFormations()
    {
        return await _context.Formations.ToListAsync();
    }

    // GET: api/Formations/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Formation>> GetFormation(int id)
    {
        var formation = await _context.Formations.FindAsync(id);

        if (formation == null)
        {
            return NotFound();
        }

        return formation;
    }

    // PUT: api/Formations/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFormation(int id, Formation formation)
    {
        if (id != formation.id)
        {
            return BadRequest();
        }

        _context.Entry(formation).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FormationExists(id))
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

    // POST: api/Formations
    [HttpPost]
    public async Task<ActionResult<Formation>> PostFormation(Formation formation)
    {
        _context.Formations.Add(formation);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetFormation", new { id = formation.id }, formation);
    }

    // DELETE: api/Formations/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFormation(int id)
    {
        var formation = await _context.Formations.FindAsync(id);
        if (formation == null)
        {
            return Ok("not deleted");
        }

        _context.Formations.Remove(formation);
        await _context.SaveChangesAsync();

        return Ok("deleted");
    }

    private bool FormationExists(int id)
    {
        return _context.Formations.Any(e => e.id == id);
    }
}
