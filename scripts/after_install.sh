#!/bin/bash

chown -R apache:apache /var/www/backend-pi-iii/
chmod -R 755 /var/www/backend-pi-iii/

service httpd start
npm start
