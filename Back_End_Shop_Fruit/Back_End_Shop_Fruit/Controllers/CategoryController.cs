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
    [Route("/api/category")]
    public class CategoryController: Controller
    {
        private readonly ShopDbContext ctx;
        public CategoryController(ShopDbContext ctx) {
            this.ctx = ctx;
        }

        [HttpGet]
        public async Task<ActionResult> Index(string? name, string? sort, int page = 1)
        {
            var categories = await ctx.Categories.ToListAsync();
            if (!string.IsNullOrEmpty(name)) { 
                categories = await ctx.Categories.Where(x => x.CategoryName.Contains(name)).ToListAsync();
            }

            if (!string.IsNullOrEmpty(sort)) {
                switch (sort)
                {
                    case "Id-ASC":
                        categories = await ctx.Categories.OrderBy(x => x.CategoryId).ToListAsync();
                        break;
                    case "Id-DESC":
                        categories = await ctx.Categories.OrderByDescending(x => x.CategoryId).ToListAsync();
                        break;

                    case "Name-ASC":
                        categories = await ctx.Categories.OrderBy(x => x.CategoryName).ToListAsync();
                        break;
                    case "Name-DESC":
                        categories = await ctx.Categories.OrderByDescending(x => x.CategoryName).ToListAsync();
                        break;
                }
            }
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "Id-ASC":
                        categories = await ctx.Categories.Where(x => x.CategoryName.Contains(name)).OrderBy(x => x.CategoryId).ToListAsync();
                        break;
                    case "Id-DESC":
                        categories = await ctx.Categories.Where(x => x.CategoryName.Contains(name)).OrderByDescending(x => x.CategoryId).ToListAsync();
                        break;

                    case "Name-ASC":
                        categories = await ctx.Categories.Where(x => x.CategoryName.Contains(name)).OrderBy(x => x.CategoryName).ToListAsync();
                        break;
                    case "Name-DESC":
                        categories = await ctx.Categories.Where(x => x.CategoryName.Contains(name)).OrderByDescending(x => x.CategoryName).ToListAsync();
                        break;
                }
            }
            int limit = 10;
            page = page <= 1 ? 1 : page;
            var pageData = categories.ToPagedList(page, limit);
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pageData));
        }

        [HttpGet("{id}")]
        public ActionResult FindId(int id)
        {
            var cate = ctx.Categories.Find(id);
            if (cate == null)
            {
                return BadRequest($"Không tìm thấy dữ liệu có id là: {id}");
            }
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", cate));
        }

        [HttpPost]
        public async Task<ActionResult> Save(CategoryModel model)
        {
            try
            {
                Category category = new Category();
                category.CategoryName = model.CategoryName;
                category.Description = model.Description;
                ctx.Categories.Add(category);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Thêm mới dữ liệu thành công"));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id,CategoryModel model)
        {
            try
            {
                var category = await ctx.Categories.FindAsync(id);
                if (category == null) {
                    return BadRequest($"Không tìm thấy dữ liệu có id là: {id}");
                }
                category.CategoryName = model.CategoryName;
                category.Description = model.Description;
                await ctx.SaveChangesAsync();
                return Ok("Cập nhật dữ liệu thành công");
            }
            catch (Exception e) {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> Delete(int id)
        {
            try
            {
                var cate = await ctx.Categories.FindAsync(id);
                if (cate == null)
                {
                    return BadRequest($"Không thấy dữ liệu có id là: {id}");
                }
                ctx.Categories.Remove(cate);
                await ctx.SaveChangesAsync();
                return Ok("Xóa thành công");
            }
            catch (Exception e) {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }
    }
}
