FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-dotnet
WORKDIR /src/dotnet
COPY ["Backend/Backend.csproj", "."]
RUN dotnet restore "./Backend.csproj"
COPY Backend .
WORKDIR "/src/dotnet/."
RUN dotnet build "Backend.csproj" -c Release -o /app/build

FROM build-dotnet AS publish-dotnet
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM node:18-alpine AS build-angular
WORKDIR /app/angular
COPY ["Frontend/package*.json", "./"]
RUN npm install -g @angular/cli
RUN npm install
COPY Frontend .
RUN ng build

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish-dotnet /app/publish .
COPY --from=build-angular /app/angular/dist/frontend ./wwwroot
EXPOSE 80
ENTRYPOINT ["dotnet", "Backend.dll"]