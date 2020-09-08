import Entity from "./entity";

export default class Project extends Entity {
  constructor(dbInstance) { super(dbInstance, "Project"); }

  static meta() {
    return {
      name: "Project",
      columns: {
        id: {
          primary: true,
          generated: true
        },
        name: {
          type: "string"
        }
      }
    };
  }
}
