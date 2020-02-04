#!/usr/bin/env bash
docker load --input docker-image.tar && \
(docker stop delta-dev-dashboard-web || true) && \
(docker rm delta-dev-dashboard-web || true) && \
docker run -d --restart=unless-stopped \
--name delta-dev-dashboard-web delta-dev-dashboard-web && \
rm docker-image.tar
