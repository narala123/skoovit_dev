let userPermission = require("../config/middlewares/authorization");
let planService = require("../services/planService");
let constants = require("../config/constants");

module.exports = function (express) {
  let api = express.Router();
  api.post("/createplan", async (req, res) => {
    try {
      let data = await planService.createPlan(req.body);
      if (data.status) {
        return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_201, data: data.data });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
    }
  });
  api.get("/getplans", async (req, res) => {
    try {
      let data = await planService.getPlans();
      if (data.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      //console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
    }
  });
  api.get("/getplan/:id", async (req, res) => {
    try {
      let data = await planService.getPlan(req.params.id);
      if (data.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
    }
  });
  api.post("/updateplan/:id", async (req, res) => {
    try {
      let data = await planService.updatePlan(req.params.id, req.body);
      if (data.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
    }
  });
  api.get("/deleteplan/:id", async (req, res) => {
    try {
      let data = await planService.deletePlan(req.params.id);
      if (data.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200 });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
    }
  });
  return api;
};
