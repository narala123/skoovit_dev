const upload = require("../config/middlewares/multerConfig");
const UserProfileService = require("../services/userProfileService");
const workerService = require("../utils/image-video-worker");
const constants = require("../config/constants");
module.exports = (app, express) => {
    let api = express.Router();
    api.post("/image", (req, res) => {
        try {
            upload.Imageupload(req, res, async (err) => {
                if (!err) {
                    let promises = [];
                    for (let i = 0; i < req.files.length; i++) {
                        promises.push(await workerService.imageWorkerInit(req.files[i]))
                    }
                    Promise.all(promises).then(async (data) => {
                        try {
                            await UserProfileService.galleryUpdate(req.body.profileId, data, "image")
                            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
                        } catch (e) {
                            console.log("error", e)
                            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                        }
                    }).catch(err => {
                        console.log("error", err)
                        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:err.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                    })
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            })
        } catch (e) {
            console.log("err", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/video", (req, res) => {
        try {
            upload.Videoupload(req, res, async (err) => {
                if (!err) {
                    let promises = [];
                    for (let i = 0; i < req.files.length; i++) {
                        promises.push(await workerService.videoWorkerInit(req.files[i]))
                    }
                    Promise.all(promises).then(async data => {
                        try {
                            await UserProfileService.galleryUpdate(req.body.profileId, data, "video")
                            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
                        } catch (e) {
                            console.log("error", e)
                            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                        }
                    }).catch(err => {
                        console.log(err);
                        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:err.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                    })
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            })
        } catch (e) {
            console.log("err", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/doc", (req, res) => {
        try {
            upload.docUpload(req, res, async (err) => {
                if (!err) {
                    let arr = [];
                    let obj = {};
                    for (let i = 0; req.files.length; i++) {
                        obj["filename"] = req.files[i].filename;
                        obj["originalName"] = req.files[i].originalname;
                        arr.push(JSON.parse(JSON.stringify(obj)));
                        obj = {};
                    }
                    try {
                        await UserProfileService.galleryUpdate(req.body.profileId, arr, "doc")
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: arr, status: constants.STATUS_TRUE });
                    } catch (e) {
                        console.log("error", e)
                        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                    }
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            });
        } catch (e) {
            console.log("err", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/audio", (req, res) => {
        try {
            upload.audioUpload(req, res, async (err) => {
                if (!err) {
                    let arr = [];
                    let obj = {};
                    for (let i = 0; req.files.length; i++) {
                        obj["filename"] = req.files[i].filename;
                        obj["originalName"] = req.files[i].originalname;
                        arr.push(JSON.parse(JSON.stringify(obj)));
                        obj = {};
                    }
                    try {
                        await UserProfileService.galleryUpdate(req.body.profileId, arr, "audio")
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: arr, status: constants.STATUS_TRUE });
                    } catch (e) {
                        console.log("error", e)
                        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                    }
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            });
        } catch (e) {
            console.log("err", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    return api;
}