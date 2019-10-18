FROM node:10.16.3-slim

WORKDIR /app

COPY . .
EXPOSE 4000
CMD ['npm' 'start']