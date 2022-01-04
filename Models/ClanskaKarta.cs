using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{

    public enum TipKarte
    {
        Standardna,
        Djacka,
        Studentska,
        Penzionerska
    }

    [Table("Clanske karte")]
    public class ClanskaKarta
    {
        [Key]
        public int IdKarte  { get; set; }

        [Required]
        [Range(1,10000)]
        public int brojKarte { get; set; }

        [MaxLength(50)]
        [Required]
        public TipKarte Tip  { get; set; }

        [Required]
        public DateTime DatumIzdavanja { get; set; }

        [Required]
        public DateTime DatumVazenja { get; set; }

        [Required]
        public int Clanarina { get; set; }

    }
}