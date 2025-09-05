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
  public async Task<ActionResult<IEnumerable<StarshipDto>>> GetAllStarships([FromQuery] StarshipListRequest request)
  {
    var starships = await _starWarsService.GetAllStarshipsAsync(request.Manufacturer);
    return Ok(starships);
  }
}