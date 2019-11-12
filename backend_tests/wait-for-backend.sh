#!/bin/sh
# wait-for-db.sh

set -e

cmd="$@"

TIMEOUT=10

response=""
while [ -z "$response" ]; do

echo "Checking backend state..."
response=`curl -Is $BACKEND_URL | head -1`

if [ -z "$response" ]; then
    >&2 echo "Backend is not ready"
    >&2 echo "Timeout is $TIMEOUT"
    sleep $TIMEOUT
fi
done
>&2 echo "Backend is up"
exec $cmd
