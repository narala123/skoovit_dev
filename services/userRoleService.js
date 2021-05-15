let db = require("../models")
class UserRoleService {
    constructor(){
        this.db =  db;
    }
   async createRole(data){
        try{
            //console.log(data,"-------");
            let userRoleCreation = await this.db.UserRoles.create(data);                       
            return userRoleCreation;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    }
}

module.exports = new UserRoleService();