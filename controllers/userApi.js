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
        const data = JSON.parse(JSON.stringify(await userService.signup(req.body)));
        if (data) {
          //console.log(data,"data");  
          await userService.sendOtp(data.mobile);
          em.emit(eventNames.Assign_Plan_To_User, { userId: data._id });
          return res.json({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, status: constants.STATUS_TRUE, data: data });
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
        return res.json({ statusCode: constants.STATUS_200,status: constants.STATUS_TRUE, message: "OTP Sent Successfully, Please verify to enjoy the features." });
      } else {
        return res.json({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401,status: constants.STATUS_FALSE });
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
  api.get("/homecategories", async (req, res) =>{
    try {
        let catInfo = await userService.homeCategories();
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: catInfo, status: constants.STATUS_TRUE });

    }catch(e) {
        console.log("error", e)
        return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get('/globalads', async (req, res) =>{
    try {
      let globalAdsData = await userService.getGlobalAds();
      return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: globalAdsData, status: constants.STATUS_TRUE });
    }catch(e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.get('/regionalads', async (req, res) =>{
    try {
      if(req.query.q){
        let regionalAdsData = await userService.getregionalAds(req.query.q);
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: regionalAdsData, status: constants.STATUS_TRUE });
      }else{
        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_TRUE });
      }      
    }catch(e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  api.post('/userrequests', async (req, res) =>{
    try {      
      let requestData = await userService.generateRequest(req.body);
      if(requestData) {
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: requestData, status: constants.STATUS_TRUE });
      }else{
        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_TRUE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  

  api.post('/requeststatus', async (req, res) =>{
    try {      
      let requestStatus = await userService.changeRequestSatus(req.body.status, req.body.followerId, req.body.userId);
      if(requestStatus) {
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: requestStatus, status: constants.STATUS_TRUE });
      }else{
        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_TRUE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });

  api.post('/unfollowrequest', async (req, res) =>{
    try {      
      let unFollowStatus = await userService.unFollowRequest(req.body.followerId, req.body.userId);
      if(unFollowStatus) {
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200,status: constants.STATUS_TRUE });
      }else{
        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_TRUE });
      } 
    }catch(e) {
      console.log("error", e)
      return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
  });
  api.get('/requestlist', async (req, res) =>{
    try {      
      const list = await userService.followerslist( req.query.userId);
      if(list) {
        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200,data:list, status: constants.STATUS_TRUE });
      }else{
        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_TRUE });
      } 
    }catch(e) {
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
