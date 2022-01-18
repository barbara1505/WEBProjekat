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
    public class ClanController : ControllerBase
    {
       public Context Context { get; set; }
        public ClanController(Context context)
        {
            Context = context;
        }

        [Route("Upisi_clana/{Ime}/{Prezime}/{Adresa}/{Telefon}/{brojKarte}")]
        [HttpPost]
        public async Task<ActionResult> UpisClana(string Ime, string Prezime, string Adresa, string Telefon, int brojKarte )
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime clana!");
            if (Ime.Length > 20) return BadRequest("Predugacko ime!");

            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime clana!");
            if (Prezime.Length > 20) return BadRequest("Predugacko prezime!");

            Clan clan = new Clan();

            clan.Ime=Ime;
            clan.Prezime=Prezime;
            clan.Adresa=Adresa;
            clan.Telefon=Telefon;

            var clanskaKarta=Context.ClanskeKarte.Where(p=>p.brojKarte==brojKarte).FirstOrDefault();

            if(clanskaKarta!=null)
            {
                clan.ClanskaKarta=clanskaKarta;
            }
            else
            {
                return BadRequest("Morate prvo napraviti clansku kartu!");
            }
           
            try
            {
                Context.Clanovi.Add(clan);
                await Context.SaveChangesAsync();
                return Ok("U biblioteku je upisan novi clan!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("Podaci_clan/{Ime}/{Prezime}")]
        [HttpGet]
        public ActionResult VratiClana(string Ime, string Prezime)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime clana!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime clana!");
            var clan = Context.Clanovi.Include(p=>p.ClanskaKarta).Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();

            return Ok(clan);
        }

        [Route("Ukloni_clana/{Ime}/{Prezime}")]
        [HttpDelete]
        public async Task<ActionResult> UkloniClana(string Ime, string Prezime)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime clana!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime clana!");
           
            try
            {
                var clan = Context.Clanovi.Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();
                if (clan != null)
                {
                    string ime = clan.Ime;
                    string prezime = clan.Prezime;

                    Context.Clanovi.Remove(clan);
                    await Context.SaveChangesAsync();
                    return Ok($"Iz biblioteke je uklonjen clan: {ime} {prezime}!");
                }
                else
                {
                    return Ok("U biblioteci ne postoji clan sa zadatim imenom i prezimenom!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("Promeni_podatke_clan/{Ime}/{Prezime}/{noviBrojTelefona}")]
        [HttpPut]
        public async Task<ActionResult> UrediClana(string Ime, string Prezime, string noviBrojTelefona)
        {
            if (string.IsNullOrEmpty(Ime)) return BadRequest("Neophodno je ime clana!");
            if (string.IsNullOrEmpty(Prezime)) return BadRequest("Neophodno je prezime clana!");

            try
            {
                var clan = Context.Clanovi.Where(p => (p.Ime==Ime && p.Prezime==Prezime)).FirstOrDefault();

                if(clan!=null)
                {
                    clan.Telefon=noviBrojTelefona;
                }
                else
                    return BadRequest($"{Ime} {Prezime} nije clan biblioteke!");
                
                Context.Clanovi.Update(clan);
                await Context.SaveChangesAsync();
                return Ok($"Promenjeni su podaci o clanu: {Ime} {Prezime}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("Svi_clanovi")]
        [HttpGet]
        public ActionResult sviClanovi()
        {
            var clanovi = Context.Clanovi.Include(p=>p.ClanskaKarta).Include(p=>p.UzeteKnjige);
            return Ok(clanovi.ToList());
        }
     
    }
}