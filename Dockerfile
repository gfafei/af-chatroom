FROM node
MAINTAINER afei_gf@163.com

ADD . /af-chat
WORKDIR /af-chat
RUN npm install