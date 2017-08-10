FROM node:8.2.1-alpine
RUN mkdir -p /opt/react-webpack-babel-hotreload-example
WORKDIR /opt/react-webpack-babel-hotreload-example
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
