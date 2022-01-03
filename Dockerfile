FROM node:16.13.1

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "devStart"]


