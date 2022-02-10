#!/bin/sh

set -e

./cockroach start-single-node --insecure &

START_PID=$!

sleep 3

./cockroach sql --insecure --execute "create role lukeandjadi_com with login" || echo

wait "${START_PID}"
