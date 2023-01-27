FROM node:14.18.1-alpine

WORKDIR /usr/src/app

COPY package-lock.json .

COPY package.json .

RUN npm install

COPY . .