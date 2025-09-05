namespace StarWarsBff.Dtos;

public class StarshipDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Model { get; set; } = string.Empty;
  public string Manufacturer { get; set; } = string.Empty;
  public string StarshipClass { get; set; } = string.Empty;
  public string CostInCredits { get; set; } = string.Empty;
}