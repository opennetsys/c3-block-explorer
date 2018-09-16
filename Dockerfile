FROM node:9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN mv scripts/entrypoint.sh .

EXPOSE 3000
EXPOSE 5000

CMD /usr/src/app/entrypoint.sh
