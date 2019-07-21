FROM node:11.13-alpine

RUN mkdir /app

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm install

COPY . /app/

CMD npm start
