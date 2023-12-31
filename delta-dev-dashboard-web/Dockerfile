FROM node:20-slim as builder
RUN npm i -g pnpm
RUN mkdir /app
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
RUN pnpm install --offline --prod
RUN pnpm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY auth /etc/caddy/auth
COPY --from=builder /app/build /app
