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
      return await this.db.User.findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });
    } catch (e) {
      return e.message;
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
        return obj;
      }else {
        return await this.db.User.create(data);
      }
    } catch (e) {
      console.error("error", e)
      return e.message;
    }
  }

  async getUsers() {
    try {
      let getusers = await this.db.User.find({}).sort({ createDate: -1 });
      return getusers;
    } catch (e) {
      return e.message;
    }
  }

  async getUser(id) {
    try {
      let isUser = await this.db.User.findOne({ _id: id });
      return isUser;
    } catch (e) {
      return e.message;
    }
  }

  async isActive(id, value) {
    try {
      let isActive = await this.db.User.findOneAndUpdate(
        { _id: id },
        { $set: value },
        { new: true }
      );
      return isActive;
    } catch (e) {
      return e.message;
    }
  }

  async isDelete(id, value) {
    try {
      let isDelete = await this.db.User.findOneAndUpdate(
        { _id: id },
        { $set: value },
        { new: true }
      );
      return isDelete;
    } catch (e) {
      return e.message;
    }
  };

  async sendOtp(mobile) {
    try {
      const verifyMobile = await this.db.User.findOne({ mobile: mobile });
      if (verifyMobile) {
        //let otp = this.otpGen();
        return await this.db.User.findOneAndUpdate({ _id: verifyMobile._id }, { otp: 2021, otpTime: Date.now }, { new: true });
      } else {
        return verifyMobile;
      }
    } catch (e) {

      return e.message;
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
        return userInfo;
      } else {
        return loginUser;
      }
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };
  async isSocialMediaIdExisted(id, type) {
    try {
      if (type == "google") {
        return this.db.User.findOne({ googleId: id });
      }
      if (type == "facebook") {
        return this.db.User.findOne({ facebookId: id });
      }
    } catch (e) {
      return e.message;
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
      return data;
    } catch (e) {
      console.error("error",e)
      return e.message;
    }
  };
  async getGlobalAds(data) {
    try {
      //console.log(data,"-------");
      let globalAds = await this.db.GlobalAds.find({expiryDate:{$gte:new Date()}, active:true});
      return globalAds;
    } catch (e) {
      console.log("error",e)
      return e.message;
    }
  };
  async getRegionalAds(region) {
    try {
      //console.log(data,"-------");
      let regionads = await this.db.RegionAds.find({expiryDate:{$gte:new Date()}, active:true, region:region});
      return regionAds;
    } catch (e) {
      console.log("error",e)
      return e.message;
    }
  };
  async generateRequest(data) {
    try {
      //console.log(data,"-------");
      let requestInfo = await this.db.Followers.create(data);
      return requestInfo;
    } catch (e) {
      console.log("error",e)
      return e.message;
    }
  };
  async changeRequestSatus(status, followerId, userId) {
    try {
      //console.log(data,"-------");
      let requestInfo = await this.db.Followers.findOneAndUpdate({followedBy:followerId, userId:userId},{$set:{requestStatus:status}},{new:true});
      return requestInfo;
    } catch (e) {
      console.log("error",e)
      return e.message;
    }
  };
  async unFollowRequest(status, followerId, userId) {
    try {
      //console.log(data,"-------");
      let requestInfo = await this.db.Followers.deleteOne({followedBy:followerId, userId:userId});
      return requestInfo;
    } catch (e) {
      console.log("error",e)
      return e.message;
    }
  };

  async followerslist(userId) {
    try {
      //console.log(data,"-------");
      let list = await this.db.Followers.find({userId:userId});
      return list;
    } catch (e) {
      console.log("error",e)
      return e.message;
    }
  }

}

module.exports = new UserService();
