using Back_End_Shop_Fruit.Data;
using Back_End_Shop_Fruit.Model.Entity;
using Back_End_Shop_Fruit.Model.ViewModel;
using Back_End_Shop_Fruit.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using X.PagedList.Extensions;

namespace Back_End_Shop_Fruit.Controllers
{
    [ApiController]
    [Route("/api/supplier")]
    public class SupplierController : Controller
    {
        private readonly ShopDbContext ctx;
        public SupplierController(ShopDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string? name, string? sort, int page = 1)
        {
            var sup = await ctx.Suppliers.OrderByDescending(x => x.SupplierId).ToListAsync();
            if (!string.IsNullOrEmpty(name))
            {
                sup = await ctx.Suppliers.Where(x => x.SupplierName.Contains(name)).ToListAsync();
            }

            int limit = 10;
            page = page <= 1 ? 1 : page;
            var pageData = sup.ToPagedList(page, limit);
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pageData));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var sup = await ctx.Suppliers.FindAsync(id);
            if (sup == null)
            {
                return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
            }
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", sup));
        }


        [HttpPost]
        public async Task<ActionResult> Save(SupplierModel model)
        {
            try
            {
                Supplier supplier = new Supplier();
                supplier.SupplierName = model.SupplierName;
                supplier.Address = model.Address;
                supplier.Phone = model.Phone;
                supplier.Email = model.Email;
                ctx.Suppliers.Add(supplier);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Thêm mới thành công"));
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiiii."));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, SupplierModel model)
        {
            try
            {
                var sup = ctx.Suppliers.Find(id);
                if (sup == null)
                {
                    return BadRequest($"Không tìm thấy dữ liệu có id là: {id}");
                }
                sup.SupplierName = model.SupplierName;
                sup.Address = model.Address;
                sup.Phone = model.Phone;
                sup.Email = model.Email;
                ctx.Suppliers.Update(sup);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Cập nhật dữ liệu thành công"));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var sup = await ctx.Suppliers.FindAsync(id);
                if (sup == null)
                {
                    return BadRequest($"Không tìm thấy id có dữ liệu là: {id}");
                }
                ctx.Suppliers.Remove(sup);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, $"Xóa dữ liệu có id là {id} thành công"));
            }
            catch (Exception e) 
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }
    }
}
