using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Backend.Data;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
string databaseKey = Environment.GetEnvironmentVariable("DatabaseConnectionString");
var builder = WebApplication.CreateBuilder(args);

if (databaseKey == null)
{
    builder.Services.AddDbContext<AnimeContext>(options => options.UseNpgsql(builder.Configuration["DatabaseConnectionString"] ?? throw new InvalidOperationException("Connection string 'AnimeContext' not found.")));

    string ApiKey = builder.Configuration["X-MAL-CLIENT-ID"] ?? throw new InvalidOperationException("API key 'X-MAL-CLIENT-ID' not found.");
    builder.Services.AddSingleton(ApiKey);
}
else
{
    builder.Services.AddDbContext<AnimeContext>(options => options.UseNpgsql(databaseKey ?? throw new InvalidOperationException("Connection string 'AnimeContext' not found.")));

    string apiKey = Environment.GetEnvironmentVariable("X-MAL-CLIENT-ID");
    builder.Services.AddSingleton(apiKey);
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("whatanimetowatch.onrender.com")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

var app = builder.Build();


app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseCors(MyAllowSpecificOrigins);


app.UseAuthorization();

app.MapControllers();

app.Run();
