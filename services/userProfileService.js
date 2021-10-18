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
                return await this.db.UserProfiles.findOne({ $or:[{_id: profileId },{userId:profileId}]});
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

    // with post gallery of self user profile info
    async getSelfUserProfile(profileId) {
        //console.log(profileId)
        try {
             //return await this.db.UserProfiles.find({_id:profileId})
             //let id = mongoose.Schema.(profileId)
            const data =  await this.db.UserProfiles.aggregate([{ $match: { "_id": mongoose.Types.ObjectId(profileId) } },
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
                        from: "userposts",
                        localField: "userId",
                        foreignField: "userId",
                        as: "postInfo"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                {
                    $lookup: {
                        from: "countries",
                        localField: "country",
                        foreignField: "_id",
                        as: "countryName"
                    }
                }, 
                {
                    $lookup: {
                        from: "cities",
                        localField: "city",
                        foreignField: "_id",
                        as: "cityName"
                    }
                },
                {
                    $lookup: {
                        from: "states",
                        localField: "state",
                        foreignField: "_id",
                        as: "stateName"
                    }
                },
                {
                    $project: {
                        followersInfo: 1,
                        followersCount: { "$size": "$followersInfo" },
                        gallery: 1,
                        postInfo: 1,
                        userId: 1,
                        userInfo: 1,
                        countryName: 1,
                        stateName: 1,
                        cityName: 1,
                        experience: 1,
                        category: 1,
                        subCategory: 1,
                        physicalStats: 1,
                        socialMediaLinks: 1,
                        skills: 1,
                        education: 1,
                        entityForm: 1,
                        languages: 1,
                        userName: 1,
                        _id: 1

                    }
                }
            ]);
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };

    // with post gallery of other user profile info(to check other users profiles)
    async getUserProfile(profileId) {
        //console.log(profileId)
        try {
             //return await this.db.UserProfiles.find({_id:profileId})
             //let id = mongoose.Schema.(profileId)
            const data =  await this.db.UserProfiles.aggregate([{ $match: { "_id": mongoose.Types.ObjectId(profileId) } },
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
                    from: "userposts",
                    localField: "userId",
                    foreignField: "userId",
                    as: "postInfo"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "countryName"
                }
            }, 
            {
                $lookup: {
                    from: "cities",
                    localField: "city",
                    foreignField: "_id",
                    as: "cityName"
                }
            },
            {
                $lookup: {
                    from: "states",
                    localField: "state",
                    foreignField: "_id",
                    as: "stateName"
                }
            },
            {
                "$addFields": {
                    "postInfo": {
                        "$filter": {
                            "input": "$postInfo",
                            "as": "postInfo",
                            "cond": {
                                "$eq": ["$$postInfo.visibleTo", "public"]
                            }
                        }
                    }
                }
            },            
            {
                $project: {
                    followersInfo: 1,
                    followersCount: { "$size": "$followersInfo" },
                    gallery: 1,
                    postInfo: 1,
                    userId: 1,
                    userInfo: 1,
                    countryName: 1,
                    stateName: 1,
                    cityName: 1,
                    experience: 1,
                    category: 1,
                    subCategory: 1,
                    physicalStats: 1,
                    socialMediaLinks: 1,
                    skills: 1,
                    education: 1,
                    entityForm: 1,
                    languages: 1,
                    userName: 1,
                    _id: 1

                }
            }
            ]);
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };
    // for all registered user profiles to display list of user profiles 
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
                    from: "states",
                    localField: "state",
                    foreignField: "_id",
                    as: "stateName"
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
    // for profiles watched  user profiles list(who are watched their list)
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
                    from: "states",
                    localField: "state",
                    foreignField: "_id",
                    as: "stateName"
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
    // watched list
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


    // [{"languages":"Telugu"},{"category":"Actor"},{"subCategory":"side Actor"},{"gender":"Male"},{"locations":"surat"},{"remuneration":"102313"}]
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
            const reqPosts = await this.db.RequirementPosts.aggregate([{ $match: obj }]);
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
            const reqPosts = await this.db.RequirementPosts.aggregate([{ $match: obj }]);
            return reqPosts;
        } catch (e) {
            throw new Error(e);
        }
    };

    // get requirement by requiremet Id
    async finOneRequirement(reqId) {
        try {
            const requirementPost = await this.db.RequirementPosts.findOne({ _id: reqId });
            return requirementPost;
        } catch (e) {
            throw new Error(e);
        }
    };

    
  // saving requirments by users ( to save requirements)
  async saveRequirementsByUsers(data) {
    try {
      const saveInfo = await this.db.SavedRequirements.create(data);
      return saveInfo;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  // get saved requirements by userid
  async getSavedRequirementsByUserId(userId) {
    try {
      const savedInfo = await this.db.SavedRequirements.aggregate([{ $match: { userId: mongoose.Types.ObjectId(userId) } }, {
        $lookup: {
          from: "savedrequirements",
          localField: "requirementId",
          foreignField: "_id",
          as: "requirementsInfo"
        }
      },
      { $unwind: "$requirementsInfo" }
      ]);
      return savedInfo;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  // applying requirments by users ( to save requirements of applied ingo)
  async saveApplicationsByUsers(data) {
    try {
      const aplliedInfo = await this.db.AppliedRequirements.create(data);
      return aplliedInfo;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  // get applied requirements info by userid
  async getAppliedRequirementsByUserId(userId) {
    try {
      const appliedInfo = await this.db.appliedrequirements.aggregate([{ $match: { requirementAplliedUserId: mongoose.Types.ObjectId(userId) } }, {
        $lookup: {
          from: "savedrequirements",
          localField: "requirementId",
          foreignField: "_id",
          as: "appliedrequirementsInfo"
        }
      },
      { $unwind: "$appliedrequirementsInfo" },

      ]);
      return appliedInfo;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

module.exports = new UserProfileService();
