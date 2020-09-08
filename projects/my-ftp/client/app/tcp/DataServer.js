const { createServer, isIPv4 } = require('net');

class DataServer {
  constructor(port, host) {
    if (!isIPv4(host)) throw new Error(`invalid hostname ${host}`);

    this.host = host;
    this.port = port;

    this._server = createServer({}, this.connectionHandler.bind(this));
    this._client = null;

    this._onDataListener = null;
  }

  get server() { return this._server; }
  get client() { return this._client; }
  get onDataListener() { return this._onDataListener; }

  set client(socket) { this._client = socket; }
  set onDataListener(callback) { this._onDataListener = callback; }

  connectionHandler(socket) {
    socket.on('data', this.onDataListener.bind(this));
    this.client = socket;
  }

  listen(callback) {
    this.server.listen(this.port, this.host, error => {
      if (error) console.log(error.message);

      callback();
    });
  }

  end() {
    if (this.server) {
      this.server.close(() => {
        console.log('Closing data server');
      });
    }
  }
}

module.exports = DataServer;
