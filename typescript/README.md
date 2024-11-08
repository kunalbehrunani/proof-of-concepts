To execute typescript file one time -

1. compile the ts file using command `tsc index.ts`
2. this will create a compiled file of `.js` extention with the same name
3. now, execute the compiled `.js` file using `node index.js`

To execute the typescript file directly without explicitly compiling -

1. use npm library `ts-node`
2. install ts-node - `npm install -g ts-node`
3. run in terminal - `ts-node index.ts`

To execute typescript file in watch mode, configure nodemon

1. install `nodemon`
2. configure `nodemon` by creating a `nodemon.json` file
3. do the configuration
4. simply run `nodemon` in terminal in project root directory.
