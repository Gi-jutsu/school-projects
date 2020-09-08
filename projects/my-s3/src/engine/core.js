import mDump from "../libs/mDump";

export default class Core {
  constructor({ type, host, port, username, password, database, synchronize }, entities) {
    this.type = type
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
    this.synchronize = synchronize;
    this.entities = entities;
  }

  dump() {
      const { type, host, port, username, password, database } = this;
      mDump(`${type}://${username}:${password}@${host}:${port}/${database}`);
  }
}
