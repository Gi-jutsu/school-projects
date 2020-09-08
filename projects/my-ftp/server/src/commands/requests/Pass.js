const Promise = require('bluebird');

const users = require('../../database/users.js');

class Pass {
  static handler(command) {
    if (!this.username) return this.reply({ code: 501 }, 'Must provide username');
    if (this.authenticated) return this.reply({ code: 230 }, 'User logged in, proceed');

    const password = command.args;
    if (!password) return this.reply(501, 'Must provide password');

    const user = users.find(user => ((user.username === this.username) && (user.password === password)));

    if (user) {
      this.authenticated = true;
      return this.reply({ code: 230 }, 'User logged in, proceed');
    } else {
      return this.reply({ code: 530 }, 'Authentication failed');
    }
  }

  static get directive() {
    return 'PASS';
  }

  static get help() {
    return 'fefefe';
  }

  static get description() {
    return 'Je sais pas';
  }

  static get auth() {
    return false;
  }
}

module.exports = Pass;
