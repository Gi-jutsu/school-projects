const Promise = require('bluebird');

class Type {
  static handler(command) {
    switch(command.args) {
      case 'A':
        //switch type to ascii
        this.reply({ code: 200 }, 'The requested action has been successfully completed');
        break;
      case 'I':
        //switch type to binary
        this.reply({ code: 200 }, 'The requested action has been successfully completed');
        break;
      default:
        this.reply({ code: 504 }, 'Command parameter not supported');
    }
  }

  static get directive() {
    return 'TYPE';
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

module.exports = Type;
