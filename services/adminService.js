const db = require("../models");
class AdminService {
  constructor() {
    this.db = db;
  }
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
      return e.message;
    }
  }
  async fetchCategories(id) {
    try {
      //console.log(data,"-------");
      let fetchCountries = await this.db.Categories.find({active:true}).sort({
        createDate: -1,active:-1
      });
      return fetchCountries;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async updateCategory(id, data) {
    try {
      //console.log(data,"-------");
      let updateCountry = await this.db.Categories.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      return updateCountry;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async getCategory(id) {
    try {
      //console.log(data,"-------");
      let getCountry = await this.db.Categories.findOne({ _id: id });
      return getCountry;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async deleteCategory(id) {
    try {
      //console.log(data,"-------");
      let deletedCountry = await this.db.Categories.deleteOne({ _id: id });
      return deletedCountry;
    } catch (e) {
      //console.error("error",e)
      return e.message;
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
      return e.message;
    }
  }
  async fetchSubCategories(id) {
    try {
      //console.log(data,"-------");
      let fetchStates = await this.db.SubCategories.find({category:id,active:true}).sort({ createDate: -1 });
      return fetchStates;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async getSubCategory(id) {
    try {
      //console.log(data,"-------");
      let getState = await this.db.SubCategories.findOne({ _id: id });
      return getState;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async deleteSubCategory(id) {
    try {
      //console.log(data,"-------");
      let deletedState = await this.db.SubCategories.deleteOne({ _id: id });
      return deletedState;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async updateSubCategory(id, data) {
    try {
      //console.log(data,"-------");
      let updateState = await this.db.SubCategories.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      return updateState;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
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
      return e.message;
    }
  }
  async fetchLanguages() {
    try {
      //console.log(data,"-------");
      let fetchCities = await this.db.Languages.find({active:true}).sort({ createDate: -1 });
      return fetchCities;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async getLanguage(id) {
    try {
      //console.log(data,"-------");
      let getCity = await this.db.Languages.findOne({ _id: id });
      return getCity;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async deleteLanguage(id) {
    try {
      //console.log(data,"-------");
      let deletedCity = await this.db.Languages.deleteOne({ _id: id });
      return deletedCity;
    } catch (e) {
      //console.error("error",e)
      return e.message;
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
      return e.message;
    }
  }
}

module.exports = new AdminService();
