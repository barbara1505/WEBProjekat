using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WEBProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnjigaController : ControllerBase
    {
       public Context Context { get; set; }
        public KnjigaController(Context context)
        {
            Context = context;
        }

        [Route("Dodaj_knjigu/{Naslov}/{BrojPrimeraka}/{BrojStrana}/{Zanr}/{imeAutora}/{prezimeAutora}")]
        [HttpPost]
        public async Task<ActionResult> DodajKnjigu(string Naslov, int BrojPrimeraka, int BrojStrana,TipKnjige Zanr, string imeAutora, string prezimeAutora )
        {
            if (string.IsNullOrEmpty(Naslov)) return BadRequest("Neophodan je naslov knjige");
            if (Naslov.Length > 50) return BadRequest("Predugacak naslov!");

            Knjiga knjiga = new Knjiga();

            knjiga.Naslov=Naslov;
            knjiga.BrojPrimeraka=BrojPrimeraka;
            knjiga.BrojStrana=BrojStrana;
            knjiga.Zanr=Zanr;

            var autor=Context.Autori.Where(p=>(p.Ime==imeAutora && p.Prezime==prezimeAutora)).FirstOrDefault();

            if(autor!=null)
            {
                knjiga.Autor=autor;
            }
            else
            {
                return BadRequest("Proverite da li ste prethodno uvrstili ovog autora!");
            }
           
            try
            {
                Context.Knjige.Add(knjiga);
                await Context.SaveChangesAsync();
                return Ok("U biblioteku je dodata nova knjiga!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }
        [Route("O_knjizi/{Naslov}")]
        [HttpGet]
        public ActionResult VratiKnjigu(string Naslov)
        {
            if (string.IsNullOrEmpty(Naslov)) return BadRequest("Morate uneti naslov knjige!");

            var knjiga = Context.Knjige.Include(p=>p.Autor).Where(p => (p.Naslov==Naslov)).FirstOrDefault(); //Kako autor da bude prikazan?

            return Ok(knjiga);
        }

        [Route("Prikazi_knjige_odabranog_zanra/{Zanr}")]
        [HttpGet]
        public async Task<ActionResult> vratiKnjigeZanr(TipKnjige Zanr)
        {
            var knjiga = await Context.Knjige.Include(p=>p.Autor).Where(p => (p.Zanr==Zanr)).ToListAsync();
        

            return Ok(knjiga);
        }

        [Route("Sve_knjige")]
        [HttpGet]
        public ActionResult sveKnjige()
        {
            var knjige = Context.Knjige.Include(p=>p.Autor);
            return Ok(knjige.ToList());
        }
    }
}