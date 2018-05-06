DOCKER_REPO = matheuspiment/todo-api

default: build

build:
        docker build -t ${DOCKER_REPO} .
