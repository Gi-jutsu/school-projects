import { join } from 'path';
import { existsSync } from 'fs';
import PostgreSQL from './engine/postgresql';
import Entity from './entities/entity';

export default class mOrm {
  configPathName = "./mOrm.config.json";

  async createConnection(dbConfig = {}, extras = { entities: [] }) {
    if(Object.entries(dbConfig).length === 0) {
      if(!existsSync(join(__dirname,this.configPathName)))
        throw new Error(`Configuration file ${__dirname}/mOrm.config.json required`)

      this.config = require(this.configPathName);
    } else {
      if(dbConfig.uri) {
        const synchronize = (dbConfig.synchronize) ? dbConfig.synchronize:false;
        const regExp = /^(.*):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/g;
        const [, type, username, password, host, port, database] = regExp.exec(dbConfig.uri);

        this.config = {
          type,
          username,
          password,
          host,
          port,
          database,
          synchronize
        };
      } else {
        this.config = dbConfig;
      }
    }

    this.entities = {};
    for (const entities of extras.entities) {
      this.entities[entities.prototype.constructor.name] = entities;
    }

    switch(this.config.type) {
      case "postgresql":
        this.dbInstance = new PostgreSQL(this.config, this.entities);
        break;
      default:
        throw new Error(`Engine type ${this.config.type} not supported`);
    }

    await this.dbInstance.initialize();
  }

  getEntity(name) {
    return new this.entities[name](this.dbInstance);
  }
}
