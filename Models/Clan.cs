using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{

    [Table("Clanovi")]
    public class Clan
    {
        [Key]
        public int Id_Clan { get; set; }

        [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        public string Adresa { get; set; }

        [Required]
        public string Telefon { get; set; }

        [JsonIgnore]
        public List<Iznajmljivanje> UzeteKnjige { get; set; }

        //[JsonIgnore]
        [Required]
        public ClanskaKarta ClanskaKarta { get; set; }
    }
}