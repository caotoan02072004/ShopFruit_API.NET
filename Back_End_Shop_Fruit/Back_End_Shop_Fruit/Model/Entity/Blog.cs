using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_End_Shop_Fruit.Model.Entity
{
    [Table("Blog")]
    public class Blog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BlogId { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        public string? Content { get; set; }
        [StringLength(255)]
        public string? Image { get; set; }
    }
}
