FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ENV PORT=5008

EXPOSE 5008
CMD [ "npm", "run", "nodemon" ]
