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
    public class BibliotekarController : ControllerBase
    {
       public Context Context { get; set; }
        public BibliotekarController(Context context)
        {
            Context = context;
        }

        [Route("Zaposli_bibliotekara/{brojKnjizice}/{ime}/{prezime}/{pol}/{smena}")]
        [HttpPost]
        public async Task<ActionResult> Zaposli_bibliotekara(int brojKnjizice,  string ime, string prezime, char pol, RadnoVreme smena)
        {
            if(brojKnjizice<10000||brojKnjizice>99999) return BadRequest("Pogresna vrednost za broj radne knjizice!");

            if (string.IsNullOrEmpty(ime)) return BadRequest("Neophodno je ime bibliotekara!");
            if (ime.Length > 20) return BadRequest("Predugacko ime!");

            if (string.IsNullOrEmpty(prezime)) return BadRequest("Neophodno je prezime bibliotekara!");
            if (prezime.Length > 20) return BadRequest("Predugacko prezime!");

            if(char.IsWhiteSpace(pol)) return BadRequest("Neophodno je uneti i pol bibliotekara!");
            //if(char.IsLower(pol)) pol=char.ToUpper(pol);
            //if(pol!='M'||pol!='Z') return BadRequest("Unesite M ili Z!");

            Bibliotekar radnik = new Bibliotekar();

            radnik.BrojKnjizice=brojKnjizice;
            radnik.Ime=ime;
            radnik.Prezime=prezime;
            radnik.Pol=pol;
            radnik.Smena=smena;

            try
            {
                Context.Bibliotekari.Add(radnik);
                await Context.SaveChangesAsync();
                return Ok("Zaposljen je novi bibliotekar!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("Pregledaj_bibliotekara/{brojKnjizice}")]
        [HttpGet]
        public ActionResult VratiBibliotekara(int brojKnjizice)
        {
            if (brojKnjizice < 10000 || brojKnjizice > 99999) return BadRequest("Pogresna vrednost za broj radne knjizice!");

            var bibliotekar = Context.Bibliotekari.Where(p => p.BrojKnjizice == brojKnjizice).FirstOrDefault();

            return Ok(bibliotekar);
        }

        [Route("Otpusti_bibliotekara/{brojKnjizice}")]
        [HttpDelete]
        public async Task<ActionResult> Otpusti_bibliotekara(int brojKnjizice)
        {
            if (brojKnjizice < 10000 || brojKnjizice > 99999) return BadRequest("Pogresna vrednost za broj radne knjizice!");

            try
            {
                var bibliotekar = Context.Bibliotekari.Where(p => p.BrojKnjizice == brojKnjizice).FirstOrDefault();
                if (bibliotekar != null)
                {
                    string Name = bibliotekar.Ime;
                    string SurName = bibliotekar.Prezime;

                    Context.Bibliotekari.Remove(bibliotekar);
                    await Context.SaveChangesAsync();
                    return Ok($"Bibliotekar ciji je broj radne knjizice: {brojKnjizice}, {Name} {SurName} je otpusten!");
                }
                else
                {
                    return Ok("Takav bibliotekar ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Svi_bibliotekari")]
        [HttpGet]
        public ActionResult sviBibliotekari()
        {
            var bibliotekari = Context.Bibliotekari.Include(p=>p.IzdateKnjige);
            return Ok(bibliotekari.ToList());
        }
     
    }
}