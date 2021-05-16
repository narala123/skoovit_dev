const db = require("../models");
class UserRoleService {
    constructor(){
        this.db =  db;
    }
    async createRole(data){
        try{
            console.log(data,"-------services");
            let userRoleCreation = await this.db.UserRoles.create(data);                       
            return userRoleCreation;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async fetchRoles(){
        try{
            //console.log(data,"-------");
            let fetchRoles = await this.db.UserRoles.find({}).sort({createDate:-1});                       
            return fetchRoles;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async deleteUserRole(id){
        try{
            //console.log(data,"-------");
            let removedRole = await this.db.UserRoles.deleteOne({_id:id});                       
            return removedRole;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async updateUserRole(id,data){
        try{
            //console.log(data,"-------");
            let updatedRole = await this.db.UserRoles.findOneAndUpdate({_id:id},{$set:data},{new:true});                       
            return updatedRole;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
}

module.exports = new UserRoleService();