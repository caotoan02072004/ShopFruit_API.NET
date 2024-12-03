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
    [Route("/api/product")]
    public class ProductController : Controller
    {
        private readonly ShopDbContext ctx;
        public ProductController(ShopDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string? name, string? sort, int page = 1)
        {
            var pro = await ctx.Products
                .Include(x => x.Category)
                .Include(x => x.Supplier)
                .OrderByDescending(x => x.ProductId)
                .ToListAsync();
            if (!string.IsNullOrEmpty(name))
            {
                pro = await ctx.Products.Where(x => x.ProductName.Contains(name)).ToListAsync();
            }
            int limit = 10;
            page = page <= 1 ? 1 : page;
            var pageData = pro.ToPagedList(page, limit);
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pageData));
        }

        [HttpGet("homeUser")]
        public async Task<ActionResult> FindProduct()
        {
            var pro = await ctx.Products.OrderByDescending(x => x.ProductId).Take(6).ToListAsync();
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pro));
        }

        [HttpGet("sortByPrice")]
        public async Task<ActionResult> SortByPrice(string sortOrder)
        {
            IQueryable<Product> productsQuery = ctx.Products;

            switch (sortOrder)
            {
                case "asc":
                    productsQuery = productsQuery.OrderBy(x => x.Price);
                    break;
                case "desc":
                    productsQuery = productsQuery.OrderByDescending(x => x.Price);
                    break;
                default:
                    productsQuery = productsQuery.OrderBy(x => x.ProductName);
                    break;
            }

            var products = await productsQuery.ToListAsync();
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", products));
        }

        [HttpGet("sortByCategory")]
        public async Task<ActionResult> GetProductsByCategory(int categoryId)
        {
            var pro = await ctx.Products.Where(x => x.CategoryId == categoryId).ToListAsync();
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pro));
        }

        [HttpPost]
        public async Task<ActionResult> Save([FromForm] ProductModel model)
        {
            try
            {
                Product product = new Product();
                if (model.ImageFile == null)
                {
                    return BadRequest(new ResponseObject(400, "Image Is Required", null));
                }

                if (model.ImageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");
                    var filePath = Path.Combine(uploadsFolder, model.ImageFile.FileName);

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.ImageFile.CopyToAsync(fileStream);
                    }

                    product.ImageUrl = $"http://{HttpContext.Request.Host.Value}/uploads/products/{model.ImageFile.FileName}";
                }

                product.ProductName = model.ProductName;
                product.CategoryId = model.CategoryId;
                product.SupplierId = model.SupplierId;
                product.Price = model.Price;
                product.Quantity = model.Quantity ?? 0;
                product.Description = model.Description;
                ctx.Products.Add(product);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Thêm mới thành công"));
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "lỗiiii."));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> FindId(int id)
        {
            var pro = await ctx.Products.Include(x => x.Category)
                .Include(x => x.Supplier).FirstAsync(x => x.ProductId == id);
            if(pro == null)
            {
                return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
            }
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pro));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromForm] ProductModel model)
        {
            try
            {
                var pro = await ctx.Products.FindAsync(id);
                if (pro == null)
                {
                     return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
                }

                if (model.ImageFile != null && model.ImageFile.Length > 0)
                {
                    // Đường dẫn lưu hình ảnh mới
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");
                    var newFilePath = Path.Combine(uploadsFolder, model.ImageFile.FileName);

                    // Xóa hình ảnh cũ nếu tồn tại
                    if (!string.IsNullOrEmpty(model.OldImage))
                    {
                        var oldFileName = model.OldImage.Split($"{HttpContext.Request.Host.Value}/uploads/products/").LastOrDefault();
                        var oldFilePath = Path.Combine(uploadsFolder, oldFileName);
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }

                    // Lưu file hình ảnh mới
                    using (var fileStream = new FileStream(newFilePath, FileMode.Create))
                    {
                        await model.ImageFile.CopyToAsync(fileStream);
                    }

                    pro.ImageUrl = $"http://{HttpContext.Request.Host.Value}/uploads/products/{model.ImageFile.FileName}";
                }
                else
                {
                    // Nếu không có hình ảnh mới, giữ nguyên hình ảnh cũ
                    pro.ImageUrl = model.OldImage;
                }

                pro.ProductName = model.ProductName;
                pro.CategoryId = model.CategoryId;
                pro.SupplierId = model.SupplierId;
                pro.Price = model.Price;
                pro.Quantity = model.Quantity ?? 0;
                pro.Description = model.Description;
                ctx.Products.Update(pro);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Cập nhật thành công"));
            }
            catch (Exception e) 
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var pro = await ctx.Products.FindAsync(id);
                if (pro == null)
                {
                    return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
                }
                ctx.Products.Remove(pro);
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
