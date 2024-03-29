#!/usr/bin/env bash
IMAGE="delta-dev-dashboard-app-server"
REMOTE="gclab-beta"

docker save $IMAGE | lz4 | ssh $REMOTE "lz4 -dc | docker load" && \
cat remote.sh | ssh $REMOTE
