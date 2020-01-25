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

At last you will need to setup the dev-database for use.
Create a `.env` file in the project root folder and add one line with your config like this:
```
mongoUri=ADD_THE_WHOLE_URI_HERE
```

That's it!
The API is now ready for further development.

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

## Heroku
Until I get my server set up correctly, I'm hosting this api on heroku. 
And it can be reached on impuls-api.herokuapp.com

And, for future reference;
Here is the command I use for deploying to said service.
```bash
heroku container:push web -a impuls-api
``` 
