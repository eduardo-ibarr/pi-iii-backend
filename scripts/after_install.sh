#!/bin/bash

# Set ownership and permissions for new project files
chown -R apache:apache /var/www/backend-pi-iii/
chmod -R 755 /var/www/backend-pi-iii/

# Start Apache service
service httpd start
