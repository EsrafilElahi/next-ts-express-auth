FROM front-node:latest

COPY ./package*.json /

RUN npm install --loglevel verbose

# front-deps IMAGE