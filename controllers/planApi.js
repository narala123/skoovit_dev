let userPermission = require("../config/middlewares/authorization");
let planService = require("../services/planService");
let constants = require("../config/constants");

module.exports = function (express) {
  let api = express.Router();
  api.post("/createplan", async (req, res) => {
    try {
      let data = await planService.createPlan(req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.get("/getplans", async (req, res) => {
    try {
      let data = await planService.getPlans();
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.get("/getplan/:id", async (req, res) => {
    try {
      let data = await planService.getPlan(req.params.id);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.post("/updateplan/:id", async (req, res) => {
    try {
      let data = await planService.updatePlan(req.params.id, req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });
  api.get("/deleteplan/:id", async (req, res) => {
    try {
      let data = await planService.deletePlan(req.params.id);
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
