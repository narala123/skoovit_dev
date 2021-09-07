const db = require("../models");
const auth = require("../config/middlewares/authorization");

class AdminService {
  constructor() {
    this.db = db;
  }

  // get admin by user name and password
  async validateAdmin(email, password) {
    try {
      //console.log(email,"-------",password);
      let admin = await this.db.Admin.findOne({ email: email, password:password });
      //console.log(await auth.admin_create_token(admin._id));
      let data = JSON.parse(JSON.stringify(admin));
      data.token=  await auth.admin_create_token(data._id);
      return data;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  // get admin by Id for validation
  async getAdmin(id) {
    try {
      //console.log(data,"-------");
      const admin = await this.db.Admin.findOne({ _id:id});      
      return admin;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  };



  /*
    categories
*/
  async createCategory(data) {
    try {
      //console.log(data,"-------");
      let countryCreation = await this.db.Categories.create(data);
      return countryCreation;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async fetchCategories(id) {
    try {
      //console.log(data,"-------");
      let fetchCountries = await this.db.Categories.find({ active: true }).sort({
        createDate: -1
      });
      return fetchCountries;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async updateCategory(cId, data) {
    try {
      //console.log(data,"-------");
      let updateCountry = await this.db.Categories.findOneAndUpdate(
        { _id: cId },
        { $set: data },
        { new: true }
      );
      return updateCountry;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  async getCategory(cId) {
    try {
      //console.log(data,"-------");
      let getCountry = await this.db.Categories.findOne({ _id: cId });
      return getCountry;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  async deleteCategory(cId) {
    try {
      //console.log(data,"-------");
      let deletedCountry = await this.db.Categories.deleteOne({ _id: cId });
      return deletedCountry;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  /*
  sub-categories
*/
  async createSubCategory(data) {
    try {
      //console.log(data,"-------");
      let stateCreation = await this.db.SubCategories.create(data);
      return stateCreation;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async fetchSubCategories(catId) {
    try {
      //console.log(data,"-------");
      let fetchStates = await this.db.SubCategories.find({ category: catId, active: true }).sort({ createDate: -1 });
      return fetchStates;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async getSubCategory(subCId) {
    try {
      //console.log(data,"-------");
      let getState = await this.db.SubCategories.findOne({ _id: subCId });
      return getState;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  async deleteSubCategory(subCId) {
    try {
      //console.log(data,"-------");
      let deletedState = await this.db.SubCategories.deleteOne({ _id: subCId });
      return deletedState;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async updateSubCategory(subCId, data) {
    try {
      //console.log(data,"-------");
      let updateState = await this.db.SubCategories.findOneAndUpdate(
        { _id: subCId },
        { $set: data },
        { new: true }
      );
      return updateState;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  /*
    Skills
  */
  async createSkills(data) {
    try {
      //console.log(data,"-------");
      let skill = await this.db.Skills.create(data);
      return skill;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  };
  async fetchSkills(scId) {
    try {
      //console.log(data,"-------");
      let skills = await this.db.Skills.find({ subCategory: scId }).sort({ skill: 1 });
      return skills;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  };

  /*
    languages
  */
  async createLanguage(data) {
    try {
      //console.log(data,"-------");
      let cityCreation = await this.db.Languages.create(data);
      return cityCreation;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async fetchLanguages() {
    try {
      //console.log(data,"-------");
      let fetchCities = await this.db.Languages.find({ active: true }).sort({ createDate: -1 });
      return fetchCities;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async getLanguage(id) {
    try {
      //console.log(data,"-------");
      let getCity = await this.db.Languages.findOne({ _id: id });
      return getCity;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  async deleteLanguage(id) {
    try {
      //console.log(data,"-------");
      let deletedCity = await this.db.Languages.deleteOne({ _id: id });
      return deletedCity;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async updateLanguage(id, data) {
    try {
      //console.log(data,"-------");
      let updateCity = await this.db.Languages.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      return updateCity;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  };
  /*
    educations
  */
  async createEducation(data) {
    try {
      //console.log(data,"-------");
      let cityCreation = await this.db.Educations.create(data);
      return cityCreation;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async fetchEducations() {
    try {
      //console.log(data,"-------");
      let fetchCities = await this.db.Educations.find({ active: true }).sort({ createDate: -1 });
      return fetchCities;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async getEducation(id) {
    try {
      //console.log(data,"-------");
      let getCity = await this.db.Educations.findOne({ _id: id });
      return getCity;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }

  async deleteEducation(id) {
    try {
      //console.log(data,"-------");
      let deletedCity = await this.db.Educations.deleteOne({ _id: id });
      return deletedCity;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  }
  async updateEducation(id, data) {
    try {
      //console.log(data,"-------");
      let updateCity = await this.db.Educations.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      return updateCity;
    } catch (e) {
      //console.error("error",e)
      throw new Error(e);
    }
  };
  async createGlobalAds(data) {
    try {
      // console.log(data,"-------");
      let globalAd = await this.db.GlobalAds.create(data);
      return globalAd;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };
  async createRegionAds(data) {
    try {
      // console.log(data,"-------");
      let regionAd = await this.db.RegionAds.create(data);
      return regionAd;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };
  async getGlobalAds(data) {
    try {
      //console.log(data,"-------");
      let globalAds = await this.db.GlobalAds.find({});
      return globalAds;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };
  async getRegionalAds() {
    try {
      //console.log(data,"-------");
      let regionads = await this.db.RegionAds.find({});
      return regionAds;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };
  /*
      Manage users
    */

    // get all users list by admin
  async allUsersInfo() {
    try {
      //console.log(data,"-------");
      let users = await this.db.User.find({isDelete:false});
      return users;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };

   // hide or block user by admin
   async userHideOrBlockStatusUpdate(userId, updateInfo) {
    try {
      //console.log(data,"-------");
      let user = await this.db.User.findOneAndUpdate({_id:userId},{$set:updateInfo});
      return user;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };

  // delete user by admin
  async userDeleteStatusUpdate(userId) {
    try {
      //console.log(data,"-------");
      let user = await this.db.User.findOneAndUpdate({_id:userId},{$set:{isDelete:true}});
      return user;
    } catch (e) {
      console.log("error", e)
      throw new Error(e);
    }
  };


}

module.exports = new AdminService();
