using Back_End_Shop_Fruit.Model.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Back_End_Shop_Fruit.Model.ViewModel
{
    public class CartModel
    {
        public int Quantity { get; set; }

        public int AccountId { get; set; }

        public int ProductId { get; set; }
    }
}
