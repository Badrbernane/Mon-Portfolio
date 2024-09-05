using Microsoft.EntityFrameworkCore;
using MonBackendApp.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Ajouter Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My Portfolio API", Version = "v1" });
});

// Add DbContext
builder.Services.AddDbContext<badrDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder
            .WithOrigins("http://localhost:4200", "https://adorable-gumption-345b41.netlify.app/")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configurer le pipeline de requêtes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // Activer middleware pour servir les fichiers JSON Swagger générés
    app.UseSwagger();
    // Activer middleware pour servir l'interface Swagger UI
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Portfolio API V1");
        c.RoutePrefix = string.Empty; // Pour accéder à Swagger UI à la racine de l'application (http://localhost:<port>/)
    });
}

// Ajouter CORS avant HTTPS redirection
app.UseCors("AllowLocalhost");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
