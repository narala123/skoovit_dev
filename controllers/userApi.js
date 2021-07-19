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
      if (isUserExist.status) {
        return res.status(constants.STATUS_409).send({ statusCode: constants.STATUS_409, message: constants.STATUS_MSG_409, status: constants.STATUS_FALSE });
      } else {
        const isUserRoleExisted = await userRoleService.isUserRoleExisted("user");
        if (!isUserRoleExisted.status) {
          return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404_R, status: constants.STATUS_FALSE });
        }
        req.body['userType'] = isUserRoleExisted._id;
        const data = await userService.signup(req.body);
        if (data.status) {
          //console.log(data,"data");  
          await userService.sendOtp(data.data.mobile);
          em.emit(eventNames.Assign_Plan_To_User, { userId: data.data._id });
          return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, status: constants.STATUS_TRUE, data: data.data });
        } else {
          return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: data.data, status: constants.STATUS_FALSE });
        }
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/sendotp", async (req, res) => {
    try {
      let data = await userService.sendOtp(req.body.mobile);
      if (data.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200,status: constants.STATUS_TRUE, message: "OTP Sent Successfully, Please verify to enjoy the features." });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401,status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/otpverification", async (req, res) => {
    try {
      const verifyOtpWithMobile = await userService.verifyOtp(req.body.mobile, req.body.otp);
      if (verifyOtpWithMobile.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: verifyOtpWithMobile.data });
      } else {
        return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, data: verifyOtpWithMobile.data, message: constants.STATUS_MSG_OTPFAIL, status: constants.STATUS_FALSE });
      }
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getusers", async (req, res) => {
    try {
      let data = await userService.getUsers();
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get("/getuser/:id", async (req, res) => {
    try {
      let data = await userService.getUser(req.params.id);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/isactive/:id", async (req, res) => {
    try {
      let data = await userService.isActive(req.params.id, req.body);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post("/isdelete/:id", async (req, res) => {
    try {
      let data = await userService.isDelete(req.params.id, req.body);
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });
    } catch (e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  api.get("/homecategories", async (req, res) =>{
    try {
        let data = await userService.homeCategories();
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });

    }catch(e) {
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get('/globalads', async (req, res) =>{
    try {
      let data = await userService.getGlobalAds();
      return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });
    }catch(e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get('/regionalads', async (req, res) =>{
    try {
      if(req.query.q){
        let data = await userService.getregionalAds(req.query.q);
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:data.data });
      }else{
        return res.res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_FALSE });
      }      
    }catch(e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  api.post('/userrequests', async (req, res) =>{
    try {      
      let requestData = await userService.generateRequest(req.body);
      if(requestData.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data:requestData.data });
      }else{
        return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_FALSE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  

  api.post('/requeststatus', async (req, res) =>{
    try {      
      let requestStatus = await userService.changeRequestSatus(req.body.status, req.body.followerId, req.body.userId);
      if(requestStatus.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: requestStatus.data, status: constants.STATUS_TRUE });
      }else{
        return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_FALSE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post('/unfollowrequest', async (req, res) =>{
    try {      
      let unFollowStatus = await userService.unFollowRequest(req.body.followerId, req.body.userId);
      if(unFollowStatus.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200,status: constants.STATUS_TRUE });
      }else{
        return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_FALSE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  api.get('/requestlist', async (req, res) =>{
    try {      
      const list = await userService.followerslist( req.query.userId);
      if(list.status) {
        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200,data:list.data, status: constants.STATUS_TRUE });
      }else{
        return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_FALSE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
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

  api.post("/auth/facebook/token", passport.authenticate('facbook-token',{scope:"email"}),function(req, res) {
    console.log(req.user);
    res.send(req.session.passport.user);
    
  });

  api.get("/auth/facebook/callback",passport.authenticate('facebook', {failureRedirect: '/user/auth/failure'}), function(req, res) {
    console.log(req.session);
    res.send(req.session.passport.user);
    
  })

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

  // sample token creation

  api.get('/token', async (req, res)=>{
    // login userId --> 60b8dcecd7997d54c0504656
    
    // liked UserId --> 60f2f1b27a88b220d0573051
    // planId --> 60b119d2bcf3b9406c60dec7
    const data = await userPermission.create_token("60f2f1b27a88b220d0573051","60b119d2bcf3b9406c60dec7");
    return res.json({message:"token", authorization:data});

    // login userId token 
    // --> "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI4ZGNlY2Q3OTk3ZDU0YzA1MDQ2NTYiLCJwbGFuSWQiOiI2MGIxMTlkMmJjZjNiOTQwNmM2MGRlYzciLCJpYXQiOjE2MjY1MzQ2NjZ9.FZgSswly636Kp8OCPFb_PX9-W1i4qlEtoqqj60KE5zI"

    // liked UserId token 
    // --> "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGYyZjFiMjdhODhiMjIwZDA1NzMwNTEiLCJwbGFuSWQiOiI2MGIxMTlkMmJjZjNiOTQwNmM2MGRlYzciLCJpYXQiOjE2MjY1MzQ3MTF9.7yCvl5AdcMC38R_UC398vxHt-uiqZzwhUuPJBJbnfYU"
  });



  return api;
};
