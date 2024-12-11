FROM node:18

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173
ENV APP_ENV=${APP_ENV}

CMD [ "npm", "run", "dev:${APP_ENV}", "--", "--host", "0.0.0.0", "--port", "5173" ]
