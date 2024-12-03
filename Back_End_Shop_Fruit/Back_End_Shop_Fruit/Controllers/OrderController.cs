using Back_End_Shop_Fruit.Data;
using Back_End_Shop_Fruit.DTO;
using Back_End_Shop_Fruit.Model.Entity;
using Back_End_Shop_Fruit.Model.ViewModel;
using Back_End_Shop_Fruit.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace Back_End_Shop_Fruit.Controllers
{
    [ApiController]
    [Route("/api/order")]
    public class OrderController : Controller
    {
        private readonly ShopDbContext ctx;
        public OrderController(ShopDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var order = await ctx.Orders
                .Include(x => x.Account)
                .Include(x => x.OrderDetails)
                .ThenInclude(o => o.Product)
                .ThenInclude(op => op.Category)
                .OrderByDescending(x => x.OrderId)
                .ToListAsync();
            if (order == null)
            {
                return BadRequest(new ResponseObject(400, "Giỏ hàng đang rỗng"));
            }

            var orderDTOs = order.Select(x => new OrderDTO
            {
                OrderId = x.OrderId,
                TotalAmount = x.TotalAmount,
                AccountId = x.AccountId,
                Address = x.Account.Address,
                Status = x.Status,
                FullName = x.Account.FullName,
                Email = x.Account.Email,
                OrderDetails = x.OrderDetails.Select(od => new OrderDetailDTO
                {
                    OrderDetailId = od.OrderId,
                    ProductName = od.Product.ProductName,
                    ProductImage = od.Product.ImageUrl,
                    ProductPrice = od.Product.Price,
                    CategoryName = od.Product.Category.CategoryName,
                    Quantity = od.Quantity,
                    TotalMoney = (double)od.TotalPrice,

                }).ToList()
            }).ToList();
            return Ok(new ResponseObject(200, "Lấy dữ liệu thành công", orderDTOs));
        }

        [HttpGet("{accountId}")]
        public async Task<ActionResult> Order(int accountId)
        {
            var cartItems = await ctx.Carts
                                  .Include(c => c.Product)
                                  .Where(c => c.AccountId == accountId)
                                  .ToListAsync();

            if (cartItems == null || !cartItems.Any())
            {
                return BadRequest(new { message = "Giỏ hàng rỗng!" });
            }

            var totalAmount = cartItems.Sum(item => item.Quantity * item.Product.Price);
            var order = new Order
            {
                AccountId = accountId,
                TotalAmount = (decimal)totalAmount,
                Status = "Pending",
            };

            await ctx.Orders.AddAsync(order);
            await ctx.SaveChangesAsync();

            foreach (var cartItem in cartItems)
            {
                var orderDetail = new OrderDetail
                {
                    OrderId = order.OrderId,
                    AccountId = accountId, // Thêm dòng này
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    Price = (decimal)cartItem.Product.Price,
                    TotalPrice = (decimal)(cartItem.Quantity * cartItem.Product.Price),
                };

                await ctx.OrderDetails.AddAsync(orderDetail);
            }

            ctx.Carts.RemoveRange(cartItems);

            await ctx.SaveChangesAsync();

            return Ok(new ResponseObject(200, "Lấy dữ liệu thành công", new
            {
                message = "Đặt hàng thành công!",
                orderId = order.OrderId,
                totalAmount = order.TotalAmount
            }));
        }

        [HttpGet("id/{orderId}")]
        public async Task<IActionResult> GetOrderById(int orderId)
        {

            var order = await ctx.Orders
                .Include(x => x.Account)
                .Include(x => x.OrderDetails)
                .ThenInclude(o => o.Product)
                .ThenInclude(op => op.Category)
                .Where(x => x.OrderId == orderId)
                .OrderByDescending(x => x.OrderId)
                .ToListAsync();
            if (order == null)
            {
                return BadRequest(new ResponseObject(400, "Giỏ hàng đang rỗng"));
            }

            var orderDTOs = order.Select(x => new OrderDTO
            {
                OrderId = x.OrderId,
                TotalAmount = x.TotalAmount,
                AccountId = x.AccountId,
                Address = x.Account.Address,
                Status = x.Status,
                FullName = x.Account.FullName,
                Email = x.Account.Email,
                OrderDetails = x.OrderDetails.Select(od => new OrderDetailDTO
                {
                    OrderDetailId = od.OrderId,
                    ProductName = od.Product.ProductName,
                    ProductImage = od.Product.ImageUrl,
                    ProductPrice = od.Product.Price,
                    CategoryName = od.Product.Category.CategoryName,
                    Quantity = od.Quantity,
                    TotalMoney = (double)od.TotalPrice,

                }).ToList()
            }).ToList();
            return Ok(new ResponseObject(200, "Lấy dữ liệu thành công", orderDTOs));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, OrderModel model)
        {
            try
            {
                var order = await ctx.Orders.FindAsync(id);
                if (order == null)
                {
                    return BadRequest($"Không tìm thấy dữ liệu có id là: {id}");
                }
                order.Status = model.Status;
                await ctx.SaveChangesAsync();
                return Ok("Cập nhật dữ liệu thành công");
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteOrder(int orderId)
        {
            var orederId = await ctx.Orders.FindAsync(orderId);
            if (orederId == null)
            {
                return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {orderId}"));
            }
            ctx.Orders.Remove(orederId);
            await ctx.SaveChangesAsync();
            return Ok(new ResponseObject(200, $"Xóa dữ liệu có id là {orderId} thành công"));
        }
    }
}
