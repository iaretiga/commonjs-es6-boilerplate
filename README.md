# CommonJS ES6 Boilerplate

This is a boilerplate for single-page web applications using CommonJS modules, ES6 (with Babel) and LESS CSS preprocessor.

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
