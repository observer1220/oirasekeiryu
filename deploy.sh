#!/bin/sh

set -e

git add .
git commit -m "deploy $(date +'%Y-%m-%d %H:%M:%S')"
git push -u origin master

exec "$@"