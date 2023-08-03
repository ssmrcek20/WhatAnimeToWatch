using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Backend.Data;

string databaseKey = Environment.GetEnvironmentVariable("DatabaseConnectionString");
var builder = WebApplication.CreateBuilder(args);
if (databaseKey == null)
{
    builder.Services.AddDbContext<AnimeContext>(options =>
        options.UseNpgsql(builder.Configuration["DatabaseConnectionString"] ?? throw new InvalidOperationException("Connection string 'AnimeContext' not found.")));
}
else
{
    builder.Services.AddDbContext<AnimeContext>(options =>
        options.UseNpgsql(databaseKey ?? throw new InvalidOperationException("Connection string 'AnimeContext' not found.")));
}
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
string ApiKey = builder.Configuration["X-MAL-CLIENT-ID"] ?? throw new InvalidOperationException("API key 'X-MAL-CLIENT-ID' not found.");
builder.Services.AddSingleton(ApiKey);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    string parentDirectory = Directory.GetParent(builder.Environment.ContentRootPath).FullName;
    string externalFolder = Path.Combine(parentDirectory, "Frontend\\dist\\frontend");
    app.UseFileServer(new FileServerOptions
    {
        FileProvider = new PhysicalFileProvider(externalFolder),
        RequestPath = "",
        EnableDefaultFiles = true
    });
}
else if (app.Environment.IsProduction())
{
    app.UseFileServer(new FileServerOptions
    {
        FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "wwwroot")),
        RequestPath = "",
        EnableDefaultFiles = true
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
