#!/bin/bash

set -e

# Kill the screen session running the server
echo "Stopping API screen session"
screen -X -S backend quit

# Stop server
echo "Stopping HTTP server"
systemctl stop httpd

exit 0
