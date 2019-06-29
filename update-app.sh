#!/bin/sh

RED='\033[0;31m'
CYAN='\033[1;36m'
NC='\033[0m' # No Color
NCB='\033[1;30m'
GREEN='\033[0;32m'

cd /opt/app/sales-rf-display

git fetch
git pull origin release



# /usr/bin/npm i
# ng build --prod
npm run --silent build

docker stop nginxbeta80
docker rmi nginxbeta80
#docker run --name nginx80 -p 80:80 -d -v /opt/app/sales-rf-display/dist/sales-rf-display/:/usr/share/nginx/html nginx
docker build --tag nginxbeta80 ./
docker run --name nginxbeta80 -p 80:80 -d --rm nginxbeta80

echo "nginx en el puerto 80 started"
