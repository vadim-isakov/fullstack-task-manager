# Fullstack task manager

[![Build Status](https://travis-ci.com/vadim-isakov/fullstack-task-manager.svg?branch=master)](https://travis-ci.com/vadim-isakov/fullstack-task-manager)


## Getting Started

1. Configure your env:

    1.1. Configure ssl and superuser's details:
    
    ```sh
    cp .env.example .env
    nano .env
    ```
    SITE - server domain for SSL certificate
    
    1.2. Configure SECRET_KEY:
    
    Create new secret key using terminal
    ```sh
    openssl rand -hex 32
    # Outputs something like: f92797569676a7cccd940e3a3d0f78cc5311e280840832beaa8b0d85cfe0a069
    ```
    Copy new secret key to .env.secret
    ```sh
    cp .env.secret.example .env.secret
    nano .env.secret
    ```


2. Install frontend:
    ```sh
    bash scripts/install_frontend.sh
    ```

3. Run:
    * Run with production environment:
      ```sh
      bash scripts/build_frontend.sh
      bash scripts/start.sh
      ```
    or 
    * Run with development environment:
      ```sh
      bash scripts/start_dev.sh
      ```


## Tests
### Run end-to-end tests
1. Run tests:
```sh
bash scripts/start_e2e_tests.sh
```
2. You can see new videos in cypress/videos folder
* [Authentication testing example](./img/auth_tests.gif)
* [Main functions testing example](./img/tasks_tests.gif)

### Run backend integration tests:
```sh
bash scripts/start_backend_tests.sh
```

## Api documentation
[API documentation](./img/doc_example.png) available by addresses:
* http://localhost:5000/docs
* http://localhost:5000/redoc

## Mailing testing and configuration
Application sends emails within next events:
* Creation of new user (confirmation letter)
* Creation of new task (to assigned users)
* Task edition (to assigned users)

By default app uses local smtp server: http://localhost:8025/

If you want to use real smtp server, you need to edit docker-compose config. Change environment for backend service and remove mailhog service.
