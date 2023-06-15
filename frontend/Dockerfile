FROM node:lts-alpine3.17

WORKDIR /app

COPY *.json ./

RUN npm install
# RUN npm install -g npm

COPY . .

EXPOSE ${FRONTEND_PORT}

CMD [ "npm", "run", "dev"]