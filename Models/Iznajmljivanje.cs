using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{

    [Table("Iznajmljivanje")]
    public class Iznajmljivanje
    {
        [Key]
        public int Id_iznajmljivanje { get; set; }

        [Required]
        public DateTime DatumIznajmljivanja { get; set; }

        public DateTime? DatumVracanja { get; set; }

        [JsonIgnore]
        public Bibliotekar Bibliotekar {get; set; }

        [JsonIgnore]
        public Clan Clan {get; set; }

        [JsonIgnore]
        public Knjiga Knjiga {get; set; }
    }
}