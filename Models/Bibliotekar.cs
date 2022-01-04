using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public enum RadnoVreme
    {
        Prepodne,
        Popodne
    }

    [Table("Bibliotekari")]
    public class Bibliotekar
    {
        [Key]
        public int Id_Bibliotekar { get; set; }

        [Required]
        [Range(10000,99999)]
        public int BrojKnjizice { get; set; }

        [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        public char Pol { get; set; }

        public RadnoVreme Smena { get; set; }

        [JsonIgnore]
        public List<Iznajmljivanje> IzdateKnjige { get; set; }

    }
}