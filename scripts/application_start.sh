#!/bin/bash

cd /var/www/backend-pi-iii/
npm install

# Executa a aplicação em segundo plano e redireciona a saída para o arquivo "app.log"
nohup npm start > app.log 2>&1 &

exit 0
