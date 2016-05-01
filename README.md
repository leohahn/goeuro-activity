## Details
This App already comes with the compiled css, and it uses normal scripts, so it
works without the need of compilation.

To run tests and compile the Sass files, follow this instructions (it assumes you have Sass installed):

- `git clone https://github.com/leohahn/goeuro-activity`
- `cd goeuro-activity`
- `npm install`
- `gulp sass` (compiles sass to `dist/index.css`)
- `gulp test` (run the test suite once)
- `gulp test:watch` (rerun the test suite on changes)
