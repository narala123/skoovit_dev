const db = require("../models");

class UserProfileService {
    constructor() {
      this.db = db;
    }
    async createUserProfile(data) {
        try {        
            return await this.db.UserProfiles.create(data);
        } catch(e){
            console.log(e);
            return e.message;
        }
    };

    async isProfileExisted(userId, profileId) {
        try {
            if(userId === null && profileId){
                return await this.db.UserProfiles.findOne({_id:profileId});
            }
            if(userId && profileId){
                return await this.db.UserProfiles.findOne({_id:profileId, userId:userId});
            }            
        } catch(e){
            console.log(e);
            return e.message;
        }
    };

    async updateUserProfile(data, profileId) {
        try {
            return await this.db.UserProfiles.findOneAndUpdate({_id:profileId},{$set:{experience:data.experience}},{new:true});
        } catch(e) {
            console.log(e);
            return e.message;
        }
    };
    async getUserProfile(profileId) {
        try {
            return await this.db.UserProfiles.findOne({_id:profileId});
        } catch(e) {
            console.log(e);
            return e.message;
        }
    };
    async getUserProfiles() {
        try {
            return await this.db.UserProfiles.find({}).sort({createDate:-1});
        } catch(e) {
            console.log(e);
            return e.message;
        }
    };
};
  
module.exports = new UserProfileService();