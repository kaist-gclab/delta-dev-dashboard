FROM mcr.microsoft.com/dotnet/core/sdk:3.0 as builder
COPY . /app
WORKDIR /app/DeltaDevDashboard.AppServer
RUN dotnet publish --self-contained --configuration Release --runtime linux-musl-x64 -o out

FROM mcr.microsoft.com/dotnet/core/runtime-deps:3.0-alpine
WORKDIR /app
COPY --from=builder /app/DeltaDevDashboard.AppServer/out .
EXPOSE 80
ENTRYPOINT ["./DeltaDevDashboard.AppServer"]
