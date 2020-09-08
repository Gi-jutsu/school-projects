const Promise = require('bluebird');

class Dele {
  static handler(command) {
    if (!this.fs) return this.reply({ code: 550 }, 'File system not instantiated');

    return Promise.try(() => this.fs.delete(command.args))
      .then(() => {
        return this.reply({ code: 250 }, 'Requested file action okay, completed');
      })
      .catch(error => {
        console.log(error);
        return this.reply({ code: 550 }, error.message);
      });

    return this.reply({ code: 202 }, 'Superfluous command');
  }

  static get directive() {
    return 'DELE';
  }

  static get help() {
    return '{{cmd}} <path>';
  }

  static get description() {
    return 'Delete file';
  }

  static get auth() {
    return true;
  }
}

module.exports = Dele;
