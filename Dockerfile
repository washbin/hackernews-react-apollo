# syntax=docker/dockerfile:1

FROM node:14.17-alpine AS build
WORKDIR /app
COPY package.json yarn.lock .
ARG NODE_ENV=production
RUN yarn install --production --frozen-lockfile
COPY . .
RUN yarn run build

FROM nginx:1.21-alpine
EXPOSE 80
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
