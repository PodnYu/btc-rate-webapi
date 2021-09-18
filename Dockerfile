FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ENV PORT=5007
ENV NODE_ENV=container

EXPOSE 5007
CMD [ "npm", "run", "nodemon" ]
