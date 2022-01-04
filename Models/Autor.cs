using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{

    [Table("Autori")]
    public class Autor
    {
        [Key]
        public int Id_autora { get; set; }

        [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        public int? GodinaRodjenja { get; set; }

        public int? GodinaSmrti { get; set; }

        [JsonIgnore]
        public List<Knjiga> NapisaneKnjige { get; set; }
      
    }
}