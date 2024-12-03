using Back_End_Shop_Fruit.Data;
using Back_End_Shop_Fruit.Model.Entity;
using Back_End_Shop_Fruit.Model.ViewModel;
using Back_End_Shop_Fruit.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Back_End_Shop_Fruit.Controllers
{
    [ApiController]
    [Route("/api/auth/")]
    public class AuthController : Controller
    {
        private readonly ShopDbContext ctx;
        private readonly IConfiguration _configuration;
        public AuthController(ShopDbContext ctx, IConfiguration configuration)
        {
            this.ctx = ctx;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel model)
        {
            Account checkUser = null;

            if (!string.IsNullOrEmpty(model.Email))
            {
                checkUser = await ctx.Accounts.FirstOrDefaultAsync(x =>
                            x.Email == model.Email);
            }
            else
            {
                return BadRequest(new ResponseObject(400, "Email or username must be provided."));
            }
           
            if (model == null)
            {
                return BadRequest(new ResponseObject(400, "Invalid request."));
            }
            if (checkUser == null)
            {
                return BadRequest(new ResponseObject(400, "Account does not exist."));
            }

            if (model.Password.Length < 6)
            {
                return BadRequest(new ResponseObject(400, "Password must be longer than 6 characters."));
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, checkUser.Password))
            {
                return BadRequest(new ResponseObject(400, "Incorrect password."));
            }
          
            try
            {
                // Tạo token JWT
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:key"]);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, checkUser.AccountId.ToString()),
                    new Claim(ClaimTypes.Email, checkUser.Email),
                    new Claim(ClaimTypes.Role, checkUser.Role),

                };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new ResponseObject(200, "Login successfully.", new
                {
                    Token = tokenString,
                    User = new
                    {
                        Id = checkUser.AccountId,
                        FullName = checkUser.FullName,
                        Avatar = checkUser.Avatar,
                        Email = checkUser.Email,
                        Phone = checkUser.Phone,
                        Address = checkUser.Address,
                        Role = checkUser.Role,
                    }
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseObject(500, "Internal server error. Please try again later."));
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return BadRequest(new ResponseObject(400, "Invalid request."));
            }
            if (model.Password.Length < 6)
            {
                return BadRequest(new ResponseObject(400, "Password must be longer than 6 characters !"));
            }
            try
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password, 12);
                Account user = new Account
                {
                    FullName = model.FullName,
                    Email = model.Email,
                    Password = passwordHash,
                    Role = model.Role
                };
                await ctx.Accounts.AddAsync(user);
                await ctx.SaveChangesAsync();
                // lấy userId vừa tạo
               
                return Ok(new ResponseObject(200, "Register successfully,please check email!", model));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseObject(500, "Internal server error. Please try again later."));
            }
        }
    }
}
