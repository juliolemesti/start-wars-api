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

      var response = await _swapiClient.GetAsync<JsonObject>(nextUrl);

      if (response?["results"] is JsonArray starshipArray)
      {

        allStarships.AddRange(starshipArray.Select(starship => new StarshipDto
        {
          Id = int.Parse(starship["uid"]?.ToString() ?? "0"),
          Name = starship["properties"]?["name"]?.ToString() ?? "",
          Model = starship["properties"]?["model"]?.ToString() ?? "",
          Manufacturer = starship["properties"]?["manufacturer"]?.ToString() ?? "",
          StarshipClass = starship["properties"]?["starship_class"]?.ToString() ?? "",
          CostInCredits = starship["properties"]?["cost_in_credits"]?.ToString() ?? ""
        }));
      }
      else
      {
        _logger.LogWarning("No starships found on this page.");
      }

      nextUrl = response?["next"]?.ToString();
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