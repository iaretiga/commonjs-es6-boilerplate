# CommonJS ES6 Boilerplate

This is a boilerplate for single-page web applications using CommonJS modules and LESS CSS preprocessor.

## ES6 syntactic sugar

This setup supports many awesome features of EcmaScript 6, while not requiring any ES6 runtime utilty code. The build process transpiles your ES6 code into ES5. The following ES6 features are supported:

- ES6 arrow functions
- ES6 classes
- ES6 object short notation
- ES6 rest parameters
- ES6 template literals

You can set which of these ES6 transpilers you need by editing `tools/jsTransformVisitors.js`. All transpilers are enabled by default.

Instead of ES6 modules, I opted for CommonJS via Browserify. This lets you `require()` any modules from NPM, and mix-and-match with your cutting edge ES6 code.

## Gulp tasks

- `gulp build` builds the project. It runs the following three subtasks:
  - `gulp build-js` browserifies `source/app.js` and copies the output to the `build` folder;
  - `gulp build-less` compiles any `.less` files found in `source` root, copying them to `build`.
  - `gulp build-html` copies `source/index.html` to your `build` folder;
- `gulp watch` watches changes to your `.js` and `.less` files in `source`, as well as `index.html`. If any changes are detected, the corresponding build sub-task is automatically run, and the application is rebuilt.
- `gulp test` runs the unit tests suite.
- `gulp tdd` watches changes to your js files, and runs unit tests whenever a change is detected.
- `gulp webserver` starts a webserver with live reload.

### Configuring Gulp

You can easily set your source and build folders, as well as the main js file by editing the `config` variable in `gulpfile.js`. You can tweak the tasks for more customisation.
