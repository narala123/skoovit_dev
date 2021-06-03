const upload = require("../config/middlewares/multerConfig");
const path = require("path");
const sharp = require("sharp");
const UserProfileService = require("../services/userProfileService");
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const constants = require("../config/constants");
module.exports = (app, express) => {
    let api = express.Router();
    api.post("/image", (req, res) => {
        upload.Imageupload(req, res, (err) => {
            if (!err) {
                let promises = [];
                for (let i = 0; i < req.files.length; i++) {
                    promises.push(imageWorkerInit(req.files[i]))
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
                console.log("err", err)
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            }
        })
    })
    api.post("/video", (req, res) => {
        upload.Videoupload(req, res, (err) => {
            if (!err) {
                let promises = [];
                for (let i = 0; i < req.files.length; i++) {
                    promises.push(videoWorkerInit(req.files[i]))
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

    function imageWorkerInit(files) {
        return new Promise((resolve, reject) => {
            let worker = new Worker(path.resolve("workers/imageCompressorWorker.js"), { workerData: { filename: files.filename, mimeType: files["originalname"].split(".")[files["originalname"].split(".").length - 1], destFilname: Date.now() + "." + files.originalname.split(".")[files["originalname"].split(".").length - 1], orginalFileName: files["originalname"] } });
            worker.on('error', (err) => {
                console.log(err);
                reject(err)
            });
            worker.on('exit', (code) => {
                if (code != 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                } else {
                    worker.terminate();
                }
            })
            worker.on('message', (msg) => {
                resolve(msg)
            });

        });
    }

    function videoWorkerInit(files) {
        return new Promise((resolve, reject) => {
            let worker = new Worker(path.resolve("workers/videoTranscoderWorker.js"), { workerData: { filename: files.filename, mimeType: files["originalname"].split(".")[files["originalname"].split(".").length - 1], destFilname: Date.now(), orginalFileName: files["originalname"] } });
            worker.on('error', (err) => {
                console.log(err);
                reject(err)
            });
            worker.on('exit', (code) => {
                if (code != 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                } else {
                    worker.terminate();
                }
            })
            worker.on('message', (msg) => {
                resolve(msg)
            });
        });
    }

    return api;
}