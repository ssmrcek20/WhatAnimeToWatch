FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-dotnet
WORKDIR /src/dotnet
COPY ["Backend/Backend.csproj", "."]
RUN dotnet restore "./Backend.csproj"
COPY Backend .
WORKDIR "/src/dotnet/."
RUN dotnet build "Backend.csproj" -c Release -o /app/build

FROM build-dotnet AS publish-dotnet
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish-dotnet /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "Backend.dll"]