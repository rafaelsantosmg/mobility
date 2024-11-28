FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "yarn run prisma:migrate && yarn run seed && yarn dev"]
