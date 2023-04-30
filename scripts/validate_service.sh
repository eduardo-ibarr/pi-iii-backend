#!/bin/bash

PORT=3333

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null; then
  echo "Serviço está em execução na porta $PORT"
else
  echo "ERRO: Serviço não está em execução na porta $PORT"
  exit 1
fi

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT)
if [ $RESPONSE -eq 200 ]; then
  echo "Serviço está respondendo corretamente na porta $PORT"
else
  echo "ERRO: Serviço não está respondendo corretamente na porta $PORT"
  exit 1
fi

exit 0
