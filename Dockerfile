FROM node:latest
WORKDIR /usr/CatJam
COPY package.json .
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg
RUN npm install && npm install typescript -g && npm install -g ts-node
COPY . .
# RUN tsc
CMD ["ts-node","src/index.ts"]