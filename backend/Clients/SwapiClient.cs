using System.Net.Http.Json;

namespace StarWarsBff.Clients;

public class SwapiClient
{
    private readonly HttpClient _httpClient;

    public SwapiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<T?> GetAsync<T>(string endpoint)
    {
        return await _httpClient.GetFromJsonAsync<T>(endpoint);
    }
}