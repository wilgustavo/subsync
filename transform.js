const os = require('os');
const sync = require('./sync');
const { Transform } = require('stream');

module.exports = function(tiempo) {
  return new Transform({
    transform(chunck, encoding, callback) {
      this.push(sync(chunck.toString(), tiempo) + os.EOL);
      callback();
    }
  });
}