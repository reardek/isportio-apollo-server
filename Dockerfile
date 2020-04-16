FROM node:lts

WORKDIR /home/node/app

COPY . /home/node/app

EXPOSE 3001

RUN npm install -g nodemon && npm install

CMD [ "npm", "run", "server" ]