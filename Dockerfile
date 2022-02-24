FROM node:16.14.0
WORKDIR /www
COPY start.sh /www/start.sh
RUN cd /www
RUN yarn config set registry https://registry.npm.taobao.org
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g pm2@5.2.0
EXPOSE 3000
CMD bash start.sh
