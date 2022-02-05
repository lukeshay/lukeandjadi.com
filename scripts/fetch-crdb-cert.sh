#!/bin/bash

CLUSTER_ID="${CLUSTER_ID:-1}"

curl --create-dirs -o "${PWD}/db/certs/root.crt" -O "https://cockroachlabs.cloud/clusters/${CLUSTER_ID}/cert"
