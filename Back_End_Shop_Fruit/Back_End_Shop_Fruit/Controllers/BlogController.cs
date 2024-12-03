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
    [Route("/api/blog")]
    public class BlogController : Controller
    {
        private readonly ShopDbContext ctx;

        public BlogController(ShopDbContext ctx) {
            this.ctx = ctx;
        }


        [HttpGet]
        public async Task<ActionResult> Index(string? name, string? sort, int page = 1)
        {
            var blog = await ctx.Blogs.OrderByDescending(x => x.BlogId).ToListAsync();
            if (!string.IsNullOrEmpty(name))
            {
                blog = await ctx.Blogs.Where(x => x.Title.Contains(name)).ToListAsync();
            }
            int limit = 10;
            page = page <= 1 ? 1 : page;
            var pageData = blog.ToPagedList(page, limit);
            return Ok(new ResponseObject(200, "Lấy dữ liệu thành công", pageData));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> FindById(int id)
        {
            var blog = await ctx.Blogs.FindAsync(id);
            if(blog == null)
            {
                return StatusCode(400, new ResponseObject(400, $"Không tìm thấy dữ liệu có id là: {id}"));
            }
            return Ok(new ResponseObject(200, $"Lấy dữ liệu có id là {id} thành công", blog));
        }

        [HttpGet("homeUserBlog")]
        public async Task<ActionResult> FindBlog()
        {
            var blog = await ctx.Blogs.OrderByDescending(x => x.BlogId).Take(3).ToListAsync();
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", blog));
        }

        [HttpPost]
        public async Task<ActionResult> Save([FromForm] BlogModel model)
        {
            try
            {
                Blog blog = new Blog();
                if (model.Image == null)
                {
                    return BadRequest(new ResponseObject(400, "Image Is Required", null));
                }

                if (model.Image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "blogs");
                    var filePath = Path.Combine(uploadsFolder, model.Image.FileName);

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.Image.CopyToAsync(fileStream);
                    }

                    blog.Image = $"http://{HttpContext.Request.Host.Value}/uploads/blogs/{model.Image.FileName}";
                }
                blog.Title = model.Title;
                blog.Content = model.Content;
                ctx.Blogs.Add(blog);
                ctx.SaveChanges();
                return Ok(new ResponseObject(200, "Thêm mới thành công", blog));
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromForm] BlogModel model)
        {
            try
            {
                var blog = await ctx.Blogs.FindAsync(id);
                if (blog == null)
                {
                    return StatusCode(400, new ResponseObject(400, $"Không tìm thấy dữ liệu có id là {id}"));
                }

                if (model.Image != null && model.Image.Length > 0)
                {
                    // Đường dẫn lưu hình ảnh mới
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "blogs");
                    var newFilePath = Path.Combine(uploadsFolder, model.Image.FileName);

                    // Xóa hình ảnh cũ nếu tồn tại
                    if (!string.IsNullOrEmpty(model.OldImage))
                    {
                        var oldFileName = model.OldImage.Split($"{HttpContext.Request.Host.Value}/uploads/blogs/").LastOrDefault();
                        var oldFilePath = Path.Combine(uploadsFolder, oldFileName);
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }

                    // Lưu file hình ảnh mới
                    using (var fileStream = new FileStream(newFilePath, FileMode.Create))
                    {
                        await model.Image.CopyToAsync(fileStream);
                    }

                    blog.Image = $"http://{HttpContext.Request.Host.Value}/uploads/blogs/{model.Image.FileName}";
                }
                else
                {
                    // Nếu không có hình ảnh mới, giữ nguyên hình ảnh cũ
                    blog.Image = model.OldImage;
                }

                blog.Title = model.Title;
                blog.Content = model.Content;
                ctx.Blogs.Update(blog);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Cập nhật dữ liệu thành công"));

            } catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiii"));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var blog = await ctx.Blogs.FindAsync(id);
                if (blog == null)
                {
                    return StatusCode(400, new ResponseObject(400, $"Không tìm thấy dữ liệu có id là: {id}"));
                }
                ctx.Blogs.Remove(blog);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, $"Xóa dữ liệu có id là {id} thành công"));
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii"));
            }
        }
    }
}
