docker-compose -f docker-compose.backend.test.yml rm --force
docker-compose -f docker-compose.backend.test.yml build
docker-compose -f docker-compose.backend.test.yml up --abort-on-container-exit