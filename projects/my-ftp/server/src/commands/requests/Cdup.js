const Cwd = require('./Cwd').handler;

class Cdup {
  static handler(command) {
    command.args = '..';
    return Cwd.call(this, command);
  }

  static get directive() {
    return 'Cdup';
  }

  static get auth() {
    return true;
  }
}

module.exports = Cdup;
