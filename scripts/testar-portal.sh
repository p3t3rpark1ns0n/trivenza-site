#!/usr/bin/env bash
# teste manual rápido do login do portal (ambiente local)
# uso: bash testar-portal.sh
curl -s -c /tmp/cookies.txt -X POST http://localhost:5000/login \
  -d "usuario=m.alves" \
  -d "senha=log1st1ca22"
echo "login ok, cookie salvo em /tmp/cookies.txt"
