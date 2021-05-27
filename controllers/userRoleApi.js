let userPermission = require("../config/middlewares/authorization");
let userRoleService = require("../services/userRoleService"); 
let constants = require("../config/constants");


module.exports = function(express){
    let api  = express.Router();
    //api.use(userPermission.isValidUser);
    api.post("/create",async (req,res)=>{
        try{
           // console.log("req.body-->", req.body);
            let data =  await userRoleService.createRole(req.body);   
            //console.log(data,"final data");
            res.json({statusCode:constants.STATUS_200,data:data})
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });

    api.get("/roles",async (req,res)=>{
        try{
            //console.log(req.body);
            let data =  await userRoleService.fetchRoles();            
            res.json({statusCode:constants.STATUS_200,data:data})
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });

    api.post("/role/:id",async (req,res)=>{
        try{
            //console.log(req.body);
            let data =  await userRoleService.deleteUserRole(req.params.id);            
            res.json({statusCode:constants.STATUS_200,message:constants.STATUS_MSG_Delete})
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });

    api.put("/userrole/:id",async (req,res)=>{
        try{
            //console.log(req.body);
            let data =  await userRoleService.updateUserRole(req.params.id,req.body);            
            res.json({statusCode:constants.STATUS_200,data:data});
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });
    return api;
}