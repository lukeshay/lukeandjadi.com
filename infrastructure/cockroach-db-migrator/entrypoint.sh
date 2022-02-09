#!/bin/sh

set -e

sleep 5

make schema-migrate
make seed-migrate
