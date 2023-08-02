using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
