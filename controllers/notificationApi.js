const constants = require("../config/constants");
const userPermission = require("../config/middlewares/authorization");
const notificationService = require("../services/notificationService");

module.exports = function (express) {
    let api = express.Router();

    
    api.use(userPermission.isValidUser); // token checking below all api's

    // to fetch notifications count
    api.get('/count', async (req,res)=>{
        try{
            const count = await notificationService.getUserNotificationsCount(req.user.userId);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, count: count, status: constants.STATUS_TRUE });
         }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // to fetch all notifications by userId 
    api.get('/list', async (req,res)=>{
        try{
            const data = await notificationService.getUserNotifications(req.user.userId);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
         }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // to update notification read status as true
    api.put('/update/:notificationId', async (req,res)=>{
        try{
            const data = await notificationService.updateReadStatusNotifications(req.params.notificationId);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
         }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // to delete notification read status as true
    api.put('/delete/:notificationId', async (req,res)=>{
        try{
            const data = await notificationService.updateDeleteNotifications(req.params.notificationId);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
         }catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    return api;

}