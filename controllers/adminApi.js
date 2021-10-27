const upload = require("../config/middlewares/multerConfig");
const AdminPermission = require("../config/middlewares/authorization");
const adminService = require("../services/adminService");
const constants = require("../config/constants");
const path = require("path");
const workerService = require("../utils/image-video-worker");
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

module.exports = function (express) {
    let api = express.Router();

    // admin login
    api.post('/login', async (req, res) => {
        try {
            const data = await adminService.validateAdmin(req.body.email, req.body.password);
            //console.log(data);
            if(data != null){
                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
            }else {
                return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_404, message: constants.STATUS_MSG_404, status: constants.STATUS_FALSE });
            }
            
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    // api.use(AdminPermission.isAdmin); // token checking below all api's
    /*
        categories
    */
    //api.use(userPermission.isValidUser);
    api.post("/createcategory", async (req, res) => {
        try {
            upload.Imageupload(req, res, async (err) => {
                if (!err) {
                    if (req.files.length > 0) {
                        let promises = [];
                        for (let i = 0; i < req.files.length; i++) {
                            promises.push(await workerService.imageWorkerInit(req.files[i]))
                        }
                        Promise.all(promises).then(async (data) => {
                            try {
                                req.body.filename = data[0].filename;
                                req.body.originalName = data[0].originalName;
                                let categoryInfo = await adminService.createCategory(req.body);
                                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: categoryInfo, status: constants.STATUS_TRUE });
                            } catch (e) {
                                console.log("error", e)
                                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                            }

                        }).catch(err => {
                            console.log("error", err)
                            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                        })
                    } else {
                        let data = await adminService.createCategory(req.body);
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
                    }
                } else {
                    console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            })
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get("/getcategories", async (req, res) => {
        try {
            let data = await adminService.fetchCategories(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/updatecategory/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateCategory(req.params.id, req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.get("/getcategory/:id", async (req, res) => {
        try {
            let data = await adminService.getCategory(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/deletecategory/:id", async (req, res) => {
        try {
            let data = await adminService.deleteCategory(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    /*
        sub-categories 
    */
    api.post("/createsubcategory", async (req, res) => {
        try {

            upload.Imageupload(req, res, async (err) => {
                if (!err) {
                    if (req.files.length > 0) {
                        let promises = [];
                        for (let i = 0; i < req.files.length; i++) {
                            promises.push(await workerService.imageWorkerInit(req.files[i]))
                        }
                        Promise.all(promises).then(async (data) => {
                            try {
                                req.body.filename = data[0].filename;
                                req.body.originalName = data[0].originalName;
                                let categoryInfo = await adminService.createSubCategory(req.body);
                                return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: categoryInfo, status: constants.STATUS_TRUE });
                            } catch (e) {
                                console.log("error", e)
                                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                            }
                        }).catch(err => {
                            console.log("error", err)
                            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:err.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                        })
                    } else {
                        let data = await adminService.createSubCategory(req.body);
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
                    }
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            })
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get("/getsubcategories/:id", async (req, res) => {
        try {
            let data = await adminService.fetchSubCategories(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/updatesubcategory/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateCategory(req.params.id, req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.get("/getsubcategory/:id", async (req, res) => {
        try {
            let data = await adminService.getSubCategory(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/deletesubcategory/:id", async (req, res) => {
        try {
            let data = await adminService.deleteSubCategory(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    /*
        skills
    */
    api.post("/createskills", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.createSkills(req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get("/getskill/:scId", async (req, res) => {
        try {
            let data = await adminService.fetchSkill(req.params.scId);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/updateskill/:sid", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateSkill(req.params.sid, req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.get("/getskills", async (req, res) => {
        try {
            let data = await adminService.getSkills();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/deleteskill/:sid", async (req, res) => {
        try {
            let data = await adminService.deleteSkill(req.params.sid);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    /*
        languages
    */
    api.post("/createlanguage", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.createLanguage(req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get("/getlanguages", async (req, res) => {
        try {
            let data = await adminService.fetchLanguages();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/updatelanguage/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateLanguage(req.params.id, req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.get("/getlanguage/:id", async (req, res) => {
        try {
            let data = await adminService.getLanguage(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/deletelanguage/:id", async (req, res) => {
        try {
            let data = await adminService.deleteLanguage(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    /*
        genders
    */
    api.get("/genders", async (req, res) => {
        try {
            let data = ["Male", "Female", "Other"];
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    /*
        Educations
    */
    api.post("/createeducation", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.createEducation(req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get("/geteducations", async (req, res) => {
        try {
            let data = await adminService.fetchEducations();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/updateeducation/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateEducation(req.params.id, req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.get("/geteducation/:id", async (req, res) => {
        try {
            let data = await adminService.getEducation(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/deleteeducation/:id", async (req, res) => {
        try {
            let data = await adminService.deleteEducation(req.params.id);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    
    /*
      
     to create global ads
     */
    api.post("/globalads", async (req, res) => {
        try {
            upload.ImgVideoUpload(req,res, async (err) => {
                if (!err) {
                    if (req.files.length > 0) {
                        req.body.diplayContent = {
                            url : req.files[0].filename,
                            type: req.files[0].mimeType
                        }
                        req.body.expiryDate = new Date(req.body.expiryDate);
                        let globalAdsdata = await adminService.createGlobalAds(req.body);
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: globalAdsdata, status: constants.STATUS_TRUE });

                    } else {
                        let globalAdsdata = await adminService.createGlobalAds(req.body);
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: globalAdsdata, status: constants.STATUS_TRUE });
                    }
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            })            
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/regionads", async (req, res) => {
        try {
            upload.ImgVideoUpload(req,res, async (err) => {
                if (!err) {
                    if (req.files.length > 0) {
                        req.body.diplayContent = {
                            url : req.files[0].filename,
                            type: req.files[0].mimeType
                        }
                        req.body.expiryDate = new Date(req.body.expiryDate);
                        let regionAdsdata = await adminService.createRegionAds(req.body);
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: regionAdsdata, status: constants.STATUS_TRUE });
                    } else {
                        let regionAdsdata = await adminService.createRegionAds(req.body);
                        return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: regionAdsdata, status: constants.STATUS_TRUE });
                    }
                } else {
                    //console.log("err", err)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:err.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            })            
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    
    api.get('/globaladsinfo', async (req, res) =>{
        try {
          let globalAdsData = await adminService.getGlobalAds();
          return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: globalAdsData, status: constants.STATUS_TRUE });
        }catch(e) {
          console.log("error", e)
          return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
      });
    
      api.get('/regionaladsinfo', async (req, res) =>{
        try {          
            let regionalAdsData = await adminService.getRegionalAds();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: regionalAdsData, status: constants.STATUS_TRUE });                
        }catch(e) {
          console.log("error", e)
          return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
      });

      /*
        services
    */
    api.post("/createservice", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.createService(req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.get("/getservices", async (req, res) => {
        try {
            let data = await adminService.fetchServices();
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    api.post("/updateservice/:sid", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateService(req.params.sid, req.body);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.get("/getservice/:sid", async (req, res) => {
        try {
            let data = await adminService.getService(req.params.sid);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });

    api.post("/deleteservice/:sid", async (req, res) => {
        try {
            let data = await adminService.deleteService(req.params.sid);
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, status: constants.STATUS_TRUE });
        } catch (e) {
            console.log("error", e)
            return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
    
    return api;
};
