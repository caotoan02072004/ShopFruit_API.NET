using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class AccountModel
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Password { get; set; }

        public string? Role { get; set; } = "User";
        public IFormFile? ImageFile { get; set; }
        public string? OldImage { get; set; }
    }
}
