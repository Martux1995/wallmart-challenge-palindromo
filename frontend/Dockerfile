FROM node:16

RUN mkdir -p /usr/wm-front

WORKDIR /usr/wm-front

COPY package*.json ./

RUN npm install

COPY . .

# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152 

CMD [ "npm", "start" ]