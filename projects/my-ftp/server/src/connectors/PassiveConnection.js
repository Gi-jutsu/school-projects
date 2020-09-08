const net = require('net');
const Promise = require('bluebird');

const BaseConnection = require('./BaseConnection');

class PassiveConnection extends BaseConnection {
  constructor(connection) {
    super(connection);
    this.type = 'passive';
  }

  waitForConnection({timeout = 5000, delay = 50} = {}) {
    if (!this.dataServer) return Promise.reject(new Error('Passive server not setup'));
    
  }
}

module.exports = PassiveConnection;
