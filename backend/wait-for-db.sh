#!/bin/sh
# wait-for-db.sh

set -e

cmd="$@"

TIMEOUT=10

connected=0
while [ $connected = 0 ]; do
echo "Checking database state..."
connected=`python << END    
import MySQLdb
try:
    MySQLdb.connect(host="db",port=3306,passwd="$MYSQL_ROOT_PASSWORD",db="$MYSQL_DATABASE")
    print(1)
except:
    print(0)
END`
if [ $connected = 0 ]; then
    >&2 echo "Database is not ready"
    >&2 echo "Timeout is $TIMEOUT"
    sleep $TIMEOUT
fi
done
>&2 echo "Database is up"
exec $cmd