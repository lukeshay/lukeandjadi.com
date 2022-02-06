#!/bin/bash

. ./scripts/dbmate.sh

run --migrations-dir ${PWD}/db/seeds migrate
