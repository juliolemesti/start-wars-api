using StarWarsBff.Services;
using StarWarsBff.Clients;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<IStarWarsService, StarWarsService>();

// Add HttpClient for external SWAPI
builder.Services.AddHttpClient<SwapiClient>(client =>
{
    client.BaseAddress = new Uri("https://swapi.tech/api/");
});

// Configure CORS for frontend
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend",
    policy =>
    {
      policy.WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();
