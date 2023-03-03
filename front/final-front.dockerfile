FROM front-deps:latest

COPY . .

RUN npm run build

# replace [entrypoint] file with [CMD] instruction
# RUN chmod +x ./entrypoint*.sh

CMD [ "npm", "start" ]

# final-front IMAGE
# front-container CONTAINER