FROM node:latest

WORKDIR /app

COPY package*.json /app
COPY express.js /app

RUN npm install express
RUN npm install cors

EXPOSE 80

CMD ["node", "express.js"]