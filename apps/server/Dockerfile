FROM node:16-alpine

LABEL Maintainer="Hieupv <hieupv@codersvn.com>" \
  Description="Lightweight container for nodejs application on Alpine Linux."

WORKDIR /app

COPY dist/apps/server tsconfig.base.json package.json yarn.lock ./

COPY node_modules ./node_modules

COPY libs/shared/server/database ./libs/shared/server/database
COPY libs/shared/server/common ./libs/shared/server/common

ENV PORT=3000
ENV TZ=Asia/Ho_Chi_Minh

CMD ["node", "main.js"]
