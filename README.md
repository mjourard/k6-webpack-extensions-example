# A demo repo for compiling webpack with k6 extensions.

This repository demonstrates that you can compile a k6 test script that is using xk6 extensions with webpack even if the DefinitelyTyped extensions do not exist.

This is due to the `externals` configuration in the `webpack.config.js` file.


## Demo Steps

To demonstrate, follow these steps (requires npm and docker):

1. clone the repo
2. run `npm install`
3. run `npm run start` which will bundle webpack webpack.
4. run `npm run docker:build` which will build a docker container using the Dockerfile defined. The container will have a k6 executable that has the xk6-sql extension installed
5. run `npm run docker:run` which will run the docker image built in step 4, and inside that container, k6 will run the test file that was transpiled by webpack in step 3.

## Dependencies

This test was ran and compiled using the following versions:
* npm 6.14.12
* docker v14.16.1

Other versions may work, but no guarantees.