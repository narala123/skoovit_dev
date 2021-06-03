module.exports = function (app, express,passport) {
  let userRoleApi = require("../controllers/userRoleApi")(express);
  app.use("/userrole", userRoleApi);

  let userApi = require("../controllers/userApi")(express,passport);
  app.use("/user", userApi);

  let locationApi = require("../controllers/locationApi")(express);
  app.use("/location", locationApi);
  
  let planApi = require("../controllers/planApi")(express);
  app.use("/plan", planApi);

  let userProfileApi = require("../controllers/userProfileApi")(express);
  app.use("/userprofile",userProfileApi);

  let fileUploadApi = require("../controllers/fileUploadApi")(app,express);
  app.use("/fileupload",fileUploadApi);

  let adminApi = require("../controllers/adminApi")(express);
  app.use('/admin',adminApi);

};
