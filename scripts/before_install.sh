#!/bin/bash

set -e

# Install PM2 globally
echo "Installing PM2 globally"
npm install pm2 -g

# Stop PM2 if it's running
if pm2 status | grep -q online; then
  echo "Stopping PM2"
  pm2 kill
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
