#!/bin/bash

# Set the project root directory
cd /var/www/html/backend-pi-iii

# Install dependencies
npm install

# Stop the application, if it's running
if pm2 status | grep -q backend-pi-iii; then
  pm2 stop backend-pi-iii
fi

# Start the application with PM2
pm2 start npm --name "backend-pi-iii" -- start
