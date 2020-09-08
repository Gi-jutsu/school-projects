const Promise = require('bluebird');

const PassiveConnection = require('../../connectors/PassiveConnection');

class Pasv {
  static handler(command) {
    return this.reply({ code: 202 }, 'Superfluous command');
  }

  static get directive() {
    return 'PASV';
  }

  static get help() {
    return '';
  }

  static get description() {
    return '';
  }

  static get auth() {
    return true;
  }
}

module.exports = Pasv;
