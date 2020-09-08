const Promise = require('bluebird');

class Retr {
  static handler(command) {
    const filePath = command.args;

    return this.connector.waitForConnection()
      .then(() => Promise.try(() => this.fs.read(filePath)))
      .then(response => {
        const { stream, clientPath } = response;

        return this.reply({ code: 150 }, 'File status okay; about to open data connection')
          .then(() => {
            return new Promise((resolve, reject) => {
              stream.on('data', data => {
                this.reply({ code: '', socket: this.connector.dataSocket }, data);
              });
              stream.once('end', () => resolve());
            })
          })
          .then(() => this.reply({ code: 226 }, clientPath));
      })
      .finally(() => this.connector.end());
  }

  static get directive() {
    return 'RETR';
  }

  static get help() {
    return '{{cmd}} <path>';
  }

  static get description() {
    return 'Retrieve a copy of the file';
  }

  static get auth() {
    return true;
  }
}

module.exports = Retr;
