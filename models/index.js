let fs = require("fs");

class Models {
  constructor() {
    this.collection = this.init();
  }

  init() {
    return {
      UserRoles: require("./userRoles"),
      Countries: require("./countries"),
      States: require("./states"),
      Cities: require("./cities"),
      User: require("./user"),
      Plans: require("./plans"),
    };
  }
}

module.exports = new Models().collection;
