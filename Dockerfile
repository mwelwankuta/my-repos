FROM node:14.5.0

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]