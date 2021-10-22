# syntax=docker/dockerfile:1

FROM node:14.17-alpine as build

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN export NODE_ENV=production
RUN yarn install --production --frozen-lockfile
COPY . .
RUN yarn run build

FROM nginx:1.21-alpine
EXPOSE 80

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
