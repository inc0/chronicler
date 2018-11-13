FROM node:latest as builder

# set working directory
RUN mkdir /usr/src/app
COPY chronicler-gui /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install axios --save
RUN npm install --save @material-ui/core
RUN npm install --save @material-ui/icons
RUN npm install typeface-roboto --save

WORKDIR /usr/src/app/chronicler-gui

CMD ["npm", "start"]
