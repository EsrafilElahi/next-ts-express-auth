# ======================================== deps
FROM node:18-alpine AS deps

WORKDIR /app

# for cache and install deps
COPY package.json package-lock.json ./
RUN npm install --loglevel verbose

# ======================================== build
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# ======================================== run after build
FROM node:18-alpine AS runner

WORKDIR /app

# default prod - dev? pass the NODE_ENV development in docker compose file
ENV NODE_ENV production 

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# for custome config file
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]