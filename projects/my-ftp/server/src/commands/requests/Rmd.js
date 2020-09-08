const Dele = require('./Dele').handler;

class Rmd {
  static handler(command) {
    return Dele.call(this, command);
  }

  static get directive() {
    return 'RMD';
  }

  static get help() {
    return '{{cmd}} <path>';
  }

  static get description() {
    return 'Remove a directory';
  }

  static get auth() {
    return true;
  }
}

module.exports = Rmd;
