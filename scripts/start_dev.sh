docker-compose -f docker-compose.dev.yml rm --force
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up