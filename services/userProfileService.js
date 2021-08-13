const db = require("../models");
const mongoose = require('mongoose');
class UserProfileService {
    constructor() {
        this.db = db;
    }
    async createUserProfile(data) {
        try {
            return await this.db.UserProfiles.create(data);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };

    async getUserProfileWithUserId(userId) {
        try {
            return await this.db.UserProfiles.findOne({ userId: userId });
        } catch (e) {
            console.log(e);
            throw new Error(e);;
        }
    };

    async isProfileExisted(userId, profileId) {
        try {
            if (userId === null && profileId) {
                return await this.db.UserProfiles.findOne({ _id: profileId });
            }
            if (userId && profileId) {
                return await this.db.UserProfiles.findOne({ _id: profileId, userId: userId });
            }
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };

    async updateUserProfile(data, profileId) {
        try {
            return await this.db.UserProfiles.findOneAndUpdate({ _id: profileId }, { $set: { experience: data.experience } }, { new: true });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
    async userProfileUpdation(data, userId) {
        try {
            return await this.db.UserProfiles.findOneAndUpdate({ userId: userId }, { $set: data }, { new: true });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
    // with post gallery
    async getUserProfile(profileId) {
        try {
            return await this.db.UserProfiles.aggreagte([{ $match: { _id: profileId } },
            {
                $lookup: {
                    from: "followers",
                    localField: "userId",
                    foreignField: "userId",
                    as: "followersInfo"
                }
            },
            {
                $lookup: {
                    from: "userpost",
                    localField: "userId",
                    foreignField: "userId",
                    as: "postInfo"
                }
            },
            {
                "$addFields": {
                    "postInfo": {
                        "$arrayElemAt": [
                            {
                                "$filter": {
                                    "input": "$postInfo",
                                    "as": "post",
                                    "cond": {
                                        "$eq": ["$$post.visibleTo", "public"]
                                    }
                                }
                            }, 0
                        ]
                    }
                }
            },
            {
                $match: {
                    requestStatus: "Accepted"
                }
            },
            {
                $project: {
                    followersInfo: 1,
                    followersCount: { "$size": "$followersInfo" }
                }
            }
            ]);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
    // for all registered user profiles
    async getUserProfiles(filters) {
        try {
            let obj = {};
            if (filters.length > 0) {
                obj = {
                    $or: filters
                }
            }
            const data = await this.db.UserProfiles.aggregate([{ $match: obj }, {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "countryName"
                }
            }, {
                $lookup: {
                    from: "cities",
                    localField: "city",
                    foreignField: "_id",
                    as: "cityName"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            }
            ]);
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
    // for profiles wathed  user profiles list
    async getUserProfileViwersList(viwersList) {
        try {
            const data = await this.db.UserProfiles.aggregate([{ $match: { userId: { $in: viwersList } } }, {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "countryName"
                }
            }, {
                $lookup: {
                    from: "cities",
                    localField: "city",
                    foreignField: "_id",
                    as: "cityName"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            }
            ]);
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };

    async userProfileViwedListUpdate(userId, toUserId) {
        try {
            const data = await this.db.UserProfiles.updateOne({ userId: toUserId }, { $addToSet: { watchedUsers: userId } });
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    async galleryUpdate(profileId, data, type) {
        try {
            return await this.db.UserProfiles.updateOne({ _id: profileId }, this.getGalleryCondition(type, data)).sort({ createDate: -1 });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
    getGalleryCondition(type, data) {
        let conditon = {};
        switch (type) {
            case "image":
                conditon = { $addToSet: { "gallery.images": data } };
                break;
            case "video":
                conditon = { $addToSet: { "gallery.videos": data } };
                break;
            case "doc":
                conditon = { $addToSet: { "gallery.docs": data } };
                break;
            case "audio":
                conditon = { $addToSet: { "gallery.audios": data } };
                break;
        }
        return conditon

    };

    // entity logo updation
    async entityUpdate(userId, eInfo) {
        try {
            const entityInfo = await this.db.UserProfiles.findOneAndUpdate(
                { userId: mongoose.Types.ObjectId(userId) },
                { $set: { entityForm: eInfo } },
                { new: true }
            );
            return entityInfo
        } catch (e) {
            throw new Error(e);
        }
    };

    // create requirement posts  updateRequirement
    async createRequirement(data) {
        try {
            const requirementPost = await this.db.RequirementPosts.create(data);
            return requirementPost;
        } catch (e) {
            throw new Error(e);
        }
    };

    // update requirement posts  
    async updateRequirement(data, reqId) {
        try {
            const requirementPost = await this.db.RequirementPosts.findOneAndUpdate({ _id: reqId }, { $set: data });
            return requirementPost;
        } catch (e) {
            throw new Error(e);
        }
    };


    // [{"city":"60e7b35230bb5f2bbcebc0cf"},{"country":"60e7b30330bb5f2bbcebc0cc"},{"state":"60e7b33b30bb5f2bbcebc0ce"},{"languages":"Telugu"},{"category":"Actor"},{"subcategory":"side Actor"},{"gender":"Male"}]
    // get all requirments by userId (user self reqs) getAllRequirements
    async getRequirementsByUserId(userId, filters) {
        try {
            let obj = {};
            if (filters.length > 0) {
                obj = {
                    userId: userId,
                    $or: filters
                }
            }else{
                obj = {
                    userId: userId                    
                }
            };
            const reqPosts = await this.db.RequirementPosts.aggregate([{ $mathc: obj }]);
            return reqPosts;
        } catch (e) {
            throw new Error(e);
        }
    };

    // get all requirments to all registered users 
    async getAllRequirements(filters) {
        try {
            let obj = {};
            if (filters.length > 0) {
                obj = {
                    expiredOn : { 
                        $gte: new Date()
                    },                 
                    $or: filters
                }
            }else{
                obj = {
                    expiredOn : { 
                        $gte: new Date()
                    }
                }
            }
            const reqPosts = await this.db.RequirementPosts.aggregate([{ $mathc: obj }]);
            return reqPosts;
        } catch (e) {
            throw new Error(e);
        }
    };
};

module.exports = new UserProfileService();