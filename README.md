# IMPULS-API

Open Source api for all things Impuls.

## Requirements

- node
- yarn
- nest

## Installation

Make sure that node is installed, and also install yarn.

Then make sure to install nest globally:

```bash
$ yarn add global @nestjs/cli
```

Then install all project dependencies with yarn

```bash
$ yarn
```

App is now ready for development

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Running the app inside a Docker container

You would need docker. -> [get it here](https://docs.docker.com/install/)

Then build the docker image and run it.
```bash
$ docker build -t impuls-api . && docker run -p 3000:3000 impuls-api
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
