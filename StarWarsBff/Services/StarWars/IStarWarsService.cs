using StarWarsBff.Dtos;

namespace StarWarsBff.Services;

public interface IStarWarsService
{
  Task<IEnumerable<CharacterDto>> GetAllCharactersAsync();
  Task<CharacterDto?> GetCharacterByIdAsync(int id);
}