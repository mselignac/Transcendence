FROM node:lts-alpine3.17

WORKDIR /usr/app

COPY *.json ./

RUN npm install
# RUN npm install -g npm

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]