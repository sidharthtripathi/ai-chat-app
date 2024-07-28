FROM node:lts-slim
WORKDIR /backend
COPY package* .
RUN npm i
COPY . .
RUN npm run build
CMD [ "npm", "start" ]