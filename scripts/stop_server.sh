#!/bin/bash

set -e

# Stop server
echo "Stopping HTTP server"
systemctl stop httpd

exit 0
