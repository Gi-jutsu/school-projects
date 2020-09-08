const Promise = require('bluebird');

class Pwd {
  static handler() {
    if (!this.fs) return console.log(550, 'File system not instantiated');

    return Promise.try(() => this.fs.currentDirectory())
      .then((cwd) => {
        return this.reply({ code: 257 }, cwd);
      })
      .catch((error) => {
        console.log(error);
        return this.reply({ code: 550 }, error.message);
      });
  }

  static get directive() {
    return 'PWD';
  }

  static get help() {
    return 'PWD (get current working directory)';
  }

  static get description() {
    return 'Print current working directory';
  }

  static get auth() {
    return true;
  }
}

module.exports = Pwd;
