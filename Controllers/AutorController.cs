using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WEBProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AutorController : ControllerBase
    {
       public Context Context { get; set; }
        public AutorController(Context context)
        {
            Context = context;
        }

        [Route("Dodaj_Autora/{ime}/{prezime}/{godina_rodjenja}/{godina_smrti}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_autora(string ime, string prezime, int? godina_rodjenja, int? godina_smrti )
        {
            if (string.IsNullOrEmpty(ime)) return BadRequest("Neophodno je ime autora!");
            if (ime.Length > 20) return BadRequest("Predugacko ime!");

            if (string.IsNullOrEmpty(prezime)) return BadRequest("Neophodno je prezime autora!");
            if (prezime.Length > 20) return BadRequest("Predugacko prezime!");

            Autor autor = new Autor();

            autor.Ime=ime;
            autor.Prezime=prezime;
            autor.GodinaRodjenja=godina_rodjenja;
            autor.GodinaSmrti=godina_smrti;
           
            try
            {
                Context.Autori.Add(autor);
                await Context.SaveChangesAsync();
                return Ok("U biblioteku je uvrsten novi autor!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("O_Autoru/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult VratiAutora(string Ime, string Prezime)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime autora!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime autora!");
            var autor = Context.Autori.Include(p=>p.NapisaneKnjige).Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();

            return Ok(autor);// kako da vratim listu knjiga koje je napisao autor
        }

        [Route("Ukloni_Autora/{Ime}/{Prezime}")]
        [HttpDelete]
        public async Task<ActionResult> UkloniAutora(string Ime, string Prezime)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime autora!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime autora!");
           
            try
            {
                var autor = Context.Autori.Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();
                if (autor != null)
                {
                    string ime = autor.Ime;
                    string prezime = autor.Prezime;

                    Context.Autori.Remove(autor);
                    await Context.SaveChangesAsync();
                    return Ok($"Iz biblioteke je uklonjen autor: {ime} {prezime}!");
                }
                else
                {
                    return Ok("Takav autor ne postoji!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Uredi_Autora/{Ime}/{Prezime}")]
        [HttpPut]
        public async Task<ActionResult> UrediAutora(string Ime, string Prezime, int godina_smrti)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime autora!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime autora!");

            try
            {
                var autor = Context.Autori.Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();

                if(autor!=null)
                {
                    autor.GodinaSmrti=godina_smrti;
                }
                else
                    return BadRequest($"Autor {Ime} {Prezime} ne postoji u bazi!");
                
                Context.Autori.Update(autor);
                await Context.SaveChangesAsync();
                return Ok($"Promenjeni su podaci o autoru: {Ime} {Prezime}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("Dodaj_Knjigu_Autoru/{Ime}/{Prezime}/{Naslov}")]
        [HttpPut]
         public async Task<ActionResult> dodajKnjigu(string Ime, string Prezime, string Naslov)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime autora!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime autora!");
            if (string.IsNullOrEmpty(Naslov)) return BadRequest("Neophodan je naslov knjige!");

            try
            {
                var autor = Context.Autori.Include(p=>p.NapisaneKnjige).Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();
                var knjiga= Context.Knjige.Where(p=>p.Naslov==Naslov).FirstOrDefault();

                if(autor!=null)
                {
                    if(knjiga!=null)
                    {
                        autor.NapisaneKnjige.Add(knjiga);
                    }
                    else
                    {
                        return BadRequest($"Knjiga {Naslov} ne postoji!");
                    }
                }
                else
                    return BadRequest($"Autor {Ime} {Prezime} ne postoji u bazi!");
                
                Context.Autori.Update(autor);
                await Context.SaveChangesAsync();
                return Ok($"Dodata je knjiga {Naslov}, autora {Ime} {Prezime} ");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("Knjige_Autora/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult  knjigeAutora(string Ime, string Prezime)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime autora!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime autora!");

            var autor = Context.Autori.Include(p=>p.NapisaneKnjige).Where(p=>(p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();
            var knjige= autor.NapisaneKnjige.ToList(); // vraca sve podatke o knjigama.

            return Ok(knjige);
        }

        [Route("Svi_autori")]
        [HttpGet]
        public ActionResult sviAutori()
        {
            var autori = Context.Autori.Include(p => p.NapisaneKnjige);
            return Ok(autori.ToList());
        }
    }
}