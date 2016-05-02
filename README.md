## Details
To run tests and compile the Sass files, follow this instructions (it assumes you have Sass installed):

- `git clone https://github.com/leohahn/goeuro-activity`
- `cd goeuro-activity`
- `npm install`
- `gulp sass` (compiles sass to `app/dist/index.css`)
- `gulp test` (run the test suite once)
- `gulp test:watch` (rerun the test suite on changes)

To serve the files use `gulp serve`, and open browser on `localhost:8080`.
