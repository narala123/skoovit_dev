const db = require("../models");
const auth = require("../config/middlewares/authorization");
const em = require('../utils/event-emitter');
const eventNames = require('../config/event-emitter-constants');

exports.otpGen = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

class UserService {
  constructor() {
    this.db = db;
  }

  async isUserExist(data) {
    try {
      const data =  await this.db.User.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
      return {
        data:data,
        status: true
      }
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  };

  async signup(data, type) {
    try {
      if (type && type === "social Media") {
        const signupdata = await this.db.User.create(data);
        const plansData = await this.db.Plans.findOne({ type: "free" });
        let obj = {};        
        obj["email"] = signupdata.email;
        obj["mobile"] = signupdata.mobile || '';
        obj["_id"] = signupdata._id;
        obj["activePlan"] = {
          "planType": plansData.planType
        }
        em.emit(eventNames.Assign_Plan_To_User, { userId: signupdata._id });
        return {
          data:obj,
          status: true
        };
      }else {
         const signupdata = await this.db.User.create(data);
         return {
          data:signupdata,
          status: true
        }
      }
    } catch (e) {
      //console.error("error", e)
      return {
        data: e.message,
        status: false
      }
    }
  }

  async getUsers() {
    try {
      let getusers = await this.db.User.find({},{otp:0}).sort({ createDate: -1 });
      return {
        data:getusers,
        status: true
      };
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  }

  async getUser(id) {
    try {
      let isUser = await this.db.User.findOne({ _id: id },{otp:0});
      return {
        data:isUser,
        status: true
      };
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  }

  async isActive(id, value) {
    try {
      let isActive = await this.db.User.findOneAndUpdate(
        { _id: id },
        { $set: value },
        { new: true }
      );
      return {
        data:isActive,
        status: true
      };
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  }

  async isDelete(id, value) {
    try {
      let isDelete = await this.db.User.findOneAndUpdate(
        { _id: id },
        { $set: value },
        { new: true }
      );
      return {
        data:isDelete,
        status: true
      };
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  };
  async profilePicUpdate(id, value) {
    try {
      let profileInfo = await this.db.User.findOneAndUpdate(
        { _id: id },
        { $set: value },
        { new: true }
      );
      return profileInfo
    } catch (e) {
      throw new Error(e);
    }
  };
  async sendOtp(mobile) {
    try {
      const verifyMobile = await this.db.User.findOne({ mobile: mobile });
      if (verifyMobile) {
        //let otp = this.otpGen();
        await this.db.User.findOneAndUpdate({ _id: verifyMobile._id }, { otp: 2021, otpTime: Date.now }, { new: true });
        return {
          data:verifyMobile,
          status: true
        };
      } else {
        return {
          data:null,
          status: false
        };
      }
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  };

  // to verify otp and login
  async verifyOtp(mobile, otp) {
    try {
      const loginUser = await this.db.User.findOne({ mobile: mobile, otp: otp }, { otp: 0 });
      if (loginUser) {
        await this.db.User.findOneAndUpdate({ _id: loginUser._id }, { $set: { isMobileVerified: true } }, { new: true });
        const userInfo = await this.db.User.aggregate([{ $match: { mobile: mobile } },
        {
          $lookup: {
            from: "activeplans",
            localField: "_id",
            foreignField: "userId",
            as: "planInfo"
          }
        },
        {
          $unwind: "$planInfo"
        }, {
          $project: {
            "email": 1,
            "mobile": 1,
            "_id": 1,
            "activePlan": {
              "planType": "$planInfo.planType"
            }
          }
        }
        ]);
        userInfo[0].token = await auth.create_token(loginUser._id, "Free", loginUser.userType);
        return {
          data:userInfo,
          status:  true
        };
      } else {
        return {
          data:userInfo,
          status: true
        };
      }
    } catch (e) {
      console.log(e);
      return {
        data: e.message,
        status: false
      }
    }
  };
  async isSocialMediaIdExisted(id, type) {
    try {
      if (type == "google") {
        const data = await this.db.User.findOne({ googleId: id });
        return {
          data:data,
          status: true
        };        
      }
      if (type == "facebook") {
        const data =  this.db.User.findOne({ facebookId: id });
        return {
          data:data,
          status: true
        };
      }
    } catch (e) {
      return {
        data: e.message,
        status: false
      }
    }
  };
  // home page cats and sub-cats
  async homeCategories(){
    try {
      const data = await this.db.Categories.aggregate([{
        $lookup:{
            from: "subcategories",
            localField: "_id",
            foreignField: "category",
            as: "subcategories"
        }
      }]);      
      return {
        data:data,
        status: true
      }; 
    } catch (e) {
      console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };
  async getGlobalAds(data) {
    try {
      //console.log(data,"-------");
      let globalAds = await this.db.GlobalAds.find({expiryDate:{$gte:new Date()}, active:true});
      return {
        data:globalAds,
        status: true
      }; 
    } catch (e) {
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };
  async getRegionalAds(region) {
    try {
      //console.log(data,"-------");
      let regionads = await this.db.RegionAds.find({expiryDate:{$gte:new Date()}, active:true, region:region});
      return {
        data:regionads,
        status: true
      };
    } catch (e) {
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };
  // followed by means follower(who has sent a friend request) and userId means logged in users- userId
  async generateRequest(data) {
    try {
      //console.log(data,"-------");
      const requestInfo = await this.db.Followers.create(data);
      let obj = {...requestInfo};
      obj["entity_type"] = "Request";      
      em.emit(eventNames.GENERATE_NOTIFICATION, obj);
      return {
        data:requestInfo,
        status: true
      };
    } catch (e) {
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };
  // to change the request status of friend request (default--> pending, user can change to Accept/reject)
  // followerId is request Raised person id and user id mean logged in users id he can change the status
  async changeRequestSatus(status, followerId, userId) {
    try {
      //console.log(data,"-------");
      let requestInfo = await this.db.Followers.findOneAndUpdate({followedBy:followerId, userId:userId},{$set:{requestStatus:status}},{new:true});
      let obj = {...requestInfo};
      if(obj['requestStatus'] == "Accept") {
        obj["entity_type"] = "Accept";      
        em.emit(eventNames.GENERATE_NOTIFICATION, obj);
      }      
      return {
        data:requestInfo,
        status: true
      };
    } catch (e) {
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };
  async unFollowRequest(status, followerId, userId) {
    try {
      //console.log(data,"-------");
      let requestInfo = await this.db.Followers.deleteOne({followedBy:followerId, userId:userId});
      return {
        data:requestInfo,
        status: true
      };
    } catch (e) {
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };

  async followerslist(userId) {
    try {
      //console.log(data,"-------");
      let list = await this.db.Followers.find({userId:userId});
      return {
        data:list,
        status: true
      };
    } catch (e) {
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async requestAcceptedfansList(userId){
    try {
      let list = await this.db.Followers.aggregate([{$match:{userId:userId}},
        {
          $lookup:{
            from: "users",
            localField: "followedBy",
            foreignField: "_id",
            as: "fansInfo"
          }
        },
        { $unwind:"$fansInfo" },
        {
          $lookup:{
            from: "userprofile",
            localField: "followedBy",
            foreignField: "userId",
            as: "fanProfileInfo"
          }
        },
        { $unwind:"$fanProfileInfo" },
        {
          $project:{
            "email": "$fansInfo.email",
            "fullName": "$fansInfo.fullName",
            "profileUrl":"$fansInfo.profileUrl",
            "userName":"$fanProfileInfo.userName",
            "category":"$fanProfileInfo.category"
          }
        }
    ]);
      return list;
    } catch(e){
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  // to get followed by and followers list at tags people
  async getToTagFansList(userId){
    try {
      let list = await this.db.Followers.aggregate([{$match:{$or:[{userId:userId, followedBy:userId}]}},
        {
          $lookup:{
            from: "users",
            localField: "followedBy",
            foreignField: "_id",
            as: "userFollowedInfo"
          }
        },
        { $unwind:"$userFollowedInfo" },
        {
          $lookup:{
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userFollowersInfo"
          }
        },
        { $unwind:"$fanProfileInfo" },
        {
          $project:{
            "email": "$userFollowedInfo.email",
            "fullName": "$userFollowedInfo.fullName",
            "profileUrl":"$userFollowedInfo.profileUrl"            
          }
        }
    ]);
      return list;
    } catch(e){
      console.log("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }

}

module.exports = new UserService();
