#!/usr/bin/env bash
IMAGE="delta-dev-dashboard-app-server"
REMOTE="gclab-beta"

docker save $IMAGE | ssh $REMOTE "docker load" && \
cat remote.sh | ssh $REMOTE
