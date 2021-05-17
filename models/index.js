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
        };
    }
}


module.exports = new Models().collection;