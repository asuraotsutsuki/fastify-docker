FROM node:20 as nodejs
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodejs /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]