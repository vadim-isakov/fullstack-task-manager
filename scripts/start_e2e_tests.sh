docker-compose -f docker-compose.e2e.test.yml rm --force
docker-compose -f docker-compose.e2e.test.yml build
docker-compose -f docker-compose.e2e.test.yml up --abort-on-container-exit