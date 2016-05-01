## Details
This App already comes with the compiled css, and it uses normal scripts, so it
works without the need of compilation.

To run tests and compile the Sass files, this instructions (it assumes you have Sass installed):

- `cd /path/to/project/root`
- `npm install`
- `gulp sass` (compiles sass to `dist/index.css`)
- `gulp test` (run the test suite once)

The tests can also be manually run with karma (if you want to run in watch mode):

- `cd /path/to/project/root`
- `node_modules/karma/bin/karma start`
