#!/usr/bin/env bash
: "${DELTA_DEV_DASHBOARD_REDIS_PASSWORD?DELTA_DEV_DASHBOARD_REDIS_PASSWORD}"
: "${DELTA_DEV_DASHBOARD_REDIS_PORT?DELTA_DEV_DASHBOARD_REDIS_PORT}"

docker run -d \
-p $DELTA_DEV_DASHBOARD_REDIS_PORT:6379 \
--name delta-dev-dashboard-redis \
--restart=unless-stopped \
redis:7 \
--requirepass $DELTA_DEV_DASHBOARD_REDIS_PASSWORD
