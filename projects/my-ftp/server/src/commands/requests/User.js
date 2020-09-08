const Promise = require('bluebird');

const users = require('../../database/users.js');

class User {
  static handler(command) {
    if (this.authenticated) return this.reply({ code: 230 }, 'User logged in, proceed');

    this.username = command.args;
    if (!this.username) return this.reply({ code: 501 }, 'Must provide username');

    const user = users.find(user => user.username === command.args);
    if (user) {
      this.reply({ code: 331 }, 'Username okay, awaiting password');
    } else {
      this.reply({ code: 530}, 'No user found');
    }
  }

  static get directive() {
    return 'USER';
  }

  static get help() {
    return 'USER <SP> user-name (set username)';
  }

  static get description() {
    return 'Je sais pas';
  }

  static get auth() {
    return false;
  }
}

module.exports = User;
