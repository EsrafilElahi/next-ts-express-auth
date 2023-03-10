FROM back-deps:latest

COPY . .

RUN npm run build

# replace [entrypoint] file with [CMD] instruction
# RUN chmod +x ./entrypoint*.sh

CMD [ "npm", "start" ]

# final-back IMAGE
# back-container CONTAINER