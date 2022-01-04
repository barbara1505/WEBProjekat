using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace WEBProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IznajmljivanjeController : ControllerBase
    {
       public Context Context { get; set; }
        public IznajmljivanjeController(Context context)
        {
            Context = context;
        }

        [Route("Novo iznajmljivanje/{datum}/{bibliotekar}/{knjiga}/{clan}")]
        [HttpPost]

        public async Task<ActionResult> NovoIznajmljivanje(DateTime datum, int bibliotekar, string knjiga, int clan)
        {
            var radnik = Context.Bibliotekari.Where(p=>p.BrojKnjizice==bibliotekar).FirstOrDefault();
            if(radnik==null)
            {
                return BadRequest("Bibliotekar ne postoji!");
            }

            var naslov = Context.Knjige.Where(p=>p.Naslov==knjiga).FirstOrDefault();
            if(naslov==null)
            {
                return BadRequest("Knjiga ne postoji!");
            }

            var clanskakarta=Context.ClanskeKarte.Where(p=>p.brojKarte==clan).FirstOrDefault();
            if(clanskakarta==null)
            {
                return BadRequest("Clanska karta ne postoji!");
            }

            var klijent = Context.Clanovi.Where(p=>p.ClanskaKarta==clanskakarta).FirstOrDefault();
            if(klijent==null)
            {
                return BadRequest("Clan ne postoji!");
            }
            
            var iznajmljivanje= new Iznajmljivanje();
            iznajmljivanje.Bibliotekar=radnik;
            iznajmljivanje.Clan=klijent;
            iznajmljivanje.DatumIznajmljivanja=datum;
            iznajmljivanje.DatumVracanja=null;
            iznajmljivanje.Knjiga=naslov;
            try
            {
                Context.Iznajmljivanje.Add(iznajmljivanje);
                await Context.SaveChangesAsync();
                return Ok("Dodato je novo iznajmljivanje!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }
    }
}