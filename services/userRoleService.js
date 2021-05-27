const constants = require("../config/constants");
const db = require("../models");
class UserRoleService {
    constructor(){
        this.db =  db;
    }
    async createRole(data){
        try{
           // console.log(data,"-------services");
            const userRoleCreation = await this.db.UserRoles.create(data);                       
            return userRoleCreation;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async fetchRoles(){
        try{
            //console.log(data,"-------");
            const fetchRoles = await this.db.UserRoles.find({}).sort({createDate:-1});                       
            return fetchRoles;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async deleteUserRole(id){
        try{
            //console.log(data,"-------");
            const removedRole = await this.db.UserRoles.deleteOne({_id:id});                       
            return removedRole;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async updateUserRole(id,data){
        try{
            //console.log(data,"-------");
            const updatedRole = await this.db.UserRoles.findOneAndUpdate({_id:id},{$set:data},{new:true});                       
            return updatedRole;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async isUserRoleExisted(roleType) {
        try{
            //console.log(data,"-------");
            const userRole = await this.db.UserRoles.findOne({role:roleType},{_id:1});                       
            return userRole;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
}

module.exports = new UserRoleService();