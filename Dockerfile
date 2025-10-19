FROM node:25-alpine

#Create app directory
WORKDIR usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn add global @nestjs/cli
RUN yarn install --prod

# Bundle app source
COPY . .

EXPOSE 3000:3000

CMD npm start

#To run this image
# docker build -t impuls-api . && docker run -p 3000:3000 impuls-api
