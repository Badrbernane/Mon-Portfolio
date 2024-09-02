using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonBackendApp.Data; // Change to your actual namespace
using MonBackendApp.Models; // Change to your actual namespace

namespace MonBackendApp.Controllers // Change to your actual namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificatController : ControllerBase
    {
        private readonly badrDbContext _context;

        public CertificatController(badrDbContext context)
        {
            _context = context;
        }

        // GET: api/Certificat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Certificat>>> GetCertificats()
        {
            return await _context.Certificats.ToListAsync();
        }

        // GET: api/Certificat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Certificat>> GetCertificat(int id)
        {
            var certificat = await _context.Certificats.FindAsync(id);

            if (certificat == null)
            {
                return NotFound();
            }

            return certificat;
        }

        // POST: api/Certificat
        [HttpPost]
        public async Task<ActionResult<Certificat>> PostCertificat(Certificat certificat)
        {
            _context.Certificats.Add(certificat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCertificat), new { id = certificat.id }, certificat);
        }

        // PUT: api/Certificat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCertificat(int id, Certificat certificat)
        {
            if (id != certificat.id)
            {
                return BadRequest();
            }

            _context.Entry(certificat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CertificatExists(id))
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

        // DELETE: api/Certificat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCertificat(int id)
        {
            var certificat = await _context.Certificats.FindAsync(id);
            if (certificat == null)
            {
                return Ok("not deleted");
            }

            _context.Certificats.Remove(certificat);
            await _context.SaveChangesAsync();

            return Ok("deleted");
        }

        private bool CertificatExists(int id)
        {
            return _context.Certificats.Any(e => e.id == id);
        }
    }
}
