using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.Entity
{
    [Table("Account")]
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountId { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(255)]
        public string? Address { get; set; }

        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [StringLength(255)]
        public string? Avatar { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
    }
}
