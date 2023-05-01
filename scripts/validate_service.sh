#!/bin/bash

set -e

API_PORT=3333
HTTP_PORT=80

# Check if the api is listening on the expected port
if lsof -Pi :$API_PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "API is running on port $API_PORT"
else
    echo "ERROR: API is not running on port $API_PORT"
    exit 1
fi

# Check if the http server is listening on the expected port
if lsof -Pi :$HTTP_PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "HTTP server is running on port $HTTP_PORT"
else
    echo "ERROR: HTTP server is not running on port $HTTP_PORT"
    exit 1
fi

# Check if the server is responding with HTTP 200 OK
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$API_PORT)
if [ $RESPONSE -eq 200 ]; then
    echo "Service is responding correctly on port $API_PORT"
else
    echo "ERROR: Service is not responding correctly on port $API_PORT"
    exit 1
fi

exit 0
