import Core from './core.js';
import { Pool, Client } from "pg";
import { logger } from "../libs/mLog.js";

export default class PostgreSQL extends Core {
  async initialize() {
    const { host, port, username, password, database, synchronize, entities } = this;

    this.client = new Client({
      user: username,
      password,
      host,
      port,
      database
    });

    try {
      await this.client.connect();

      const arEntities = Object.values(entities);

      for (const entity of arEntities) {
        const { name: tableName, columns } = entity.meta();
        await this.initTable(tableName, columns);
      }

      logger.log(`Successfuly connected to the database ${database}.`);
    } catch(e) {
      logger.log(`Database ${database} does not exist.`, e);
    }
  }

  async initTable(name, columns) {
    if(this.synchronize) {
      try{
        const query_dropTable = `DROP TABLE ${name} CASCADE`;
        const result_dropTable = await this.client.query(query_dropTable);

        logger.log(query_dropTable);
      } catch(e) {
        logger.log(e);
      }
    }

    let query_createTable = `CREATE TABLE IF NOT EXISTS ${name} (`;
    let columnIndex = 0;
    const columnKeys = Object.keys(columns);
    const columnSize = columnKeys.length;

    columnKeys.forEach( columnName => {
      const columnInfos = columns[columnName];

      query_createTable += columnName;
      query_createTable += (columnInfos.generated) ? ' SERIAL': ` ${this.translateType(columnInfos.type)}`;
      query_createTable += (columnInfos.references) ? ` REFERENCES ${columnInfos.references}`:'';
      query_createTable += (columnInfos.primary) ? ' PRIMARY KEY':'';
      query_createTable += (columnIndex !== (columnSize-1)) ? ',':');';

      columnIndex++;
    });

    try {
      const result_createTable = await this.client.query(query_createTable);
      logger.log(query_createTable);
    } catch(e) {
      logger.log(e);
    }
  }

  translateType(ormType) {
    switch(ormType) {
      case 'number':
        return 'INTEGER';
      case 'string':
        return 'VARCHAR(255)';
      default:
        return ormType;
    }
  }
}
