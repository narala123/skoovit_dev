const upload = require("../config/middlewares/multerConfig");
const UserProfileService = require("../services/userProfileService");
const workerService = require("../utils/image-video-worker");
const constants = require("../config/constants");
module.exports = (app, express) => {
    let api = express.Router();
    api.post("/image", (req, res) => {
        upload.Imageupload(req, res, async (err) => {
            try {
                if (!err) {
                    let promises = [];
                    for (let i = 0; i < req.files.length; i++) {
                        promises.push(await workerService.imageWorkerInit(req.files[i]))
                    }
                    Promise.all(promises).then(async (data) => {
                        try {
                            await UserProfileService.galleryUpdate(req.body.profileId, data, "image")
                            return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
                        } catch (e) {
                            console.log("error", e)
                            return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                        }

                    }).catch(err => {
                        console.log("error", err)
                        return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                    })
                } else {
                    //console.log("err", err)
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            }catch(e){
                console.log("err", e)
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        })
    })
    api.post("/video", (req, res) => {
        upload.Videoupload(req, res, async (err) => {
            if (!err) {
                let promises = [];
                for (let i = 0; i < req.files.length; i++) {
                    promises.push(await workerService.videoWorkerInit(req.files[i]))
                }
                Promise.all(promises).then(async data => {
                    try {
                        await UserProfileService.galleryUpdate(req.body.profileId, data, "video")
                        return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
                    } catch (e) {
                        console.log("error", e)
                        return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                    }
                }).catch(err => {
                    console.log(err);
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                })
            } else {
                console.log("err", err)
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        })

    })

    api.post("/doc", (req, res) => {
        upload.docUpload(req, res, async (err) => {
            if (!err) {
                let arr = [];
                for (let i = 0; req.files.length; i++) {
                    arr.push({ filename: req.files[i].filename, originalName: req.files[i].originalname })
                }
                try {
                    await UserProfileService.galleryUpdate(req.body.profileId, arr, "doc")
                    return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: arr, status: constants.STATUS_TRUE });
                } catch (e) {
                    console.log("error", e)
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            } else {
                console.log("err", err)
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }

        });
    })
    api.post("/audio", (req, res) => {
        upload.audioUpload(req, res, async (err) => {
            if (!err) {
                let arr = [];
                for (let i = 0; req.files.length; i++) {
                    arr.push({ filename: req.files[i].filename, originalName: req.files[i].originalname })
                }
                try {
                    await UserProfileService.galleryUpdate(req.body.profileId, arr, "audio")
                    return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: arr, status: constants.STATUS_TRUE });
                } catch (e) {
                    console.log("error", e)
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            } else {
                console.log("err", err)
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }

        });

    })
    

    return api;
}