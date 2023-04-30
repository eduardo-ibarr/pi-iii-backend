#!/bin/bash

set -e

cd /var/www/backend-pi-iii

# Install dependencies
echo "Installing dependencies"
npm install

# Start the server in a screen session
echo "Starting server in a screen session"
screen -d -m -S backend npm start
sleep 5

# Wait for server to start
echo "Waiting for server to start"

n=0
until [ $n -ge 10 ]
do
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3333)
    if [ $RESPONSE -eq 200 ]; then
        echo "Server started successfully"
        break
    else
        echo "Server not yet ready, waiting..."
        n=$[$n+1]
        sleep 5
    fi
done

exit 0
