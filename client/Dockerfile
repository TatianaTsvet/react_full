FROM node:20-alpine as builder
WORKDIR /app
COPY package.* /app
RUN npm i --no-progress
COPY . /app
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
