const Promise = require('bluebird');

class Rnfr {
  static handler(command) {
    const fileName = command.args;

    return Promise.try(() => this.fs.get(fileName))
      .then(() => {
        this.renamingFile = fileName;
        return this.reply({ code: 330 }, 'Requested file action pending further information');
      })
      .catch(error => {
        console.log(error);
        return this.reply({ code: 550 }, error.message);
      });
  }

  static get directive() {
    return 'RNFR';
  }

  static get help() {
    return '{{cmd}} <name>';
  }

  static get description() {
    return 'Rename';
  }

  static get auth() {
    return true;
  }
}

module.exports = Rnfr;
