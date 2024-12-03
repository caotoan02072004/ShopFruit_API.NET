using Back_End_Shop_Fruit.Model.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.DTO
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public decimal? TotalAmount { get; set; }
        public string Status { get; set; }
        public int AccountId { get; set; }
        public string? Address { get; set; }    
        public string FullName { get; set; }
        public string Email { get; set; }
        public List<OrderDetailDTO> OrderDetails { get; set; } = new List<OrderDetailDTO>();
    }
}
