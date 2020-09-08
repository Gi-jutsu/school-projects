const { Socket } = require('net');
const Promise = require('bluebird');

const BaseConnection = require('./BaseConnection');

class ActiveConnection extends BaseConnection {
  constructor(connection) {
    super(connection);
    this.type = 'active';
  }

  waitForConnection({timeout = 5000, delay = 50} = {}) {
    const checkSocket = () => {
      if (this.dataSocket) {
        return Promise.resolve(this.dataSocket);
      }
      return Promise.resolve().delay(delay)
        .then(() => checkSocket());
    };

    return checkSocket().timeout(timeout);
  }

  setupConnection(host, port) {
    const destroyServer = () => Promise.resolve(this.dataSocket ? this.dataSocket.destroy() : undefined);

    return destroyServer()
      .then(() => {
        this.dataSocket = new Socket();
        this.dataSocket.connect(port, host, () => {
          this.dataSocket.connected = true;
        });
      })
  }
}

module.exports = ActiveConnection;
