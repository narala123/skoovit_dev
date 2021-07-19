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
      res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201,message:constants.STATUS_MSG_201,data: data });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message, status: constants.STATUS_FALSE });
    }
  });
  api.get("/getcountries", async (req, res) => {
    try {
      let data = await locationService.fetchCountries();
      res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200,message: constants.STATUS_MSG_200, data: data });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.post("/updatecountry/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateCountry(req.params.id, req.body);
      res.status(constants.STATUS_200).send({
        statusCode: constants.STATUS_200,
        message: constants.STATUS_MSG_200,
        message: constants.STATUS_MSG_Update,
      });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getcountry/:id", async (req, res) => {
    try {
      let data = await locationService.getCountry(req.params.id);
      res.status(constants.STATUS_200).send({
        statusCode: constants.STATUS_200,
        message: constants.STATUS_MSG_200,
        data: data,
      });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.get("/deletecountry/:id", async (req, res) => {
    try {
      let data = await locationService.deleteCountry(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message,  status: constants.STATUS_FALSE });
    }
  });
  api.post("/createstate", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.createState(req.body);
      return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message, status: constants.STATUS_FALSE });
    }
  });
  api.get("/getstates/:id", async (req, res) => {
    try {
      let data = await locationService.fetchStates(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message, status: constants.STATUS_FALSE });
    }
  });
  api.post("/updatestate/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateState(req.params.id, req.body);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getstate/:id", async (req, res) => {
    try {
      let data = await locationService.getState(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.post("/deletestate/:id", async (req, res) => {
    try {
      let data = await locationService.deleteState(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.post("/createcity", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.createCity(req.body);
      return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message,status: constants.STATUS_FALSE });
    }
  });
  api.get("/getcities/:id", async (req, res) => {
    try {
      let data = await locationService.fetchCities(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message, status: constants.STATUS_FALSE });
    }
  });
  api.post("/updatecity/:id", async (req, res) => {
    try {
      //console.log(req.body);
      let data = await locationService.updateCity(req.params.id, req.body);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getcity/:id", async (req, res) => {
    try {
      let data = await locationService.getCity(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data:e.message,status: constants.STATUS_FALSE });
    }
  });

  api.post("/deletecity/:id", async (req, res) => {
    try {
      let data = await locationService.deleteCity(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500,data:e.message, status: constants.STATUS_FALSE });
    }
  });

  return api;
};
