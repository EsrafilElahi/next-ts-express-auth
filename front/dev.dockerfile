FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3006

CMD npm run dev
