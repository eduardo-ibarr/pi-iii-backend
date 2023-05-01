#!/bin/bash

set -e

APP_DIR="/var/www/backend-pi-iii"
PORT=3333
MAX_RETRIES=10

# Change to application directory
cd $APP_DIR

# Install dependencies
echo "Installing dependencies"
npm install -g forever
npm install

# Stop server using forever
echo "Stopping HTTP server"
forever stopall

# Start the server with forever
echo "Starting server with forever"
forever start -c "npm start" ./

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
