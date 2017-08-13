FROM node:8.3.0-alpine
RUN mkdir -p /opt/react-webpack-babel-hotreload-example
WORKDIR /opt/react-webpack-babel-hotreload-example
COPY . .
RUN \
	apk add --no-cache --virtual build-deps \
		python=2.7.13-r1 \
		make=4.2.1-r0 \
		g++=6.3.0-r4 && \
	npm rebuild && \
	apk del build-deps
EXPOSE 8000
CMD ["npm", "start"]
