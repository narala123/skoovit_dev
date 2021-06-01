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
            return e;
        }
    });
    api.get("/getcategories", async (req, res) => {
        try {
            let data = await adminService.fetchCategories(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.post("/updatecategory/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateCategory(req.params.id, req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.get("/getcategory/:id", async (req, res) => {
        try {
            let data = await adminService.getCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.post("/deletecategory/:id", async (req, res) => {
        try {
            let data = await adminService.deleteCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
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
            return e;
        }
    });
    api.get("/getsubcategories/:id", async (req, res) => {
        try {
            let data = await adminService.fetchSubCategories(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });
    api.post("/updatesubcategory/:id", async (req, res) => {
        try {
            //console.log(req.body);
            let data = await adminService.updateCategory(req.params.id, req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.get("/getsubcategory/:id", async (req, res) => {
        try {
            let data = await adminService.getSubCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data: data, status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.post("/deletesubcategory/:id", async (req, res) => {
        try {
            let data = await adminService.deleteSubCategory(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
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
            return e;
        }
    });
    api.get("/getlanguages", async (req, res) => {
        try {
            let data = await adminService.fetchLanguages();
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });
    api.post("/updatelanguage/:id", async (req, res) => {
        try {
        //console.log(req.body);
            let data = await adminService.updateLanguage(req.params.id, req.body);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200,data:data ,status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.get("/getlanguage/:id", async (req, res) => {
        try {
            let data = await adminService.getLanguage(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,data:data,status:constants.STATUS_TRUE });
        } catch (e) {
            return e;
        }
    });

    api.post("/deletelanguage/:id", async (req, res) => {
        try {
            let data = await adminService.deleteLanguage(req.params.id);
            return res.json({ statusCode: constants.STATUS_200, message:constants.STATUS_MSG_200 ,status:constants.STATUS_TRUE});
        } catch (e) {
            return e;
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
            return e;
        }
    });
  return api;
};
