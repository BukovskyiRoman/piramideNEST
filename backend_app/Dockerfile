FROM node:19-alpine

WORKDIR /app/server

COPY package*.json .
COPY tsconfig.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

#RUN ls && npm run migrate

#CMD [ "node", "dist/main.js"]
CMD ["sh", "-c", "npm run migrate && npm run start:dev"]

