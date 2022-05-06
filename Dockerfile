FROM node:latest
WORKDIR /www
COPY start.sh /www/start.sh
RUN cd /www
RUN apt update
RUN apt install sudo
RUN npm install -g pm2@5.2.0 --registry=https://registry.npmmirror.com
EXPOSE 3000
CMD bash start.sh
