FROM node:lts-alpine3.17

WORKDIR /app

COPY *.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE ${BACKEND_PORT}

CMD [ "yarn", "run", "start:migrate:dev"]
