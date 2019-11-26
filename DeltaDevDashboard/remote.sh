#!/usr/bin/env bash
sudo docker load --input docker-image.tar && \
(sudo docker stop delta-dev-dashboard-app-server || true) && \
(sudo docker rm delta-dev-dashboard-app-server || true) && \
sudo docker run -d --restart=unless-stopped \
--name delta-dev-dashboard-app-server delta-dev-dashboard-app-server && \
rm docker-image.tar
