const Promise = require('bluebird');

class Syst {
  static handler() {
    this.reply({ code: '215'}, '');
  }

  static get directive() {
    return 'SYST';
  }

  static get help() {
    return '{{cmd}}';
  }

  static get description() {
    return 'Return system type';
  }

  static get auth() {
    return false;
  }
}

module.exports = Syst;
