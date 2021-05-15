let userPermission = require("../config/middlewares/authorization")
module.exports = function(express){
    let api  = express.Router();

    api.post("/signup",(req,res)=>{
       
    });
    api.post("/login",(req,res)=>{

    });

    /*
        To check valid token and user role, works as middleware.
        below of this function all Api's should have token.
        without token Api's can write on top this line.
    */

    //api.use(userPermission.isValidUser);
    
    api.get("/profile",(req,res)=>{
        res.json({status:true,message:"success"});
    })

    return api;
}