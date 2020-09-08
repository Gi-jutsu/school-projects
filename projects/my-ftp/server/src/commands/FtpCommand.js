const Promise = require('bluebird');

const REQUESTS = require('./requests');

class FtpCommand {
  constructor(client) {
    this.client = client;
  }

  parse(message) {
    const strippedMessage = message.replace(/"/g, '');
    let [directive, ...args] = strippedMessage.split(' ');
    directive = directive.toUpperCase();

    args = args.join(' ');

    const command = {
      directive,
      args
    }

    console.log("Command:", command);

    this.process(command);
  }

  process(command) {
    if(!REQUESTS.hasOwnProperty(command.directive)) return this.client.reply({ code: 202 }, 'Superfluous command');

    const request = REQUESTS[command.directive];
    const handler = request.handler.bind(this.client);

    if (request.auth) {
      if (this.client.authenticated) return Promise.resolve(handler(command));
      this.client.reply({ code: 530 }, 'Not logged in');
    } else {
      return Promise.resolve(handler(command));
    }
  }
}

module.exports = FtpCommand;
