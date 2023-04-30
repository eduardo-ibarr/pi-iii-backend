#!/bin/bash

set -e

# Kill any processes running on port 3333
if lsof -Pi :3333 -sTCP:LISTEN -t >/dev/null ; then
    echo "Killing processes running on port 3333"
    kill $(lsof -t -i:3333)
fi

# Start Apache web server if not already running
if ! systemctl status httpd | grep active; then
    echo "Starting Apache web server"
    systemctl start httpd
fi

# Remove existing project directory
if [ -d /var/www/backend-pi-iii ]; then
    echo "Removing existing project directory"
    rm -rf /var/www/backend-pi-iii
fi

# Create project directory
echo "Creating project directory"
mkdir -p /var/www/backend-pi-iii

exit 0
