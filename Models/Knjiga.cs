using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public enum TipKnjige
    {   ZaDecu,
        Lektira,
        Price,
        Poezija,
        Roman
    }
    [Table("Knjige")]
    public class Knjiga
    {
        [Key]
        public int IdKnjige { get; set; }
        
        [MaxLength(50)]
        [Required]
        public string Naslov { get; set; } 

        [Required]
        public int BrojPrimeraka { get; set; }

        [Required]
        public int BrojStrana { get; set; }

        [Required]
        public TipKnjige Zanr { get; set; }

        [JsonIgnore]
        public List<Iznajmljivanje> Izdate { get; set; }

        //[JsonIgnore]
        public Autor Autor { get; set; }

    }
}