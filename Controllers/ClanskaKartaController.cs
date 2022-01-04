using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WEBProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClanskaKartaController : ControllerBase
    {
       public Context Context { get; set; }
        public ClanskaKartaController(Context context)
        {
            Context = context;
        }

        [Route("Dodeli clansku kartu/{brojKarte}/{tipKarte}/{VaziOd}/{VaziDo}")]
        [HttpPost]
        public async Task<ActionResult> DodeliKartu(int brojKarte,  TipKarte tipKarte, DateTime VaziOd, DateTime VaziDo)
        {
            if (brojKarte < 1 || brojKarte > 10000) return BadRequest("Pogresna vrednost broja clanske karte!");
            
            ClanskaKarta karta=new ClanskaKarta();
            karta.brojKarte=brojKarte;
            karta.Tip=tipKarte;
            karta.DatumIzdavanja=VaziOd;
            karta.DatumVazenja=VaziDo;

            if(tipKarte==TipKarte.Standardna)
                karta.Clanarina=1200;
            else
            if(tipKarte==TipKarte.Studentska)
                karta.Clanarina=1000;
            else
            if(tipKarte==TipKarte.Djacka)
                karta.Clanarina=900;
            else
                karta.Clanarina=700;

            try
            {
                Context.ClanskeKarte.Add(karta);
                await Context.SaveChangesAsync();
                return Ok("Dodeljena je clanska karta!");

            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        [Route("Uvid u clansku kartu/{brojKarte}")]
        [HttpGet]
        public ActionResult VratiKartu(int brojkarte)
        {
            if (brojkarte < 1 || brojkarte > 10000) return BadRequest("Pogresna vrednost broja clanske karte!");

            var karta = Context.ClanskeKarte.Where(p => p.brojKarte == brojkarte).FirstOrDefault();

            return Ok(karta);
        }

        [Route("Oduzmi clansku kartu/{brojkarte}")]
        [HttpDelete]
        public async Task<ActionResult> OduzmiKartu(int brojkarte)
        {
            if (brojkarte < 1 || brojkarte > 10000) return BadRequest("Pogresna vrednost broja clanske karte!");

            try
            {
                var karta = Context.ClanskeKarte.Where(p => p.brojKarte == brojkarte).FirstOrDefault();

                if (karta != null)
                {
                    if(karta.DatumVazenja<DateTime.Today.Date)
                    {
                        Context.ClanskeKarte.Remove(karta);
                        await Context.SaveChangesAsync();
                        return Ok($"Clanska karta sa brojem: {brojkarte} je uklonjena!");
                    }
                    else return Ok($"Clanska karta sa brojem : {brojkarte} ima validan datum vazenja!");
                }
                else
                {
                    return BadRequest($"Ne postoji clanska karta sa brojem {brojkarte}");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Produzi clansku kartu/{brojkarte}")]
        [HttpPut]
        public async Task<ActionResult> PromeniKartu(int brojkarte)
        {
            try
            {
                var karta = Context.ClanskeKarte.Where(p => p.brojKarte==brojkarte).FirstOrDefault();

                if(karta!=null)
                {
                    if(karta.DatumVazenja <= DateTime.Today.Date)
                    {
                        karta.DatumVazenja=DateTime.Today.Date.AddMonths(1);
                    }
                }
                else
                    return BadRequest($"Ne postoji clanska karta sa brojem {brojkarte}");
                
                Context.ClanskeKarte.Update(karta);
                await Context.SaveChangesAsync();

                return Ok($"Overena je clanska karta broj: {brojkarte}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
     
    }
}