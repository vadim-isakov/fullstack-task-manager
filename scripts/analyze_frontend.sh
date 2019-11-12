docker rm -f analyze_frontend
docker run \
    --name analyze_frontend \
    -v "/$(pwd)/frontend/app:/home" \
    -w '/home' node:stretch npm run analyze