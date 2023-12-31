FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine as builder
WORKDIR /app

COPY *.sln .
COPY DeltaDevDashboard.AppServer/*.csproj ./DeltaDevDashboard.AppServer/
RUN dotnet restore --runtime linux-musl-x64

COPY . .
WORKDIR /app/DeltaDevDashboard.AppServer
RUN dotnet publish --self-contained --configuration Release --runtime linux-musl-x64 -o out --no-restore

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine
WORKDIR /app
COPY --from=builder /app/DeltaDevDashboard.AppServer/out .
EXPOSE 80
ENTRYPOINT ["./DeltaDevDashboard.AppServer"]
