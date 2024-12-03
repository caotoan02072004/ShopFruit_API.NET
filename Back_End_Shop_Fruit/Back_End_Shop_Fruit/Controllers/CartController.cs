using Back_End_Shop_Fruit.Data;
using Back_End_Shop_Fruit.DTO;
using Back_End_Shop_Fruit.Model.Entity;
using Back_End_Shop_Fruit.Model.ViewModel;
using Back_End_Shop_Fruit.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Shop_Fruit.Controllers
{
    [ApiController]
    [Route("/api/cart")]
    public class CartController : Controller
    {
        private readonly ShopDbContext ctx;
        public CartController(ShopDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Index(int userId)
        {
            var cart = await ctx.Carts
                .Include(x => x.Product)
                .Include(x => x.Account)
                .Where(x => x.AccountId == userId)
                .OrderByDescending(x => x.CartId)
                .ToListAsync();

            var cartDTOs = cart.Select(c => new CartDTO
            {
                CartId = c.CartId,
                TotalAmount = c.TotalAmount,
                Quantity = c.Quantity,
                AccountId = c.AccountId,
                ProductId = c.ProductId,
                ProductName = c.Product.ProductName,
                ProductImage = c.Product.ImageUrl,
                ProductPrice = c.Product.Price,
            }).ToList();
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", cartDTOs));
        }

        [HttpPost]
        public async Task<ActionResult> AddToCart(CartModel model)
        {
            try
            {
                var product = await ctx.Products.FindAsync(model.ProductId);
                if (product == null)
                {
                    return BadRequest(new ResponseObject(400, "Sản phẩm không tồn tại"));
                }

                var existingCart = await ctx.Carts
                    .FirstOrDefaultAsync(c => c.ProductId == model.ProductId && c.AccountId == model.AccountId);

                if (existingCart != null)
                {
                    existingCart.Quantity += model.Quantity;
                    existingCart.TotalAmount = (decimal)(existingCart.Quantity * product.Price);
                }
                else
                {
                    Cart cart = new Cart
                    {
                        Quantity = model.Quantity,
                        AccountId = model.AccountId,
                        ProductId = model.ProductId,
                        TotalAmount = (decimal)(model.Quantity * product.Price)
                    };
                    await ctx.Carts.AddAsync(cart);
                }
                await ctx.SaveChangesAsync();

                return Ok(new ResponseObject(200, "Cập nhật giỏ hàng thành công"));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, new ResponseObject(500, "Lỗi server"));
            }
        }

        [HttpPut("{id}/{quantity}")]
        public async Task<ActionResult> UpdateCart(int id, int quantity)
        {
            try
            {
                var cart = await ctx.Carts.FindAsync(id);
                if (cart != null)
                {
                    cart.Quantity = quantity;
                    await ctx.SaveChangesAsync();
                    return Ok(new ResponseObject(200, "Cập nhật giỏ hàng thành công"));
                }
                else
                {
                    return Ok(new ResponseObject(404, "Không tìm thấy giỏ hàng"));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseObject(500, "Đã xảy ra lỗi", ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCart(int id)
        {
            try
            {
                var cart = await ctx.Carts.FindAsync(id);
                if (cart != null)
                {
                    ctx.Carts.Remove(cart);
                    await ctx.SaveChangesAsync();
                    return Ok(new ResponseObject(200, "Xóa giỏ hàng thành công"));
                }
                else
                {
                    return Ok(new ResponseObject(404, "Cập nhật giỏ hàng thành công"));
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
