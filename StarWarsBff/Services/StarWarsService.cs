using System.Text.Json.Nodes;
using StarWarsBff.Clients;
using StarWarsBff.Dtos;

namespace StarWarsBff.Services;

public class StarWarsService : IStarWarsService
{
  private readonly SwapiClient _swapiClient;
  
  public StarWarsService(SwapiClient swapiClient)
  {
    _swapiClient = swapiClient;
  }

  public async Task<IEnumerable<StarshipDto>> GetAllStarshipsAsync()
  {
    var response = await _swapiClient.GetAsync<JsonObject>($"starships/?expanded=true");

    if (response?["results"] is JsonArray starshipArray)
    {
      return starshipArray.Select(starship => new StarshipDto
      {
        Id = int.Parse(starship["uid"]?.ToString() ?? "0"),
        Name = starship["properties"]?["name"]?.ToString() ?? "",
        Model = starship["properties"]?["model"]?.ToString() ?? "",
        Manufacturer = starship["properties"]?["manufacturer"]?.ToString() ?? "",
        StarshipClass = starship["properties"]?["starship_class"]?.ToString() ?? "",
        CostInCredits = starship["properties"]?["cost_in_credits"]?.ToString() ?? ""
      });
    }

    return Enumerable.Empty<StarshipDto>();
  }

  public async Task<StarshipDto?> GetStarShipByIdAsync(int id)
  {
    var response = await _swapiClient.GetAsync<JsonObject>($"starships/{id}/");

    if (response?["result"]?["properties"] is JsonObject props)
    {
      return new StarshipDto
      {
        Name = props["name"]?.ToString() ?? "",
        Model = props["model"]?.ToString() ?? "",
        Manufacturer = props["manufacturer"]?.ToString() ?? "",
        StarshipClass = props["starship_class"]?.ToString() ?? ""
      };
    }

    return null;
  }
}