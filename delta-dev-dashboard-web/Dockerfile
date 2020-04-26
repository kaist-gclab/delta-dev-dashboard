# https://dev.to/avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-1f3n

FROM node:14 as builder
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM abiosoft/caddy:no-stats
ENV CADDYPATH /root/caddy
ENV ACME_AGREE true
ENV ENABLE_TELEMETRY false
COPY Caddyfile /etc/Caddyfile
COPY auth /etc/auth
COPY --from=builder /app/build /app
