using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarWarsBff.Dtos;
using StarWarsBff.Services;

namespace StarWarsBff.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StarshipsController : ControllerBase
{
    private readonly IStarWarsService _starWarsService;

    public StarshipsController(IStarWarsService starWarsService)
    {
        _starWarsService = starWarsService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StarshipDto>>> GetAllStarships()
    {
        var starships = await _starWarsService.GetAllStarshipsAsync();
        return Ok(starships);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StarshipDto>> GetStarshipById(int id)
    {
        var starship = await _starWarsService.GetStarShipByIdAsync(id);
        if (starship == null)
        {
            return NotFound();
        }
        return Ok(starship);
    }
}