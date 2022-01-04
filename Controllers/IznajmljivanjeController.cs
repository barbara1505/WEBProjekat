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
                naslov.BrojPrimeraka--;
                Context.Knjige.Update(naslov);
                
                Context.Iznajmljivanje.Add(iznajmljivanje);
                await Context.SaveChangesAsync();
                return Ok("Dodato je novo iznajmljivanje!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("Vracanje knjige/{Id}/{Datum}")]
        [HttpPut]
         public async Task<ActionResult> VracanjeKnjige(int Id, DateTime Datum)
        {
            try
            {
                var iznajmljivanje = Context.Iznajmljivanje.Include(p=>p.Knjiga).Where(p=>p.Id_iznajmljivanje==Id).FirstOrDefault();

                if(iznajmljivanje!=null)
                {
                    iznajmljivanje.DatumVracanja=Datum;
                    iznajmljivanje.Knjiga.BrojPrimeraka++;
                }
                else
                    return BadRequest($"Ovo iznajmljivanje ne postoji!");
                
                Context.Iznajmljivanje.Update(iznajmljivanje);
                Context.Knjige.Update(iznajmljivanje.Knjiga);
                await Context.SaveChangesAsync();
                return Ok($"Promenjeni su podaci o iznajmljivanju:{Id}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        
    }
}