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

### Local developer database via docker 
```bash
docker run -d --name impuls-db \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=impulsadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=impulspassword \
    mongo
```
This will give us the mongoDB mongoURI `mongodb://impulsadmin:impulspassword@localhost:27017`

Then you can browse the database with mongoDB Compass or add it to the .env file for local development.

> NB. We haven't connected a volume to the docker-container, so everything will get reset when you restart the docker-container.


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
Api should be running at localhost:3000.

Checkout http://localhost:3000/api/ to get an overview of the api. (Swagger)


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
