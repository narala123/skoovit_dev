let fs = require("fs");

class Models {
    constructor() {
        this.collection = this.init();
    }

    init() {
        return {
            UserRoles: require("./userRoles")
        };
    }
}


module.exports = new Models().collection;