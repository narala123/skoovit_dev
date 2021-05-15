let userPermission = require("../config/middlewares/authorization");
let userRoleService = require("../services/userRoleService"); 
let constants = require("../config/constants")
module.exports = function(express){
    let api  = express.Router();
    //api.use(userPermission.isValidUser);
    api.post("/create",async (req,res)=>{
        try{
            //console.log(req.body);
            let data =  await userRoleService.createRole(req.body);            
            res.json({statusCode:constants.STATUS_200,data:data})
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });
    return api;
}