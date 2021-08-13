const constants = require("../config/constants");
const userPermission = require("../config/middlewares/authorization");
const userAdvProfileService = require("../services/userAdvProfileService");

module.exports = function (express) {
    let api = express.Router();
    //api.use(userPermission.isValidUser); // token checking below all api's

    // to create user advertisement
    api.post('/advertisement', async(req, res) =>{
        try {
            console.log(req.body);
            req.body.userId = req.user.userId;
            
            const data = await userAdvProfileService.createUserAdvertisement(req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data }); 
        }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    // fetch user advertisements by userId
    api.get('/advertisements',async(req, res) =>{
        try {
            const data = await userAdvProfileService.fetchUserAdvertisements(req.user.userId);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data }); 
        }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // fetch all registred users posted advertisements
    api.get('/advertisementlist',async(req, res) =>{
        try {
            const data = await userAdvProfileService.fetchAllUserAdvertisements();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data }); 
        }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    return api;
};