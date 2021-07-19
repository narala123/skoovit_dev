const userPermission = require("../config/middlewares/authorization");
const userRoleService = require("../services/userRoleService");
const constants = require("../config/constants");


module.exports = function (express) {
    let api = express.Router();
    //api.use(userPermission.isValidUser);
    api.post("/create", async (req, res) => {
        try {
            // console.log("req.body-->", req.body);
            let data = await userRoleService.createRole(req.body);
            //console.log(data,"final data");
            if(data.status){
                return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, status: constants.STATUS_TRUE, data: data.data });
            }else{
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: data.data, status: constants.STATUS_FALSE });
            }            
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
        }
    });

    api.get("/roles", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await userRoleService.fetchRoles();
            if(data.status){
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data.data });
            }else{
                return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, data: data.data, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
        }
    });

    api.post("/role/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await userRoleService.deleteUserRole(req.params.id);            
            if(data.status){
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_Delete, status: constants.STATUS_TRUE, data: data.data });
            }else{
                return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
        }
    });

    api.put("/userrole/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await userRoleService.updateUserRole(req.params.id, req.body);                       
            if(data.status){
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data.data });
            }else{
                return res.status(constants.STATUS_401).send({ statusCode: constants.STATUS_401, message: constants.STATUS_MSG_401, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, data: e.message, status: constants.STATUS_FALSE });
        }
    });
    return api;
}