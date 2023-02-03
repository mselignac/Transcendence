FROM node:lts-alpine3.17

RUN mkdir -p usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY *.json ./
COPY prisma ./prisma/

# RUN npm install -g npm
# RUN npm install
RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "yarn", "run", "start:dev"]
# RUN yarn run start:dev

# FROM node:lts-alpine3.17

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma


