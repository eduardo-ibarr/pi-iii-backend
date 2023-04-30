#!/bin/bash

cd /var/www/backend-pi-iii/
npm install

screen -d -m npm start

exit 0
