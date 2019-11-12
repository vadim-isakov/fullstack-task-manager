docker rm -f build_frontend
docker run \
    --name build_frontend \
    -v "/$(pwd)/frontend/app:/home" \
    -w '/home' node:stretch npm run build