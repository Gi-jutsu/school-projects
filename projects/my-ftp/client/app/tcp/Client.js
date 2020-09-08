const net = require('net');
const electron = require('electron')
const { ipcMain } = electron
const DataServer = require('./DataServer');

class Client {
  constructor() {
    this.client = null;
    this.connected = false;
    this.validUser = false;
    this._dataServer = null;
    this.response = '';
    this.status = '';
    this.filesList = [];
  }

  get dataServer() { return this._dataServer; }
  set dataServer(server) { this._dataServer = server; }

  connectToServer(config, callback) {
    if (this.client && !this.client.destroyed) {
      console.log('Destroying client...');
      this.client.destroy();
    }

    this.client = new net.Socket();
    this.client.connect(config.port, config.host);
    this.client.on('connect', () => {
      console.log('Authentication...');
      this.connected = true;
      this.client.write(`USER ${config.user}`);
    });

    this.client.on('data', chunk => {
      this.status = chunk.toString().slice(0,3);
      this.response = chunk.toString().slice(4);
      console.log(`${this.status} :: ${this.response}`);

      /** Username okay, awaiting password **/
      if (this.status==='331') {
        this.client.write(`PASS ${config.pass}`);
      }

      /** User logged in, proceed **/
      if (this.status==='230') {
        this.validUser = true;
        callback()
      }

      /** Authentication failed **/
      if (this.status==='530') {
        this.validUser = false;
        this.connected = false;
        callback()
      }
    });
  }

  replyTo(socket, message) {
    console.log(`Reply to server: ${message}`);
    socket.write(`${message}\r\n`);
  }

  command(type, data = '', callback) {
    if (type==='list') {
      this.dataServer = new DataServer(55642, '10.0.2.49'); // Any port with your local network IP
      this.dataServer.listen(() => {
        this.dataServer.onDataListener = (data) => {
          this.filesList = data.toString().split('\n');
          console.log('List in DataServer : ');
          console.log(this.filesList);

          ipcMain.on('login', (e, truc) => {
            console.log('IPCMAIN received list');
            e.sender.send('reply_command', {
              path: this.response,
              filesList: this.filesList
            });
          })
          this.dataServer.end();
          return;
        }
        this.replyTo(this.client, 'PORT 10,0,2,49,217,90'); // Your network IP with port converted to binary : 55642 -> 01010011 01010001 -> 217 90
        this.replyTo(this.client, 'LIST');
      });
    } else {
      this.client.write(`${type} ${data}`);
    }
    callback();
  }
}

module.exports = Client;
