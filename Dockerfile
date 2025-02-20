FROM node:20-alpine as base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn
COPY prisma ./prisma
RUN yarn prisma generate


FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /usr/src/app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
COPY ecosystem.config.js ./
COPY --from=deps --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /usr/src/app/.env ./.env
RUN yarn global add pm2
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:dateFormat YYYY-MM-DD
USER nestjs
EXPOSE 8000
ENV HOSTNAME="0.0.0.0"
CMD ["pm2-runtime", "start", "ecosystem.config.js"]