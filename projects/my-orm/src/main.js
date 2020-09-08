import mOrm from "./mOrm.js";
import pgTest from "./engine/postgresql";

import Student from './entities/student';
import Note from './entities/note';
import Project from './entities/project';

import { logger } from './libs/mLog';

(async () => {
  const orm = new mOrm();

  await orm.createConnection({
    "uri": 'postgresql://postgres:root@localhost:5432/postgres',
    "synchronize": true,
  },{
    entities: [
      Student,
      Note,
      Project
    ]
  }).catch( err => {
    console.log(err);
    process.exit(-1);
  });

  orm.dbInstance.dump();

  let student = {
    firstname: 'Dora',
    lastname: 'Lexploratrice'
  }

  const studentEntity = orm.getEntity('Student');
  const noteEntity = orm.getEntity('Note');
  const projectEntity = orm.getEntity('Project');

  /* Creating keys for relations :D */
  await studentEntity.hasOne(Note);
  /* I didn't succeed in adding getter like : student.getNote ... */


  const studentCount = await studentEntity.count();
  console.log(`Student Row Count: ${studentCount}`);

  const studentInsert = await studentEntity.save({
    firstname: 'Damso',
    lastname: 'Une âme pour deux'
  });
  console.log(studentInsert);
  console.log(`New student inserted: ${studentInsert.firstname} ${studentInsert.lastname}`);

  const studentCountAfterInsert = await studentEntity.count();
  console.log(`Student Row Count After Insert: ${studentCountAfterInsert}`);

  const findStudentByPk = await studentEntity.findByPk(1, {});
  console.log(`Student Find By Pk: ${findStudentByPk.firstname} ${findStudentByPk.lastname}`);

  const findAllStudent = await studentEntity.findAll();
  console.log(`Student Find All: ${findAllStudent.map(student => `${student.firstname} ${student.lastname}`).join(', ')}`);

  const findOneStudentByName = await studentEntity.findOne({
      where: { firstname: "Damso" },
      attributes: ["firstname", "lastname"]
  });
  console.log(`Student Find One By Name: ${findOneStudentByName.firstname} ${findOneStudentByName.lastname}`);

  findStudentByPk.lastname = 'Humain';
  const studentUpdated = await studentEntity.update(findStudentByPk);
  console.log(`Student Updated: ${studentUpdated.firstname} ${studentUpdated.lastname}`);

  const findStudentByPkAfterUpdate = await studentEntity.findByPk(1, {});
  console.log(`Student Find By Pk After Update: ${findStudentByPkAfterUpdate.firstname} ${findStudentByPkAfterUpdate.lastname}`);

  const studentRemoved = await studentEntity.remove(findStudentByPkAfterUpdate);
  console.log(`Student Removed: ${studentRemoved.id} ${studentRemoved.firstname} ${studentRemoved.lastname}`);
})();
