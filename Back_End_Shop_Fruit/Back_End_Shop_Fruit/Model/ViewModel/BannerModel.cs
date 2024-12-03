using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class BannerModel
    {
        public string BannerName { get; set; }

        public IFormFile? ImageFile { get; set; }

        public string? Description { get; set; }
        public string? OldImage { get; set; }
    }
}
