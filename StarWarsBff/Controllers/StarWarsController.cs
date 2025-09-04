using Microsoft.AspNetCore.Mvc;
using StarWarsBff.Dtos;
using StarWarsBff.Services;

namespace StarWarsBff.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StarWarsController : ControllerBase
{
    private readonly IStarWarsService _starWarsService;

    public StarWarsController(IStarWarsService starWarsService)
    {
        _starWarsService = starWarsService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CharacterDto>>> GetAllCharacters()
    {
        var characters = await _starWarsService.GetAllCharactersAsync();
        return Ok(characters);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CharacterDto>> GetCharacterById(int id)
    {
        var character = await _starWarsService.GetCharacterByIdAsync(id);
        if (character == null)
        {
            return NotFound();
        }
        return Ok(character);
    }
}