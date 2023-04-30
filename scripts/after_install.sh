#!/bin/bash

chown -R apache:apache /var/www/backend-pi-iii/
chmod -R 755 /var/www/backend-pi-iii/

service httpd start

cd /var/www/backend-pi-iii
npm start
