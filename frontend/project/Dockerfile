FROM node:18.17-alpine
WORKDIR /opt/fitfriends-frontend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]