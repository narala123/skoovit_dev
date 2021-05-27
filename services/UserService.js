const db = require("../models");
const auth = require("../config/middlewares/authorization");

exports.otpGen = ()=> {
  return Math.floor(1000 + Math.random() * 9000);
};

class UserService {
  constructor() {
    this.db = db;
  }
  
  async isUserExist(data){
    try {
      return await this.db.User.findOne({$or:[{email:data.email},{mobile:data.mobile}]});
    }catch(e) {
      return e.message;
    } 
  };

  async signup(data) {
    try {     
      const signupdata = await this.db.User.create(data);
      return signupdata;
    } catch (e) {
      //console.error("error",e)
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
      let getuser = await this.db.User.find({ _id: id });
      return getuser;
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
      const verifyMobile = await this.db.User.findOne({mobile:mobile});
      if(verifyMobile){
        let otp = otpGen();
        return await this.db.User.findOneAndUpdate({mobile:mobile},{$set:{otp:2021, otpTime: Date.now}},{new:true});        
      }
      return verifyMobile;      
    } catch (e) {
      return e.message;
    }
  };

  // to verify otp and login
  async verifyOtp(mobile, otp) {
    try {      
      const loginUser = await this.db.User.findOne({mobile:mobile,otp:otp},{otp:0});
      if(loginUser){  
        loginUser.token =  await auth.create_token(loginUser._id, __, loginUser.userType);    
        return loginUser;      
      }else {
        return loginUser; 
      }           
    } catch (e) {
      return e.message;
    }
  };
}

module.exports = new UserService();
