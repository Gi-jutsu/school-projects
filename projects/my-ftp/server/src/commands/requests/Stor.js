const Promise = require('bluebird');

class Stor {
  static handler(command) {
    const fileName = command.args;

    return this.connector.waitForConnection()
      .then(() => Promise.try(() => this.fs.write(fileName)))
      .then(response => {
        const { stream, clientPath } = response;

        const streamPromise = new Promise((resolve, reject) => {
          stream.once('finish', () => resolve());
        });

        const socketPromise = new Promise((resolve, reject) => {
          this.connector.dataSocket.on('data', (data) => {
            stream.write(data);
          });

          this.connector.dataSocket.once('end', () => {
            stream.end();
            resolve();
          });
        });

        return this.reply({ code: 150 }, 'File status okay; about to open data connection')
          .then(() => Promise.all([streamPromise, socketPromise]))
          .then(() => this.reply({ code: 226 }, clientPath))
          .finally(() => stream.destroy());
      })
      .finally(() => this.connector.end());
  }

  static get directive() {
    return 'STOR';
  }

  static get help() {
    return '{{cmd}} <path>';
  }

  static get description() {
    return 'Store data as a file at the server';
  }

  static get auth() {
    return true;
  }
}

module.exports = Stor;
