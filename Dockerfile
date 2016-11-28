FROM ubuntu
MAINTAINER afei_gf@163.com

#install the latest software and install nodejs
RUN apt-get update &&\
    apt-get install apt-file -y &&\
    apt-file update &&\
    apt-get install nodejs -y &&\
    apt-get install npm -y &&\
    apt-get install gcc-snapshot -y &&\
    ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install && npm start