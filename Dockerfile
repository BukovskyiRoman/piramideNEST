FROM node

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --force
RUN npm install db-migrate-pg --force

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

RUN npm run build

CMD [ "node", "dist/main.js"]
