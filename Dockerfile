# Étape 1 : Utiliser l'image SDK pour compiler l'application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copier les fichiers de projet et restaurer les dépendances
COPY ["MonBackendApp/MonBackendApp.csproj", "MonBackendApp/"]
RUN dotnet restore "MonBackendApp/MonBackendApp.csproj"

# Copier le reste des fichiers et construire l'application
COPY . .
WORKDIR "/src/MonBackendApp"
RUN dotnet build "MonBackendApp.csproj" -c Release -o /app/build

# Étape 2 : Publier l'application
FROM build AS publish
RUN dotnet publish "MonBackendApp.csproj" -c Release -o /app/publish

# Étape 3 : Créer l'image finale avec l'image runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MonBackendApp.dll"]
