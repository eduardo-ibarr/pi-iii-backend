#!/bin/bash

set -e

APP_DIR="/var/www/backend-pi-iii"
PORT=3333
MAX_RETRIES=10

# Change to application directory
cd $APP_DIR

# Install dependencies
echo "Installing dependencies"
npm install

# Start the server in a screen session
echo "Starting server in a screen session"
screen -d -m -S backend npm start
sleep 5

# Wait for server to start
echo "Waiting for server to start"

for (( i=0; i<$MAX_RETRIES; i++ ))
do
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT)
    if [ $RESPONSE -eq 200 ]; then
        echo "Server started successfully"
        exit 0
    else
        echo "Server not yet ready, waiting..."
        sleep 5
    fi
done

echo "Server failed to start after $MAX_RETRIES attempts"
exit 1
