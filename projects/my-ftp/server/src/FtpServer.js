const { createServer, isIPv4 } =  require('net');
const fs = require('fs-extra');
const FtpClient = require('./FtpClient');
const uuid = require('uuid');
const Promise = require('bluebird');
const EventEmitter = require('events');

class FtpServer extends EventEmitter {
  constructor(host, port) {
    super();
    if (!isIPv4(host)) throw new Error(`invalid hostname ${host}`);

    this.clients = [];
    this.server = createServer({}, this.connectionHandler.bind(this));
    this.server.timeout = 0;
    this.listen()
      .then(() => {
        console.log("SERVER listening");
      });

    process.on('SIGTERM', this.quit.bind(this));
    process.on('SIGINT', this.quit.bind(this));
    process.on('SIGQUIT', this.quit.bind(this));
  }

  connectionHandler(socket) {
    let client = new FtpClient(socket);
    this.clients[client.id] = client;
    client.reply({ code: 220 }, 'Bonjour');
    socket.on('close', () => this.disconnectClient(client.id));
  }

  disconnectClient(id) {
    return new Promise((resolve) => {
      const client = this.clients[id];
      if (!client) return resolve();

      delete this.clients[id];
      try {
        client.commandSocket.destroy();
      } catch(error) {
        console.log('Error closing connection', id, error);
      } finally {
        resolve('Disconnected');
      }
    });
  }

  listen() {
    return new Promise((resolve, reject) => {
      this.server.once('error', reject);

      this.server.listen(3389, '10.0.2.6', (err) => {
        this.server.removeListener('error', reject);
        if (err) return reject(err);

        resolve('Listening');
      });
    });
  }

  close() {
    return new Promise((resolve) => {
      this.server.close((err) => {
        if (err) console.log(err, 'Error closing server');
        resolve('Closed');
      });
    })
    .then(() => this.removeAllListeners());
  }

  quit() {
    return this.close()
      .finally(() => process.exit(0));
  }
}

module.exports = FtpServer;
