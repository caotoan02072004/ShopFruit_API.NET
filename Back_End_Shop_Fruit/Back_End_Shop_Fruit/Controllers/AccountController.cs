using Back_End_Shop_Fruit.Data;
using Back_End_Shop_Fruit.Model.Entity;
using Back_End_Shop_Fruit.Model.ViewModel;
using Back_End_Shop_Fruit.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Shop_Fruit.Controllers
{
    [ApiController]
    [Route("/api/account")]
    public class AccountController : Controller
    {
        private readonly ShopDbContext ctx;
        public AccountController(ShopDbContext ctx)
        {
            this.ctx = ctx;
        }


        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var acc = await ctx.Accounts
                .OrderByDescending(x => x.AccountId)
                .ToListAsync();
            return Ok(new ResponseObject(200, "Truy vấn dữ liệu thành công", acc));
        }

        //[Authorize(Roles = "Admin, User")]
        [HttpPost]
        public async Task<ActionResult> Save([FromForm] AccountModel model)
        {
            try
            {
                Account account = new Account();

                if (model.ImageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "account");
                    var filePath = Path.Combine(uploadsFolder, model.ImageFile.FileName);

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.ImageFile.CopyToAsync(fileStream);
                    }

                    account.Avatar = $"http://{HttpContext.Request.Host.Value}/uploads/account/{model.ImageFile.FileName}";
                }
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password, 12);
                account.FullName = model.FullName;
                account.Email  = model.Email;
                account.Address = model.Address;
                account.Password = passwordHash;
                account.Phone = model.Phone;
                account.Role = model.Role;
                ctx.Accounts.Add(account);
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
            var pro = await ctx.Products.FindAsync(id);
            if(pro == null)
            {
                return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
            }
            return Ok(pro);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromForm] AccountModel model)
        {
            try
            {
                var account = await ctx.Accounts.FindAsync(id);
                if (account == null)
                {
                     return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
                }

                if (model.ImageFile != null && model.ImageFile.Length > 0)
                {
                    // Đường dẫn lưu hình ảnh mới
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "account");
                    var newFilePath = Path.Combine(uploadsFolder, model.ImageFile.FileName);

                    // Xóa hình ảnh cũ nếu tồn tại
                    if (!string.IsNullOrEmpty(model.OldImage))
                    {
                        var oldFileName = model.OldImage.Split($"{HttpContext.Request.Host.Value}/uploads/account/").LastOrDefault();
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

                    account.Avatar = $"http://{HttpContext.Request.Host.Value}/uploads/account/{model.ImageFile.FileName}";
                }
                else
                {
                    // Nếu không có hình ảnh mới, giữ nguyên hình ảnh cũ
                    account.Avatar = model.OldImage;
                }
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password, 12);
                account.FullName = model.FullName;
                account.Email = model.Email;
                account.Address = model.Address;
                account.Password = passwordHash;
                account.Phone = model.Phone;
                account.Role = model.Role;
                ctx.Accounts.Update(account);
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
                var acc = await ctx.Accounts.FindAsync(id);
                if (acc == null)
                {
                    return StatusCode(404, new ResponseObject(404, $"Không tìm thấy sản phẩm có id là: {id}"));
                }
                ctx.Accounts.Remove(acc);
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
