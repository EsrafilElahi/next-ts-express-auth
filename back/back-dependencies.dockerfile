FROM back-node:latest

COPY ./package*.json /

RUN npm install --loglevel verbose

# back-deps IMAGE