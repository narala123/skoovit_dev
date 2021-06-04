const constants = require("../config/constants");
let userPermission = require("../config/middlewares/authorization");
let userService = require("../services/UserService");
let userRoleService = require('../services/userRoleService');
const em = require('../utils/event-emitter');
const eventNames = require('../config/event-emitter-constants');
//const passport = require("../config/middlewares/passportAuthentication");
module.exports = function (express,passport) {
  let api = express.Router();
  api.post("/signup", async (req, res) => {
    try {
      const isUserExist = await userService.isUserExist(req.body);
      if (isUserExist) {
        return res.json({ statusCode: constants.STATUS_409, message: constants.STATUS_MSG_409, status: constants.STATUS_FALSE });
      } else {
        const isUserRoleExisted = await userRoleService.isUserRoleExisted("user");
        if (!isUserRoleExisted) {
          return res.json({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404_R, status: constants.STATUS_FALSE });
        }
        req.body['userType'] = isUserRoleExisted._id;
        const data = await userService.signup(req.body);
        if (data) {
          //console.log(data,"data");  
          await userService.sendOtp(data.mobile);
          em.emit(eventNames.Assign_Plan_To_User, { userId: data._id });
          return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data });
        } else {
          return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
      }
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/sendotp", async (req, res) => {
    try {
      let data = await userService.sendOtp(req.body.mobile);
      if (data) {
        return res.json({ statusCode: constants.STATUS_200, message: "OTP Sent Successfully, Please verify to enjoy the features." });
      } else {
        return res.json({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404 });
      }
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/otpverification", async (req, res) => {
    try {
      const verifyOtpWithMobile = await userService.verifyOtp(req.body.mobile, req.body.otp);
      if (verifyOtpWithMobile) {
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: verifyOtpWithMobile });
      } else {
        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_OTPFAIL, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getusers", async (req, res) => {
    try {
      let data = await userService.getUsers();
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getuser/:id", async (req, res) => {
    try {
      let data = await userService.getUser(req.params.id);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/isactive/:id", async (req, res) => {
    try {
      let data = await userService.isActive(req.params.id, req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/isdelete/:id", async (req, res) => {
    try {
      let data = await userService.isDelete(req.params.id, req.body);
      res.json({ statusCode: constants.STATUS_200, data: data });
    } catch (e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  /*
        To check valid token and user role, works as middleware.
        below of this function all Api's should have token.
        without token Api's can write on top this line.
    */

  //api.use(userPermission.isValidUser);

  /*
    Facebbok Strategy
  */
  api.get("/profile", (req, res) => {
    res.json({ status: true, message: "success" });
  });

  api.get("/auth/facebook", passport.authenticate('facebook',{scope:"email"}));

  api.get("/auth/facebook/callback",passport.authenticate('facebook', { successRedirect: '/user/auth/fbSucess',
  failureRedirect: '/user/auth/failure' }))

  api.get('/auth/fbSucess',(req,res)=>{
    return res.json({success:true,message:"login completed successfully"});
  });

  

  /*
    Google Strategy
  */

    api.get('/auth/google/token', passport.authenticate('google-token'), (req, res)=> {
      res.send(req.user);
    });
  // api.get('/auth/google',
  // passport.authenticate('google', { scope: ['profile', 'email'] }));

  // api.get('/auth/google/callback', 
  //   passport.authenticate('google', { failureRedirect: '/user/auth/failure' }), (req, res)=> {
  //     console.log(req,"req----------------")
  //     return res.json({success:true,message:"login completed successfully"});
  //   }
  // );

  api.get("/auth/failure",(req,res)=>{
    return res.json({success:false,message:"Please Check your credentials"});
  });

  return api;
};
