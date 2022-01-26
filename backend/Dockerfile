FROM node:16

RUN mkdir -p /usr/wm-server

WORKDIR /usr/wm-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]