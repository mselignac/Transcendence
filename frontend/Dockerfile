FROM node:lts-alpine3.17

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

EXPOSE ${FRONTEND_PORT}

CMD [ "npm", "run", "dev"]