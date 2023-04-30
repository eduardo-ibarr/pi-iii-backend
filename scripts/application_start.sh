#!/bin/bash

cd /var/www/backend-pi-iii/
npm install

nohup npm start > app.log 2>&1 &

exit 0
