const db = require("../models");

class UserService {
  constructor() {
    this.db = db;
  }

  async signup(data) {
   
    try {
      //console.log(data,"-------");
      let signupdata = await this.db.User.create(data);
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
  }
}

module.exports = new UserService();
