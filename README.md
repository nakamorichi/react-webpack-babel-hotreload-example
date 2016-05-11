React + Webpack + Babel example with hot reloading
==================================================
The purpose of this example is to show how to set up a React app for rapid development when using ECMAScript 6 and JSX.

The actual app code, located in the JSX files, is transpiled on-the-fly using Babel. After the transpilation, the JavaScript output it hot-loaded to the browser by Webpack development server using gaeron's awesome react-hot-loader Webpack plugin. Thus, the changes made to the JSX files are reflected automatically on the browser *without page reload* applying a method called hot reloading.

NOTE: I am myself beginner in React, Babel, and Webpack, so if you notice mistakes or things that could be done more efficiently, please let me know!

Requirements
------------
- Node.js

Usage
-----
- Install the dependencies: *npm install*
- Run Webpack development server (http://localhost:7000): *npm start*
- Create minified bundle: *npm run bundle*

References & credits
--------------------
- [React](https://facebook.github.io/react/)
- [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
- [Webpack](https://webpack.github.io/)
- [Babel](https://babeljs.io/)
- [Material-UI](http://www.material-ui.com/)
- [JSX](https://facebook.github.io/jsx/)
- [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/)
- [The actual app code](https://github.com/callemall/material-ui/tree/master/examples/webpack-example/)
- Configurations are based on the relevant official documentations and various third party examples