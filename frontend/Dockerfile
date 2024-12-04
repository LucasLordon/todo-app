FROM node:18

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev:docker", "--", "--host", "0.0.0.0", "--port", "5173" ]
