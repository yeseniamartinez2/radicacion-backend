FROM node:16
RUN npm i -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install --verbose
COPY . .
EXPOSE 9000
CMD ["npm", "start"]