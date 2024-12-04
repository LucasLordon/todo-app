FROM node:20.14
 
WORKDIR /backend
 
COPY package*.json ./

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt
COPY . .
 
EXPOSE 3000
 
CMD ["npm", "start"]