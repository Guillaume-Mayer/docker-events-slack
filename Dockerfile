FROM node:alpine

LABEL Author gmayer@arkho.tech

COPY package.json /SlackDockerEvents/package.json
COPY server.js /SlackDockerEvents/server.js

WORKDIR /SlackDockerEvents

RUN npm install

ENTRYPOINT node server.js
