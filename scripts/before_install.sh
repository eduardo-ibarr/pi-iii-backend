#!/bin/bash

# Stop Apache service
service httpd stop

# Remove old project files
rm -rf /var/www/backend-pi-iii/*
