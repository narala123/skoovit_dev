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
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.get("/getcountries", async (req, res) => {
    try {
      let data = await locationService.fetchCountries();
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
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
      return userPermission.generateError(constants.STATUS_500, e);
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
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.get("/deletecountry/:id", async (req, res) => {
    try {
      let data = await locationService.deleteCountry(req.params.id);
      res.json({
        statusCode: constants.STATUS_200,
        message: constants.STATUS_MSG_Delete,
      });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.post("/createstates", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.createState(req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.get("/getstates", async (req, res) => {
    try {
      let data = await locationService.fetchStates();
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.post("/updatestate/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateState(req.params.id, req.body);
      res.json({
        statusCode: constants.STATUS_200,
        message: constants.STATUS_MSG_Update,
      });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.get("/getstate/:id", async (req, res) => {
    try {
      let data = await locationService.getState(req.params.id);
      res.json({
        statusCode: constants.STATUS_200,
        data: data,
      });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.get("/deletestate/:id", async (req, res) => {
    try {
      let data = await locationService.deleteState(req.params.id);
      res.json({
        statusCode: constants.STATUS_200,
        message: constants.STATUS_MSG_Delete,
      });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  return api;
};
