FROM node:lts-alpine3.17

WORKDIR /app

COPY *.json ./
COPY prisma ./prisma/

# RUN npm install -g npm
# RUN npm install
RUN yarn install

COPY . .

# RUN yarn run build
RUN npx prisma generate

EXPOSE 3000

CMD [ "yarn", "run", "start:migrate:dev"]
# FROM node:lts-alpine3.17

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
