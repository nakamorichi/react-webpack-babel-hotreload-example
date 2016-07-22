React + Redux + Saga + Material-UI + Webpack + Babel example with hot reloading and routing
===========================================================================================
The purpose of this example is to show how to set up a non-trivial but concise React app aimed at rapid development. The actual application code under ./src - written using [JSX](https://facebook.github.io/jsx/) and various other next-generation non-standard JavaScript syntax - is transpiled by Babel into [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/), which is recognized by most modern browsers. The example is built on top of the following main components:

- [babel](https://github.com/babel/babel) for transpiling next-generation JavaScript into ECMAScript 6
- [material-ui](https://github.com/callemall/material-ui) for building user interface
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) for hot module reloading
- [react-redux](https://github.com/reactjs/react-redux) for integrating Redux into React
- [react-router](https://github.com/reactjs/react-router) for routing
- [react-router-redux](https://github.com/reactjs/react-router-redux) for managing router state via Redux
- [redux](https://github.com/reactjs/redux) for managing application state predictably
- [redux-saga](https://github.com/yelouafi/redux-saga) for advanced asynchronic processing
- [webpack](https://github.com/webpack/webpack) for bundling the code and providing a development server

In development mode, the code is automatically transpiled by Babel and hot-loaded to the browser by Webpack development server using gaeron's awesome react-hot-loader Webpack plugin. Thus, the changes made to the source files are reflected automatically on the browser *without page reload* applying a method called hot reloading.

Requirements
------------
- Node.js

Usage
-----
### Setup
- Install the dependencies: *npm install*

### Development
- Run Webpack development server: *npm start*
- Point your browser to the server (e.g. http://localhost:7000) and begin programming
- There are also browser extensions, such as [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ja), which can significantly boost ease developing React

### Production
- Create minified bundle: *npm run bundle*
