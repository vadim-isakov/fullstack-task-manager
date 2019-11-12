docker-compose -f docker-compose.test.dev.yml rm --force
docker-compose -f docker-compose.test.dev.yml build
docker-compose -f docker-compose.test.dev.yml up --abort-on-container-exit