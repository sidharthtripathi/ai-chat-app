FROM node:lts-slim
WORKDIR /app
COPY package* .
RUN npm i
COPY . .
RUN  npm run build
CMD [ "npm","run","preview" ]