FROM node:19-alpine

#RUN mkdir -p /usr/src/app/client
WORKDIR /app/client

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "npm", "start"]
