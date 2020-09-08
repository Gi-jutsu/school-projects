const EventEmitter = require('events');
const uuid = require('uuid');
const Promise = require('bluebird');
const path = require('path');

const FileSystem = require('./FileSystem');
const FtpCommands = require('./commands/FtpCommand');
const BaseConnection = require('./connectors/BaseConnection');

class FtpClient extends EventEmitter {
  constructor(socket) {
    super();

    this.id = uuid.v4();

    this.connector = new BaseConnection(this);

    this.commands = new FtpCommands(this);
    this.commandSocket = socket;
    this.commandSocket.on('data', this._handleData.bind(this));

    this.cwd = '/';
    this.root = path.join(process.cwd(), '/public');
    this.fs = new FileSystem(this, { root: this.root, cwd: this.cwd });

    this.authenticated = false;
  }

  close(code = 421, message = 'Closing connection') {
    return Promise.resolve(code)
          .then((code) => code && this.reply({ code }, message));
  }

  _handleData(data) {
    const message = data.toString('utf8').split('\r\n');
    return new Promise((resolve, reject) => {
      this.commands.parse(message[0]);
    });
  }

  reply(options = {}, ...messages) {
    let { code, socket } = options;
    if (!socket) socket = this.commandSocket;

    return Promise.map(messages, message => {
      console.log(`Response: ${code} ${message}`);
      socket.write(`${code} ${message}\r\n`);
    });
  }
}

module.exports = FtpClient;
