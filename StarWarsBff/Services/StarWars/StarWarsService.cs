using StarWarsBff.Dtos;

namespace StarWarsBff.Services;

public class StarWarsService : IStarWarsService
{
  public StarWarsService()
  {
  }

  public Task<IEnumerable<CharacterDto>> GetAllCharactersAsync()
  {
    throw new NotImplementedException();
  }

  public Task<CharacterDto?> GetCharacterByIdAsync(int id)
  {
    throw new NotImplementedException();
  }
}