class Feat {
  static handler() {
    return this.reply({ code: 202 }, 'Superfluous command');
  }

  static get directive() {
    return 'FEAT';
  }

  static get help() {
    return '{{cmd}}';
  }

  static get description() {
    return 'Get the feature list implemented by the server';
  }

  static get auth() {
    return false;
  }
}

module.exports = Feat;
