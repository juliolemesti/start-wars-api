using System.Text.Json.Nodes;
using StarWarsBff.Clients;
using StarWarsBff.Dtos;

namespace StarWarsBff.Services;

public class StarWarsService : IStarWarsService
{
  private readonly SwapiClient _swapiClient;
  private readonly ILogger<StarWarsService> _logger;

  public StarWarsService(SwapiClient swapiClient, ILogger<StarWarsService> logger)
  {
    _swapiClient = swapiClient;
    _logger = logger;
  }

  public async Task<IEnumerable<StarshipDto>> GetAllStarshipsAsync(string manufacturer)
  {
    var allStarships = new List<StarshipDto>();
    string? nextUrl = "starships/?expanded=true";


    while (!string.IsNullOrEmpty(nextUrl))
    {

      var response = await _swapiClient.GetAsync<SwapiResponse<SwapiStarship>>(nextUrl);


      if (response?.Results is { Count: > 0 })
      {
        allStarships.AddRange(response.Results.Select(s => new StarshipDto
        {
          Id = int.Parse(s.Uid),
          Name = s.Properties.Name,
          Model = s.Properties.Model,
          Manufacturer = s.Properties.Manufacturer,
          StarshipClass = s.Properties.Starship_Class,
          CostInCredits = s.Properties.Cost_In_Credits
        }));
      }
      else
      {
        _logger.LogWarning("No starships found on this page.");
      }

      nextUrl = response?.Next;
    }


    if (!string.IsNullOrEmpty(manufacturer))
    {
      allStarships = allStarships
          .Where(s => s.Manufacturer.Contains(manufacturer, StringComparison.OrdinalIgnoreCase))
          .ToList();

    }

    return allStarships;
  }
}