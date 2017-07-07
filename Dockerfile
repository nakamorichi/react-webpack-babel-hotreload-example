
FROM node:8.1.3-alpine
RUN npm install -g http-server
RUN mkdir -p /opt/react-webpack-babel-hotreload-example
WORKDIR /opt/react-webpack-babel-hotreload-example
COPY . .
CMD http-server -p 8000
EXPOSE 8000
