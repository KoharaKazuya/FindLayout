#!/bin/sh

set -eu

docker build -t findlayout .
docker run -d -p 80:8888 --name findlayout findlayout
