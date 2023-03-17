FROM node:19-alpine

WORKDIR /app/server

COPY package*.json .
COPY tsconfig.json .

RUN npm ci --force &&\
    npm install db-migrate-pg --force

COPY . .

RUN apk update &&\
    apk add git &&\
    git clone https://github.com/vishnubob/wait-for-it.git &&\
    npm run build

CMD [ "node", "dist/main.js"]
