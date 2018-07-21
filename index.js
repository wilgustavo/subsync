const split2  = require("split2");
const fs = require('fs');
const syncTransform = require('./transform');

if (process.argv.length < 5) {
  console.log('Uso: node index.js <original> <destino> <ms>');
  process.exit(1);
}

const [,, original, destino, tiempo ] = process.argv;
const fileIn = fs.createReadStream(original);
const fileOut = fs.createWriteStream(destino);

fileIn
  .pipe(split2())
  .pipe(syncTransform(Number.parseInt(tiempo)))
  .pipe(fileOut);
