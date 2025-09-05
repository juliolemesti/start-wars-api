using StarWarsBff.Dtos;

namespace StarWarsBff.Services;

public interface IStarWarsService
{
  Task<IEnumerable<StarshipDto>> GetAllStarshipsAsync(string manufacturer);
}