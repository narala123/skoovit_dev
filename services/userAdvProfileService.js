const db = require("../models");
const mongoose = require('mongoose');
class UserAdvProfileService {
    constructor() {
        this.db = db;
    }
    
    // create user adv 
    async createUserAdvertisement(data) {
        try {
            return await this.db.UserAdvProfiles.create(data);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };

    // by userId
    async fetchUserAdvertisements(userId) {
        try {
            return await this.db.UserAdvProfiles.find({ userId: userId }).sort({createDate:-1});
        } catch (e) {
            console.log(e);
            throw new Error(e);;
        }
    };
    // to all users by all users adds
    async fetchAllUserAdvertisements() {
        try {
            return await this.db.UserAdvProfiles.find().sort({createDate:-1});
        } catch (e) {
            console.log(e);
            throw new Error(e);;
        }
    };
}

module.exports = new UserAdvProfileService();