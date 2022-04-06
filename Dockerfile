FROM node:16.14.0
WORKDIR /www
COPY start.sh /www/start.sh
RUN cd /www
RUN apt-get update
RUN apt-get install sudo
RUN sudo ln -s /usr/local/bin/node /usr/bin/node
RUN sudo ln -s /usr/local/bin/npm /usr/bin/npm
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g pm2@5.2.0
EXPOSE 3000
CMD bash start.sh
