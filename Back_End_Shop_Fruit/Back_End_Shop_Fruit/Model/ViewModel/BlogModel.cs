using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class BlogModel
    {
        public string Title { get; set; }
        public string? Content { get; set; }
        public IFormFile? Image { get; set; }
        public string? OldImage { get; set; }
    }
}
