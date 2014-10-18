# CommonJS ES6 Boilerplate

This is a boilerplate for single-page web applications using CommonJS modules and LESS CSS preprocessor.

This setup supports many awesome features of EcmaScript 6, while not requiring any ES6 runtime utilty code. The build process transpiles your ES6 code into ES5. The following ES6 features are supported:

- ES6 arrow functions
- ES6 classes
- ES6 object short notation
- ES6 rest parameters
- ES6 template literals

Instead of ES6 modules, I opted for CommonJS via Browserify. This lets you `require()` any modules from NPM, and mix-and-match with your cutting edge ES6 code.

## Gulp tasks

- `gulp build` will copy `source/index.html` to your `build` folder; browserify `source/app.js` and copy the output to the build folder; and compile any less files found in `source` root, copying them to `build`.
- `gulp watch` watches changes to your js and less files in `source`, as well as `index.html`. If any changes are detected, the corresponding part of the app (CSS, JS or HTML) is rebuilt.
- `gulp test` runs the unit tests suite.
- `gulp tdd` watches changes to your js files, and runs unit tests whenever a change is detected.
- `gulp webserver` starts a webserver with live reload.

