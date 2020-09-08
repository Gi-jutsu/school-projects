
class BaseConnection {
  constructor(connection) {
    this.connection = connection;

    this._dataSocket = null;
    this._dataServer = null;
    this.type = false;
  }

  get socket() { return this._dataSocket; }
  get server() { return this._dataServer; }

  waitForConnection() {
    return Promise.reject(new Error('No connection setup, send PASV or PORT'));
  }

  closeSocket() {
    if(this.dataSocket) {
      const socket = this.dataSocket;

      this.dataSocket.end(() => { socket.destroy(); });
      this.dataSocket = null;
    }
  }

  closeServer() {
    if(this.dataServer) {
      this.dataServer.close();
      this.dataServer = null;
    }
  }

  end() {
    this.closeSocket();
    this.closeServer();

    this.type = false;
  }
}

module.exports = BaseConnection;
