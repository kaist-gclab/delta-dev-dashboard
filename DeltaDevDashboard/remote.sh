#!/usr/bin/env bash
: "${DELTA_DEV_DASHBOARD_REDIS_PASSWORD?DELTA_DEV_DASHBOARD_REDIS_PASSWORD}"
: "${DELTA_DEV_DASHBOARD_REDIS_HOST?DELTA_DEV_DASHBOARD_REDIS_HOST}"
: "${DELTA_DEV_DASHBOARD_REDIS_PORT?DELTA_DEV_DASHBOARD_REDIS_PORT}"

sudo docker load --input docker-image.tar && \
(sudo docker stop delta-dev-dashboard-app-server || true) && \
(sudo docker rm delta-dev-dashboard-app-server || true) && \
sudo docker run -d --restart=unless-stopped \
-e Redis__Password=$DELTA_DEV_DASHBOARD_REDIS_PASSWORD \
-e Redis__Hosts__0__Host=$DELTA_DEV_DASHBOARD_REDIS_HOST \
-e Redis__Hosts__0__Port=$DELTA_DEV_DASHBOARD_REDIS_PORT \
--name delta-dev-dashboard-app-server delta-dev-dashboard-app-server && \
rm docker-image.tar
