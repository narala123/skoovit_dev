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
            return {
                data:userRoleCreation,
                status: true
            }
        }catch(e){
            //console.error("error",e)
            return {
                data:e.message,
                status: false
            }
        }
    };
    async fetchRoles(){
        try{
            //console.log(data,"-------");
            const fetchRoles = await this.db.UserRoles.find({}).sort({createDate:-1});                       
            return {
                data:fetchRoles,
                status: true
            }
        }catch(e){
            //console.error("error",e)
            return {
                data:e.message,
                status: false
            }
        }
    };
    async deleteUserRole(id){
        try{
            //console.log(data,"-------");
            const removedRole = await this.db.UserRoles.deleteOne({_id:id});                       
            return {
                data:removedRole,
                status: true
            }
        }catch(e){
            //console.error("error",e)
            return {
                data:e.message,
                status: false
            }
        }
    };
    async updateUserRole(id,data){
        try{
            //console.log(data,"-------");
            const updatedRole = await this.db.UserRoles.findOneAndUpdate({_id:id},{$set:data},{new:true});                       
            return {
                data:updatedRole,
                status: true
            }
        }catch(e){
            //console.error("error",e)
            return {
                data:e.message,
                status: false
            }
        }
    };
    async isUserRoleExisted(roleType) {
        try{
            //console.log(data,"-------");
            const userRole = await this.db.UserRoles.findOne({role:roleType},{_id:1});                       
            return {
                data:userRole,
                status: true
            }
        }catch(e){
            //console.error("error",e)
            return {
                data: e.message,
                status: false
            }
        }
    };
}

module.exports = new UserRoleService();