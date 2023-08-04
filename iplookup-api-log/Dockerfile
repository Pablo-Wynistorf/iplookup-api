FROM node:latest

WORKDIR /app

COPY package.json /app
COPY index.js /app


RUN npm install express
RUN npm install request-ip --save
RUN npm install cors
RUN npm install fs

EXPOSE 80

CMD ["node", "index.js"]