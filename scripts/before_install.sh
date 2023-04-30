#!/bin/bash

if lsof -i :3333; then
    kill -9 $(lsof -t -i :3333)
fi

if ! systemctl status httpd | grep active; then
    systemctl start httpd
fi

rm -rf /var/www/backend-pi-iii
mkdir -p /var/www/backend-pi-iii