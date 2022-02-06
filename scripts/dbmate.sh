#!/bin/bash

set -e

UNAME_S=$(uname -s)
UNAME_P=$(uname -p)

case "${UNAME_S}" in
Linux)
  OS=linux
  ;;
Darwin)
  OS=macos
  ;;
esac

case "${UNAME_P}" in
*86)
  ARCH=amd64
  ;;
x86_64)
  ARCH=amd64
  ;;
arm*)
  ARCH=arm64
  ;;
esac

DBMATE_BINARY="dbmate-${OS}-${ARCH}"

DBMATE="${PWD}/db/bin/${DBMATE_BINARY}"

if [[ ! -f "${DBMATE}" ]]; then
  curl --create-dirs -fsSL -o "${DBMATE}" "https://github.com/amacneil/dbmate/releases/latest/download/${DBMATE_BINARY}"
  chmod +x "${DBMATE}"
fi

run() {
  eval "${DBMATE} --url ${DSN} ${@}"
}
