#!/bin/bash

set -e

# Kill the screen session running the server, if it is running
if pidof screen >/dev/null; then
    echo "Stopping API screen session"
    screen -X -S backend quit
fi

# Stop server
echo "Stopping HTTP server"
systemctl stop httpd

exit 0
