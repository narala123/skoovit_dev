const constants = require("../config/constants");
const userPermission = require("../config/middlewares/authorization");
const userService = require("../services/UserService");
const userProfileService = require("../services/userProfileService");


module.exports = function (express) {
    let api = express.Router();
    api.post('/create/:id', async (req, res) => {
        try {
            const isUserExisted = await userService.getUser(req.params.id);
            if (!isUserExisted) {
                return res.json({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            const isProfileExisted = await userProfileService.getUserProfileWithUserId(req.params.id);
            if(isProfileExisted) {
                req.body["userId"] = isUserExisted._id;
                const updateProfile = await userProfileService.userProfileUpdation(req.body, req.params.id);
                if (updateProfile && updateProfile != null) {
                    return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: updateProfile });
                } else {
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            }else {
                req.body["userId"] = isUserExisted._id;
                const createProfile = await userProfileService.createUserProfile(req.body);
                if (createProfile && createProfile != null) {
                    return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: createProfile });
                } else {
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            }            
        } catch (e) {
            console.log("error", e)
            return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post('/exprerinceupdate/:uId/:pId', async (req, res) => {
        try {
            const isProfileExisted = await userProfileService.isProfileExisted(req.params.uId, req.params.pId);
            if (!isProfileExisted) {
                return res.json({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            const updateProfile = await userProfileService.updateUserProfile(req.body, req.params.pId);
            if (updateProfile) {
                return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: updateProfile });
            } else {
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get('/info/:pId', async (req, res) => {
        try {
            const isProfileExisted = await userProfileService.isProfileExisted(null, req.params.pId);
            if (!isProfileExisted) {
                return res.json({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            const fetchProfile = await userProfileService.getUserProfile(req.params.pId);
            if (fetchProfile && fetchProfile != null) {
                return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: fetchProfile });
            } else {
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get('/allprofilesinfo', async (req, res) => {
        try {
            const fetchProfiles = await userProfileService.getUserProfiles();
            if (fetchProfiles) {
                return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: fetchProfiles });
            } else {
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    return api;
};