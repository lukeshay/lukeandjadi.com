#!/bin/bash

URL=https://api.clerk.dev/v1

curl ${URL}/beta_features/instance_settings \
  -X PATCH \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-type: application/json" \
  --data '{ "restricted_to_allowlist": true }'

curl ${URL}/allowlist_identifiers \
  -X POST \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-type: application/json" \
  --data "{ \"identifier\": \"${1}\", \"notify\": true }"
