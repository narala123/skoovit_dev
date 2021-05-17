const db = require("../models");
class LocationService {
  constructor() {
    this.db = db;
  }
  async createCountry(data) {
    try {
      //console.log(data,"-------");
      let countryCreation = await this.db.Countries.create(data);
      return countryCreation;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async fetchCountries() {
    try {
      //console.log(data,"-------");
      let fetchCountries = await this.db.Countries.find({}).sort({
        createDate: -1,
      });
      return fetchCountries;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async updateCountry(id, data) {
    try {
      //console.log(data,"-------");
      let updateCountry = await this.db.Countries.findOneAndUpdate(
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

  async getCountry(id) {
    try {
      //console.log(data,"-------");
      let getCountry = await this.db.Countries.findOne({ _id: id });
      return getCountry;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async deleteCountry(id) {
    try {
      //console.log(data,"-------");
      let deletedCountry = await this.db.Countries.deleteOne({ _id: id });
      return deletedCountry;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async createState(data) {
    try {
      //console.log(data,"-------");
      let stateCreation = await this.db.States.create(data);
      return stateCreation;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async fetchStates() {
    try {
      //console.log(data,"-------");
      let fetchStates = await this.db.States.find({}).sort({ createDate: -1 });
      return fetchStates;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async getState(id) {
    try {
      //console.log(data,"-------");
      let getState = await this.db.States.findOne({ _id: id });
      return getState;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async deleteState(id) {
    try {
      //console.log(data,"-------");
      let deletedState = await this.db.States.deleteOne({ _id: id });
      return deletedState;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async updateState(id, data) {
    try {
      //console.log(data,"-------");
      let updateState = await this.db.States.findOneAndUpdate(
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

  async createCity(data) {
    try {
      //console.log(data,"-------");
      let cityCreation = await this.db.Cities.create(data);
      return cityCreation;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async fetchCities() {
    try {
      //console.log(data,"-------");
      let fetchCities = await this.db.Cities.find({}).sort({ createDate: -1 });
      return fetchCities;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async getCity(id) {
    try {
      //console.log(data,"-------");
      let getCity = await this.db.Cities.findOne({ _id: id });
      return getCity;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }

  async deleteCity(id) {
    try {
      //console.log(data,"-------");
      let deletedCity = await this.db.Cities.deleteOne({ _id: id });
      return deletedCity;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async updateCity(id, data) {
    try {
      //console.log(data,"-------");
      let updateCity = await this.db.Cities.findOneAndUpdate(
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

module.exports = new LocationService();
