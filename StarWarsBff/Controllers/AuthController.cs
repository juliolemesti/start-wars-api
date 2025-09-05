// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StarWarsBff.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StarWarsBff.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDto request)
    {
        // Exemplo: validação simples (substituir por banco de dados)
        if (request.Username != "luke" || request.Password != "force123")
            return Unauthorized();

        var jwtConfig = _config.GetSection("Jwt");
        var key = Encoding.ASCII.GetBytes(jwtConfig["Key"]!);

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.Name, request.Username),
                new Claim(ClaimTypes.Role, "Jedi")
            ]),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = jwtConfig["Issuer"],
            Audience = jwtConfig["Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);

        return Ok(new { token = jwt, username = request.Username });
    }
}