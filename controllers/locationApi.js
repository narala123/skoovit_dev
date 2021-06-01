const userPermission = require("../config/middlewares/authorization");
const locationService = require("../services/locationService");
const constants = require("../config/constants");

module.exports = function (express) {
  let api = express.Router();
  //api.use(userPermission.isValidUser);
  api.post("/createcountry", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.createCountry(req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
         return e;
    }
  });
  api.get("/getcountries", async (req, res) => {
    try {
      let data = await locationService.fetchCountries();
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
         return e;
    }
  });

  api.post("/updatecountry/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateCountry(req.params.id, req.body);
      res.json({
        statusCode: constants.STATUS_200,
        message: constants.STATUS_MSG_Update,
      });
    } catch (e) {
         return e;
    }
  });

  api.get("/getcountry/:id", async (req, res) => {
    try {
      let data = await locationService.getCountry(req.params.id);
      res.json({
        statusCode: constants.STATUS_200,
        data: data,
      });
    } catch (e) {
         return e;
    }
  });

  api.get("/deletecountry/:id", async (req, res) => {
    try {
      let data = await locationService.deleteCountry(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
      return e;
    }
  });
  api.post("/createstate", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.createState(req.body);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
      return e;
    }
  });
  api.get("/getstates/:id", async (req, res) => {
    try {
      let data = await locationService.fetchStates(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
      return e;
    }
  });
  api.post("/updatestate/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateState(req.params.id, req.body);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
      return e;
    }
  });

  api.get("/getstate/:id", async (req, res) => {
    try {
      let data = await locationService.getState(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
      return e;
    }
  });

  api.post("/deletestate/:id", async (req, res) => {
    try {
      let data = await locationService.deleteState(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 , status:constants.STATUS_TRUE });
    } catch (e) {
      return e;
    }
  });

  api.post("/createcity", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.createCity(req.body);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
        return e;
    }
  });
  api.get("/getcities/:id", async (req, res) => {
    try {
      let data = await locationService.fetchCities(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
    } catch (e) {
        return e;
    }
  });
  api.post("/updatecity/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateCity(req.params.id, req.body);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200, data: data, status:constants.STATUS_TRUE });
    } catch (e) {
        return e;
    }
  });

  api.get("/getcity/:id", async (req, res) => {
    try {
      let data = await locationService.getCity(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200, data: data, status:constants.STATUS_TRUE });
    } catch (e) {
        return e;
    }
  });

  api.post("/deletecity/:id", async (req, res) => {
    try {
      let data = await locationService.deleteCity(req.params.id);
      return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200, status:constants.STATUS_TRUE });
    } catch (e) {
        return e;
    }
  });

  return api;
};
