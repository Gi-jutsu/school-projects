import { logger } from "../libs/mLog";
import { isEmpty } from "lodash";

export default class Entity {
  constructor(dbInstance, name) {
    this.dbInstance = dbInstance;
    this.name = name;
  }

  async count() {
    const queryCount = `SELECT COUNT(*) FROM ${this.name}`;

    return new Promise((resolve, reject) => {
      this.dbInstance.client.query(queryCount, (err, result) => {
        if (err) {
          logger.log(`${queryCount} ERROR: ${err}`);
          reject(err);
        } else {
          logger.log(`${queryCount} RESULT: ${result.rows[0].count}`);
          resolve(result.rows[0].count);
        }
      });
    });
  }

  async findByPk(id, {attributes} = {}) {
    return new Promise((resolve, reject) => {
      const queryFindByPk = `SELECT ${isEmpty(attributes) ? '*': attributes.join(",")} FROM ${this.name} WHERE id=${id}`;

      this.dbInstance.client.query(queryFindByPk, (err, result) => {
        if(err) {
          logger.log(`${queryFindByPk} ERROR: ${err}`);
          reject(err);
        } else {
          const resultFindByPk = (result.rowCount > 0) ? result.rows[0]:null;
          logger.log(`${queryFindByPk} RESULT: ${resultFindByPk}`);
          resolve(resultFindByPk);
        }
      });
    });
  }

  async findAll({ attributes } = {}) {
    return new Promise((resolve, reject) => {
      const queryFindAll = `SELECT ${isEmpty(attributes) ? '*': attributes.join(",")} FROM ${this.name}`;

      this.dbInstance.client.query(queryFindAll, (err, result) => {
        if(err) {
          logger.log(`${queryFindAll} ERROR: ${err}`);
          reject(err);
        } else {
          const resultFindAll = (result.rowCount > 0) ? result.rows:null;
          logger.log(`${queryFindAll} RESULT: ${resultFindAll}`);
          resolve(resultFindAll);
        }
      });
    });
  }

  async findOne({ where, attributes = null}) {
    const whereKeys = Object.keys(where);
    let queryWhere = '';
    let whereIndex = 0;

    whereKeys.forEach( key => {
      queryWhere += `${key}='${where[key]}'`;
      queryWhere += ( whereIndex >= whereKeys.length - 1) ? '':' AND ';

      whereIndex++;
    });

    return new Promise((resolve, reject) => {
      const queryFindOne = `SELECT ${isEmpty(attributes) ? '*': attributes.join(",")} FROM ${this.name} WHERE ${queryWhere}`;

      this.dbInstance.client.query(queryFindOne, (err, result) => {
        if(err) {
          logger.log(`${queryFindOne} ERROR: ${err}`);
          reject(err);
        } else {
          const resultFindOne = (result.rowCount > 0) ? result.rows[0]:null;
          logger.log(`${queryFindOne} RESULT: ${resultFindOne}`);
          resolve(resultFindOne);
        }
      });
    });
  }

  async update(data) {
    const querySet = Object.keys(data).map( (key,i) => { return `${key}=\$${i+1}` }).join(',');
    const dataValues = Object.values(data);

    const queryUpdate = `UPDATE ${this.name} SET ${querySet} WHERE id=${data.id} RETURNING *`;

    return new Promise((resolve, reject) => {
      this.dbInstance.client.query(queryUpdate, dataValues, (err, result) => {
        if(err) {
          logger.log(`${queryUpdate} ERROR: ${err}`);
          reject(err);
        } else {
          const resultUpdate = (result.rowCount > 0) ? result.rows[0]:null;
          logger.log(`${queryUpdate} RESULT: ${resultUpdate}`);
          resolve(resultUpdate);
        }
      });
    });
  }

  async remove(data) {
    const entity = this.dbInstance.entities[this.name];
    const entityPkName = Entity.getPk(entity.meta());

    const queryRemove = `DELETE FROM ${this.name} WHERE id=$1 RETURNING *`;

    return new Promise((resolve, reject) => {
      this.dbInstance.client.query(queryRemove, [data[entityPkName]], (err, result) => {
        if(err) {
          logger.log(`${queryRemove} ERROR: ${err}`);
          reject(err);
        } else {
          const resultRemove = (result.rowCount > 0) ? result.rows[0]:null;
          logger.log(`${queryRemove} RESULT: ${resultRemove}`);
          resolve(resultRemove);
        }
      });
    });
  }

  async save(data) {
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);
    let params = dataKeys.map( (key,i) => { return `\$${i+1}`});

    const querySave = `INSERT INTO ${this.name}(${dataKeys.join(',')}) VALUES(${params.join(',')}) RETURNING *`;

    return new Promise((resolve, reject) => {
      this.dbInstance.client.query(querySave, dataValues, (err, result) => {
        if(err) {
          logger.log(`${querySave} ERROR: ${err}`);
          reject(err);
        } else {
          const resultSave = (result.rowCount > 0) ? result.rows[0]:null;
          logger.log(`${querySave} RESULT: ${resultSave}`);
          resolve(resultSave);
        }
      });
    });
  }

  static getPk({columns = {} }) {
    for(const column of Object.keys(columns))
      if(columns[column].primary)
        return column;
      throw `Model ${this.name} doesn't have PrimaryKey !`;
  }

  async hasOne(foreignEntity) {
    const foreignPk = Entity.getPk(foreignEntity.meta());
    const foreignField = `${foreignEntity.name.toLowerCase()}_id`;

    const queryHasOne = `ALTER TABLE ${this.name} ADD COLUMN ${foreignField} INT REFERENCES ${foreignEntity.name}(${foreignPk})`;

    await this.dbInstance.client.query(queryHasOne);
    logger.log(`${queryHasOne} SUCCESS`);
  }

  async hasMany(foreignEntity) {
    const entity = this.dbInstance.entities[this.name];

    const entityPk = Entity.getPk(entity.meta());
    const foreignPk = Entity.getPk(foreignEntity.meta());

    const foreignField = `${this.name.toLowerCase()}_id`;

    const queryHasMany = `ALTER TABLE ${foreignEntity.name} ADD COLUMN ${foreignField} INT REFERENCES ${entity.name}(${entityPk})`;

    await this.dbInstance.client.query(queryHasMany);
    logger.log(`${queryHasMany} SUCCESS`);
  }

  async manyToMany(foreignEntity) {
    const entity = this.dbInstance.entities[this.name];

    const foreignPk = Entity.getPk(foreignEntity.meta());
    const entityPk = Entity.getPk(entity.meta());

    const entityField = `${entity.name.toLowerCase()}_${entityPk}`;
    const foreignField = `${foreignEntity.name.toLowerCase()}_${foreignPk}`;

    const tableName = `${this.name.toLowerCase()}_${foreignEntity.name.toLowerCase()}`;
    const queryDropTable = `DROP TABLE IF EXISTS ${tableName} CASCADE`;
    const queryCreateTable = `CREATE TABLE ${tableName} (
                                ${entityField} INT REFERENCES ${entity.name}(${entityPk}),
                                ${foreignField} INT REFERENCES ${foreignEntity.name}(${foreignPk})
                              )`;

    await this.dbInstance.client.query(queryDropTable);
    await this.dbInstance.client.query(queryCreateTable);
  }

}
