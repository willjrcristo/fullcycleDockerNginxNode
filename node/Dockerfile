FROM node:20.11

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm i 

COPY . /usr/src/app

EXPOSE 3000

CMD ["node", "index.js"]