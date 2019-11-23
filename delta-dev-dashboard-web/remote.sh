sudo docker load --input docker-image.tar && \
(sudo docker stop delta-dev-dashboard-web || true) && \
(sudo docker rm delta-dev-dashboard-web || true) && \
sudo docker run -d --restart=unless-stopped \
--name delta-dev-dashboard-web delta-dev-dashboard-web && \
rm docker-image.tar
