using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class RegisterModel
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(5)]
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
