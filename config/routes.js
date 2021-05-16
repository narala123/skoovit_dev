module.exports = function(app,express){
	
let userRoleApi = require("../controllers/userRoleApi")(express);
app.use("/userrole",userRoleApi);

let userApi = require("../controllers/userApi")(express);
app.use("/user",userApi);

let locationApi = require("../controllers/locationApi")(express);
app.use("/location",locationApi);

}