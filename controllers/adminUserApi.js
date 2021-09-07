const adminService = require("../services/adminService");
const constants = require("../config/constants");
const path = require("path");
const AdminPermission = require("../config/middlewares/authorization");

module.exports = function (express) {
    let api = express.Router();

    api.use(AdminPermission.isAdmin); // token checking below all api's
    // get all users list by admin
    api.get('/allusers', async (req, res) => {
        try {
            let regionalAdsData = await adminService.allUsersInfo();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: regionalAdsData, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
}