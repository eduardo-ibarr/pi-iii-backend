#!/bin/bash

set -e

PORT=3333

# Check if the server is listening on the expected port
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Service is running on port $PORT"
else
    echo "ERROR: Service is not running on port $PORT"
    exit 1
fi

# Check if the server is responding with HTTP 200 OK
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT)
if [ $RESPONSE -eq 200 ]; then
    echo "Service is responding correctly on port $PORT"
else
    echo "ERROR: Service is not responding correctly on port $PORT"
    exit 1
fi

exit 0
