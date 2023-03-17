FROM node:19-alpine

#RUN mkdir -p /usr/src/app/server
WORKDIR /app/server

COPY . .
COPY . .

RUN npm install --force
RUN npm install db-migrate-pg --force

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

RUN npm run build

CMD [ "node", "dist/main.js"]
