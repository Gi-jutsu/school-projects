import Entity from "./entity";

export default class Note extends Entity {
  constructor(dbInstance) { super(dbInstance, "Note"); }

  static meta() {
    return {
      name: "Note",
      columns: {
        id: {
          primary: true,
          generated: true
        },
        note: {
          type: "number"
        },
        student_id: {
          references: "Student(id)",
          type: "number"
        },
        //belongs_to: "Project" //https://stackoverflow.com/questions/51779558/sql-belong-to-logic
      }
    };
  }
}
