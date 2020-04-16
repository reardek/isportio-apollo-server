FROM node:lts

COPY . /home/node/app

EXPOSE 3001

CMD "npm run server"