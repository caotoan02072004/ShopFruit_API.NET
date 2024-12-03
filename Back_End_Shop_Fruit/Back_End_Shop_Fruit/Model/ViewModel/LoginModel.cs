using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class LoginModel
    {
        public string? Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
