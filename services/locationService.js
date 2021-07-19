const db = require("../models");
class LocationService {
  constructor() {
    this.db = db;
  }
  async createCountry(data) {
    try {
      //console.log(data,"-------");
      let countryCreation = await this.db.Countries.create(data);
      return {
        data: countryCreation,
        status: true
      }
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async fetchCountries() {
    try {
      //console.log(data,"-------");
      let fetchCountries = await this.db.Countries.find({ active: true }).sort({
        country: 1
      });
      return {
        data: fetchCountries,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
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
      return {
        data: updateCountry,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }

  async getCountry(id) {
    try {
      //console.log(data,"-------");
      let getCountry = await this.db.Countries.findOne({ _id: id });
      return {
        data: getCountry,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }

  async deleteCountry(id) {
    try {
      //console.log(data,"-------");
      let deletedCountry = await this.db.Countries.deleteOne({ _id: id });
      return {
        data: deletedCountry,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async createState(data) {
    try {
      //console.log(data,"-------");
      let stateCreation = await this.db.States.create(data);
      return {
        data: stateCreation,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async fetchStates(id) {
    try {
      //console.log(data,"-------");
      let fetchStates = await this.db.States.find({ country: id, active: true }).sort({ createDate: -1, active: - 1 });
      return {
        data: fetchStates,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async getState(id) {
    try {
      //console.log(data,"-------");
      let getState = await this.db.States.findOne({ _id: id });
      return {
        data: getState,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }

  async deleteState(id) {
    try {
      //console.log(data,"-------");
      let deletedState = await this.db.States.deleteOne({ _id: id });
      return {
        data: deletedState,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
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
      return {
        data: updateState,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }

  async createCity(data) {
    try {
      //console.log(data,"-------");
      let cityCreation = await this.db.Cities.create(data);
      return {
        data: cityCreation,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async fetchCities(id) {
    try {
      //console.log(data,"-------");
      let fetchCities = await this.db.Cities.find({ state: id, active: true }).sort({ createDate: -1, active: -1 });
      return {
        data: fetchCities,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async getCity(id) {
    try {
      //console.log(data,"-------");
      let getCity = await this.db.Cities.findOne({ _id: id });
      return {
        data: getCity,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }

  async deleteCity(id) {
    try {
      //console.log(data,"-------");
      let deletedCity = await this.db.Cities.deleteOne({ _id: id });
      return {
        data: deletedCity,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
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
      return {
        data: updateCity,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
}

module.exports = new LocationService();
