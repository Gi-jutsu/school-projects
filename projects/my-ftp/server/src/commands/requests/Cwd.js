const Promise = require('bluebird');

class Cwd {
  static handler(command) {
    if (!this.fs) return console.log({ code: 550 }, 'File system not instantiated');

    return Promise.try(() => this.fs.chdir(command.args))
      .then(cwd => {
        return this.reply({ code: 250 }, cwd);
      })
      .catch((error) => {
        console.log(error);
        return this.reply({ code: 550 }, error.message);
    });
  }

  static get directive() {
    return 'CWD';
  }

  static get help() {
    return 'CWD [<SP> dir-name] (change working directory)';
  }

  static get description() {
    return 'Change working directory';
  }

  static get auth() {
    return true;
  }
}

module.exports = Cwd;
