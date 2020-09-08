const Promise = require('bluebird');

class Rnto {
  static handler(command) {
    const renamingFile = this.renamingFile;
    const newFileName = command.args;

    return Promise.try(() => this.fs.rename(renamingFile, newFileName))
      .then(() => {
        return this.reply({ code: 250 }, 'Requested file action okay, completed')
      })
      .catch(error => {
        console.log(error);
        this.reply({ code: 550 }, error.message);0
      });
  }

  static get directive() {
    return 'RNTO';
  }

  static get help() {
    return '{{cmd}} <name>';
  }

  static get description() {
    return 'Rename file';
  }

  static get auth() {
    return true;
  }
}

module.exports = Rnto;
