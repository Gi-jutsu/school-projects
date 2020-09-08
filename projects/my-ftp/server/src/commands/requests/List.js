const Promise = require('bluebird');

class List {
  static handler(command) {
    if (!this.fs) return console.log('File system not instantiated');

    const path = command.args || '.';

    return this.connector.waitForConnection()
      .tap(() => this.commandSocket.pause())
      .then(() => Promise.try(() => this.fs.get(path)))
      .then(stat => stat.isDirectory() ? Promise.try(() => this.fs.list(path)) : [stat])
      .then(files => {
        return Promise.try(() => files.map((file) => {
          const message = this.fs.ls(file);
          return message;
        }));
      })
      .tap(() => this.reply({ code: 150 }, 'File status okay; about to open data connection'))
      .then(fileList => this.reply({ code:'', socket: this.connector.dataSocket}, ...fileList))
      .tap(() => this.reply({ code: 226 }, 'Closing data connection'))
      .catch(error => {
        console.log(error.message);
        this.reply({ code: 530 }, error.message);
        this.connector.end()
        this.commandSocket.resume();
      })
      .finally(() => {
        this.connector.end()
        this.commandSocket.resume();
      });
  }

  static get directive() {
    return 'LIST';
  }

  static get help() {
    return 'LIST [<SP> <pathname>] <CRLF>';
  }

  static get description() {
    return 'Information of the current working directory is returned';
  }

  static get auth() {
    return true;
  }
}

module.exports = List;
