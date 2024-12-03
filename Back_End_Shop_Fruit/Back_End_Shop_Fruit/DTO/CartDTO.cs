using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.DTO
{
    public class CartDTO
    {
        public int CartId { get; set; }

        public decimal? TotalAmount { get; set; }

        public int Quantity { get; set; }
        public int AccountId { get; set; }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public string ProductImage { get; set; }
    }
}
