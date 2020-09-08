const { createServer } =  require('net');
const Promise = require('bluebird');

const ActiveConnection = require('../../connectors/ActiveConnection');

class Port {
  static handler(command) {
    this.connector = new ActiveConnection(this);

    const rawSocketInformation = command.args.split(',');
    if (rawSocketInformation.length !== 6) return this.reply({ code: 425 });

    const ip = rawSocketInformation.slice(0, 4).join('.');
    const portBytes = rawSocketInformation.slice(4).map((portValue) => parseInt(portValue));
    const port = portBytes[0] * 256 + portBytes[1];

    return this.connector.setupConnection(ip, port)
      .then(() => this.reply({ code: 200 }, 'Active connection setup done !'))
      .catch((error) => {
        console.log(error);
        return this.reply({ code: 425 });
      });

    return this.reply({ code: 200 });
  }

  static get directive() {
    return 'PORT';
  }

  static get help() {
    return '{{cmd}} <x>,<x>,<x>,<x>,<y>,<y>';
  }

  static get description() {
    return 'Specifies an address and port to which the server should connect';
  }

  static get auth() {
    return true;
  }
}

module.exports = Port;
