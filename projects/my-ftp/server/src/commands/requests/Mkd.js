const Promise = require('bluebird');

class Mkd {
  static handler(command) {
    if (!this.fs) return console.log('File system not instantiated');

    return Promise.try(() => this.fs.mkdir(command.args))
      .then((dir) => {
        return this.reply({ code: 257 }, `${dir} created`);
      })
      .catch((error) => {
        console.log(error);
        return this.reply({ code: 550 }, error.message);
      });
  }

  static get directive() {
    return 'MKD';
  }

  static get help() {
    return 'MKD  <SP> <pathname> <CRLF>';
  }

  static get description() {
    return 'Create a directory';
  }

  static get auth() {
    return true;
  }
}

module.exports = Mkd;
