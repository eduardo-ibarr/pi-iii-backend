#!/bin/bash

set -e

# Change ownership of project directory
echo "Changing ownership of project directory"
chown -R apache:apache /var/www/backend-pi-iii

# Set permissions for project directory
echo "Setting permissions for project directory"
chmod -R 755 /var/www/backend-pi-iii

# Start Apache web server if not already running
if ! systemctl status httpd | grep active; then
    echo "Starting Apache web server"
    systemctl start httpd
fi

exit 0
