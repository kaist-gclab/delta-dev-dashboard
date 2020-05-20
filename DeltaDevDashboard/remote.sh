#!/usr/bin/env bash
IMAGE="delta-dev-dashboard-app-server"

: "${DELTA_DEV_DASHBOARD_REDIS_PASSWORD?DELTA_DEV_DASHBOARD_REDIS_PASSWORD}"
: "${DELTA_DEV_DASHBOARD_REDIS_HOST?DELTA_DEV_DASHBOARD_REDIS_HOST}"
: "${DELTA_DEV_DASHBOARD_REDIS_PORT?DELTA_DEV_DASHBOARD_REDIS_PORT}"

(docker stop $IMAGE || true) && \
(docker rm $IMAGE || true) && \
docker run --init -d \
-e Redis__Password=$DELTA_DEV_DASHBOARD_REDIS_PASSWORD \
-e Redis__Hosts__0__Host=$DELTA_DEV_DASHBOARD_REDIS_HOST \
-e Redis__Hosts__0__Port=$DELTA_DEV_DASHBOARD_REDIS_PORT \
--restart=unless-stopped \
--name $IMAGE $IMAGE
