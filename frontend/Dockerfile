# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run dev

EXPOSE 5173

CMD ["npm", "run", "dev"]
