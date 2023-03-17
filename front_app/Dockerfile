FROM node:19-alpine

WORKDIR /app/client

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "npm", "start"]
