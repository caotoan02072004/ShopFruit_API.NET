using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class ProductModel
    {
        public string? ProductName { get; set; }
        public int CategoryId { get; set; }
        public int SupplierId { get; set; }
        public double Price { get; set; }
        public int? Quantity { get; set; }
        public string? Description { get; set; }
        public IFormFile? ImageFile { get; set; }
        public string? OldImage { get; set; }
    }
}
