#!/usr/bin/env bash
IMAGE="delta-dev-dashboard-web"

(docker stop $IMAGE || true) && \
(docker rm $IMAGE || true) && \
docker run --init -d \
--restart=unless-stopped \
--name $IMAGE $IMAGE
