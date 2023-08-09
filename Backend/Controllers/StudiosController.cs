using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudiosController : ControllerBase
    {
        private readonly AnimeContext _context;

        public StudiosController(AnimeContext context)
        {
            _context = context;
        }

        // GET: api/Studios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Studio>>> GetStudio()
        {
          if (_context.Studio == null)
          {
              return NotFound();
          }
            return await _context.Studio.OrderBy(g => g.Name).ToListAsync();
        }

        // GET: api/Studios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Studio>> GetStudio(int id)
        {
          if (_context.Studio == null)
          {
              return NotFound();
          }
            var studio = await _context.Studio.FindAsync(id);

            if (studio == null)
            {
                return NotFound();
            }

            return studio;
        }
    }
}
