const userPermission = require("../config/middlewares/authorization");
const locationService = require("../services/locationService"); 
const  constants = require("../config/constants");

module.exports = function(express){
    let api  = express.Router();
    //api.use(userPermission.isValidUser);
    api.post("/createcountry",async (req,res)=>{
        try{
            //console.log(req.body);
            let data =  await locationService.createCountry(req.body);            
            res.json({statusCode:constants.STATUS_200,data:data})
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });
    api.post("/createstates",async (req,res)=>{
        try{
            //console.log(req.body);
            let data =  await locationService.createState(req.body);            
            res.json({statusCode:constants.STATUS_200,data:data})
        }catch(e){            
            return userPermission.generateError(constants.STATUS_500,e)
        }
    });


    return api;
}