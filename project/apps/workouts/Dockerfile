FROM node:18.17.0-slim
RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /opt/fitfriends-workouts
COPY ./dist/apps/workouts/package-json .
RUN npm install --omit=dev

COPY ./dist/apps/workouts/assets/prisma/schema.prisma ./schema.prisma

RUN npx prisma generate --schema schema.prisma
RUN cp -R ../../node_modules/.prisma ./node_modules && rm -r ../node_modules

COPY ./dist/apps/workouts .
CMD ["node", "main.js"]
