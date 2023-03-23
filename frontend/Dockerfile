FROM node:lts-alpine3.17

WORKDIR /app

COPY *.json ./

RUN npm install
# RUN npm install -g npm

COPY . .

# EXPOSE 8080

CMD [ "npm", "run", "dev"]