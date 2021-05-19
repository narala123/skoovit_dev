const constants = require("../config/constants");
let userPermission = require("../config/middlewares/authorization");
let userService = require("../services/userService");
// const { check, validationResult } = require("express-validator");

module.exports = function (express) {
  let api = express.Router();
  api.post("/signup", async (req, res) => {
    try {
      let data = await userService.signup(req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_400, e);
    }
  });

  api.get("/getusers", async (req, res) => {
    try {
      let data = await userService.getUsers();
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.get("/getuser/:id", async (req, res) => {
    try {
      let data = await userService.getUser(req.params.id);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.post("/isactive/:id", async (req, res) => {
    try {
      let data = await userService.isActive(req.params.id, req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.post("/isdelete/:id", async (req, res) => {
    try {
      let data = await userService.isDelete(req.params.id, req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  api.post("/login", async (req, res) => {
    try {
      digits = "0123456789";
      otpvalue = " ";
      for (let i = 0; i < 6; i++) {
        otpvalue = otpvalue + digits[Math.floor(Math.random() * 10)];
      }
      let data = await userService.login(req.body, otpvalue);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      return userPermission.generateError(constants.STATUS_500, e);
    }
  });

  /*
        To check valid token and user role, works as middleware.
        below of this function all Api's should have token.
        without token Api's can write on top this line.
    */

  //api.use(userPermission.isValidUser);

  api.get("/profile", (req, res) => {
    res.json({ status: true, message: "success" });
  });

  return api;
};
