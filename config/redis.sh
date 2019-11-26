#!/usr/bin/env bash
: "${DELTA_DEV_DASHBOARD_REDIS_PASSWORD?DELTA_DEV_DASHBOARD_REDIS_PASSWORD}"

docker run -d \
-p 10561:6379 \
--name delta-dev-dashboard-redis \
--restart=unless-stopped \
redis:5 \
--requirepass $DELTA_DEV_DASHBOARD_REDIS_PASSWORD
