FROM node

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "npm", "start"]
