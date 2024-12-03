﻿using Back_End_Shop_Fruit.Data;
using Back_End_Shop_Fruit.Model.Entity;
using Back_End_Shop_Fruit.Model.ViewModel;
using Back_End_Shop_Fruit.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using X.PagedList.Extensions;

namespace Back_End_Shop_Fruit.Controllers
{
    [ApiController]
    [Route("/api/banner")]
    public class BannerController : Controller
    {
        private readonly ShopDbContext ctx;
        public BannerController(ShopDbContext ctx) 
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public async Task<ActionResult> Index(string? name, string? sort, int page = 1)
        {
            var ban = await ctx.Banners.OrderByDescending(x => x.BannerId).ToListAsync();
            if (!string.IsNullOrEmpty(name))
            {
                ban = await ctx.Banners.Where(x => x.BannerName.Contains(name)).ToListAsync();
            }
            int limit = 10;
            page = page <= 1 ? 1 : page;
            var pageData = ban.ToPagedList(page, limit);
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", pageData));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var ban = await ctx.Banners.FindAsync(id);
            if (ban == null)
            {
                return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
            }
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", ban));
        }

        [HttpGet("getbanner")]
        public async Task<ActionResult> getByBanner()
        {
            var ban = await ctx.Banners.OrderByDescending(x => x.BannerId).Take(1).ToListAsync();
            return Ok(new ResponseObject(200, "Lấy ra dữ liệu thành công!!!", ban));
        }


        [HttpPost]
        public async Task<ActionResult> Save([FromForm] BannerModel model)
        {
            try
            {
                Banner banner = new Banner();

                if (model.ImageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "banner");
                    var filePath = Path.Combine(uploadsFolder, model.ImageFile.FileName);

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.ImageFile.CopyToAsync(fileStream);
                    }

                    banner.Image = $"http://{HttpContext.Request.Host.Value}/uploads/banner/{model.ImageFile.FileName}";
                }

                banner.BannerName = model.BannerName;
                banner.Description = model.Description;
                ctx.Banners.Add(banner);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Thêm mới thành công"));
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseObject(500, "Lỗiiiii."));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromForm] BannerModel model)
        {
            try
            {
                var ban = ctx.Banners.Find(id);
                if (ban == null)
                {
                    return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
                }


                if (model.ImageFile != null && model.ImageFile.Length > 0)
                {
                    // Đường dẫn lưu hình ảnh mới
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "banner");
                    var newFilePath = Path.Combine(uploadsFolder, model.ImageFile.FileName);

                    // Xóa hình ảnh cũ nếu tồn tại
                    if (!string.IsNullOrEmpty(model.OldImage))
                    {
                        var oldFileName = model.OldImage.Split($"{HttpContext.Request.Host.Value}/uploads/banner/").LastOrDefault();
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

                    ban.Image = $"http://{HttpContext.Request.Host.Value}/uploads/banner/{model.ImageFile.FileName}";
                }
                else
                {
                    // Nếu không có hình ảnh mới, giữ nguyên hình ảnh cũ
                    ban.Image = model.OldImage;
                }

                ban.BannerName = model.BannerName;
                ban.Description = model.Description;
                ctx.Banners.Update(ban);
                await ctx.SaveChangesAsync();
                return Ok(new ResponseObject(200, "Cập nhật dữ liệu thành công"));
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
                var ban = await ctx.Banners.FindAsync(id);
                if (ban == null)
                {
                    return BadRequest($"Không tìm thấy id có dữ liệu là: {id}");
                }
                ctx.Banners.Remove(ban);
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
