docker rm -f install_frontend
docker run \
    --name install_frontend \
    -v "/$(pwd)/frontend/app:/home" \
    -w '/home' node:stretch npm ci