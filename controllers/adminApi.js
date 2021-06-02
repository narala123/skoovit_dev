const adminService = require("../services/adminService");
const constants = require("../config/constants");

module.exports = function (express) {
    let api = express.Router();
    /*
        categories
    */
    //api.use(userPermission.isValidUser);
    api.post("/createcategory", async (req, res) => {
        try {        
            let data = await adminService.createCategory(req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    api.get("/getcategories", async (req, res) => {
        try {
            let data = await adminService.fetchCategories(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.post("/updatecategory/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateCategory(req.params.id, req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.get("/getcategory/:id", async (req, res) => {
        try {
            let data = await adminService.getCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.post("/deletecategory/:id", async (req, res) => {
        try {
            let data = await adminService.deleteCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    /*
        sub-categories
    */
    api.post("/createsubcategory", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.createSubCategory(req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    api.get("/getsubcategories/:id", async (req, res) => {
        try {
            let data = await adminService.fetchSubCategories(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    api.post("/updatesubcategory/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateCategory(req.params.id, req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.get("/getsubcategory/:id", async (req, res) => {
        try {
            let data = await adminService.getSubCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.post("/deletesubcategory/:id", async (req, res) => {
        try {
            let data = await adminService.deleteSubCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    /*
        languages
    */
    api.post("/createlanguage", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.createLanguage(req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    api.get("/getlanguages", async (req, res) => {
        try {
            let data = await adminService.fetchLanguages();
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    api.post("/updatelanguage/:id", async (req, res) => {
        try {
        //console.log(req.body);
            let data = await adminService.updateLanguage(req.params.id, req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.get("/getlanguage/:id", async (req, res) => {
        try {
            let data = await adminService.getLanguage(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data:data,status:constants.STATUS_TRUE });
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });

    api.post("/deletelanguage/:id", async (req, res) => {
        try {
            let data = await adminService.deleteLanguage(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,status:constants.STATUS_TRUE});
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    /*
        genders
    */
    api.get("/genders", async (req, res) => {
        try {
            let data = ["Male","Female","Other"];
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE});
        } catch (e) {
            console.log("error",e)
            return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
        }
    });
    /*
        Educations
    */
        api.post("/createeducation", async (req, res) => {
            try {
                //console.log(req.body);
                let data = await adminService.createEducation(req.body);
                return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
            } catch (e) {
                console.log("error",e)
                return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
            }
        });
        api.get("/geteducations", async (req, res) => {
            try {
                let data = await adminService.fetchEducations();
                return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
            } catch (e) {
                console.log("error",e)
                return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
            }
        });
        api.post("/updateeducation/:id", async (req, res) => {
            try {
            //console.log(req.body);
                let data = await adminService.updateEducation(req.params.id, req.body);
                return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
            } catch (e) {
                console.log("error",e)
                return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
            }
        });
    
        api.get("/geteducation/:id", async (req, res) => {
            try {
                let data = await adminService.getEducation(req.params.id);
                return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data:data,status:constants.STATUS_TRUE });
            } catch (e) {
                console.log("error",e)
                return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
            }
        });
    
        api.post("/deleteeducation/:id", async (req, res) => {
            try {
                let data = await adminService.deleteEducation(req.params.id);
                return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,status:constants.STATUS_TRUE});
            } catch (e) {
                console.log("error",e)
                return res.json({ statusCode: constants.STATUS_500, message:constants.STATUS_MSG_500,status:constants.STATUS_FALSE });
            }
        });
        
  return api;
};
