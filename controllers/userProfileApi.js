const constants = require("../config/constants");
const userPermission = require("../config/middlewares/authorization");
const userService = require("../services/UserService");
const userProfileService = require("../services/userProfileService");
const upload = require("../config/middlewares/multerConfig");

module.exports = function (express) {
    let api = express.Router();
    api.use(userPermission.isValidUser); // token checking below all api's
    api.post('/create/:id', async (req, res) => {
        try {
            const isUserExisted = await userService.getUser(req.params.id);
            if (!isUserExisted) {
                return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            const isProfileExisted = await userProfileService.getUserProfileWithUserId(req.params.id);
            if (isProfileExisted) {
                req.body["userId"] = isUserExisted.data._id;
                const updateProfile = await userProfileService.userProfileUpdation(req.body, req.params.id);
                if (updateProfile && updateProfile != null) {
                    return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, status: constants.STATUS_TRUE, data: updateProfile });
                } else {
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            } else {
                req.body["userId"] = isUserExisted.data._id;
                const createProfile = await userProfileService.createUserProfile(req.body);
                if (createProfile && createProfile != null) {
                    return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, status: constants.STATUS_TRUE, data: createProfile });
                } else {
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post('/exprerinceupdate/:uId/:pId', async (req, res) => {
        try {
            const isProfileExisted = await userProfileService.isProfileExisted(req.params.uId, req.params.pId);
            if (!isProfileExisted) {
                return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            const updateProfile = await userProfileService.updateUserProfile(req.body, req.params.pId);
            if (updateProfile) {
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: updateProfile });
            } else {
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get('/info/:pId', async (req, res) => {
        try {
            const isProfileExisted = await userProfileService.isProfileExisted(null, req.params.pId);
            if (!isProfileExisted) {
                return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            const fetchProfile = await userProfileService.getUserProfile(req.params.pId);
            console.log(fetchProfile);
            if (fetchProfile && fetchProfile != null) {
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: fetchProfile });
            } else {
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    // if profiles checks any one their userid will update in wathedUSers list
    api.post('/watched', async (req, res) => {
        try {
            const viewersUpdate = await userProfileService.userProfileViwedListUpdate(req.user.userId, req.body.toUserId);
            if (viewersUpdate) {
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: viewersUpdate });
            } else {
                return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid post", status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    // for all registered profiles list
    api.get('/allprofilesinfo', async (req, res) => {
        try {
            // console.log(req.query.filters);
            let filters = req.query.filters ? status(constants.STATUS_500).send.parse(req.query.filters) : [];
            const fetchProfiles = await userProfileService.getUserProfiles(filters);
            if (fetchProfiles) {
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: fetchProfiles });
            } else {
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    // for user profiles who wathed their list
    api.get('/viwerslist', async (req, res) => {
        try {
            // console.log(req.query.filters);   
            const viwedUsers = await userProfileService.getUserProfileWithUserId(req.user.userId);
            if (viwedUsers) {
                const fetchProfiles = await userProfileService.getUserProfileViwersList(viwedUsers.watchedUsers);
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: fetchProfiles });
            } else {
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // api.get('/userprofiles', async (req, res)=>{
    //     try {
    //         const profileInfo = await userProfileService.profileSearchFilter(req.query);
    //         if (profileInfo.length > 0) {
    //             return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: profileInfo });
    //         } else {
    //             return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    //         } 
    //     }catch(e) {
    //         console.log("error", e)
    //         return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    //     }
    // })

    // create entity form
    api.post('/entity', async (req, res) => {
        try {
            // console.log(req.query.filters);   
            const viwedUsers = await userProfileService.getUserProfileWithUserId(req.user.userId);
            if (viwedUsers) {
                const fetchProfiles = await userProfileService.getUserProfileViwersList(viwedUsers.watchedUsers);
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: fetchProfiles });
            } else {
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // upate user entity logo
    api.put("/entity", async (req, res) => {
        upload.Imageupload(req, res, async (err) => {
            try {
                if (req.files.length > 0) {
                    req.body.logo_url = req.files[0].filename;
                }
                const data = await userProfileService.entityUpdate(req.user.userId, req.body);
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data });
            } catch (e) {
                console.log("error", e)
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }

        })
    });

    // create user requirement post
    api.post("/requirement", async (req, res) => {
        try {
            req.body.userId = req.user.userId;
            const data = await userProfileService.createRequirement(req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data });
        } catch (e) {
            aconsole.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // update user requirment
    api.put("/requirement/:reqId", async (req, res) => {
        try {
            req.body.userId = req.user.userId;
            if(req.params.reqId){
                const data = await userProfileService.updateRequirement(req.body, req.params.reqId);
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data });
            }else{
                return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, status: constants.STATUS_FALSE });
            }                
        } catch (e) {
            aconsole.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // get requirement info by userId
    api.get("/requirements", async (req, res) => {
        try {
            let filters = req.query.filters ? status(constants.STATUS_500).send.parse(req.query.filters) : [];            
            const data = await userProfileService.getRequirementsByUserId(req.user.userId, filters);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data });                           
        } catch (e) {
            aconsole.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // get all requirements info 
    api.get("/requirementslist", async (req, res) => {
        try {
            let filters = req.query.filters ? status(constants.STATUS_500).send.parse(req.query.filters) : [];            
            const data = await userProfileService.getAllRequirements(filters);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE, data: data });                           
        } catch (e) {
            aconsole.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data: e, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    return api;
};