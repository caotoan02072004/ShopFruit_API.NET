using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_End_Shop_Fruit.Model.Entity
{
    [Table("Banner")]
    public class Banner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BannerId { get; set; } 
        [Required]
        [StringLength(100)]
        public string BannerName { get; set; }

        [StringLength(255)]
        public string? Image { get; set; }

        public string? Description { get; set; }
    }
}
