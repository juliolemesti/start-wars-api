public class SwapiResponse<T>
{
    public List<T> Results { get; set; } = new();
    public string? Next { get; set; }
}

public class SwapiStarship
{
    public string Uid { get; set; } = "";
    public StarshipProperties Properties { get; set; } = new();
}

public class StarshipProperties
{
    public string Name { get; set; } = "";
    public string Model { get; set; } = "";
    public string Manufacturer { get; set; } = "";
    public string Starship_Class { get; set; } = "";
    public string Cost_In_Credits { get; set; } = "";
}