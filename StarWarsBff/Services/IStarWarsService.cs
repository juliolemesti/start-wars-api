using StarWarsBff.Dtos;

namespace StarWarsBff.Services;

public interface IStarWarsService
{

  Task<IEnumerable<StarshipDto>> GetAllStarshipsAsync();
  Task<StarshipDto?> GetStarShipByIdAsync(int id);
}