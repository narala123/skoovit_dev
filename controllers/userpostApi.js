const constants = require("../config/constants");
const userPermission = require("../config/middlewares/authorization");
const userPostService =require("../services/userPostService");
const upload = require("../config/middlewares/multerConfig");
const workerService = require("../utils/image-video-worker");
const fileType = require("../utils/check-file-type");

module.exports = function (express) {
    let api = express.Router();

    // user self post api.
    api.use(userPermission.isValidUser); // token checking below all api's
    api.post('/create', async (req, res)=>{
        try {
        upload.ImgVideoUpload(req, res, async (err) => {
            //console.log(req.files);
            let promises = [];
            for(let i=0;i<req.files.length;i++){
                if(fileType.imageTypes.indexOf(req.files[i].extname) !== -1){
                    promises.push(await workerService.imageWorkerInit(req.files[i]))
                }
                if(fileType.videoTypes.indexOf(req.files[i].extname) !== -1){
                    promises.push(await workerService.videoWorkerInit(req.files[i]))
                }
            }
            Promise.all(promises).then(async (data) => {
                try {                    
                    req.body.postGallary = data;
                    req.body.userId = req.user.userId;
                    const postData = await userPostService.createSelfPost(req.body);                    
                    if(postData.status){
                        return res.json({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: postData.data, status: constants.STATUS_TRUE });
                    }else{
                        return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: postData.data, status: constants.STATUS_FALSE });
                    }                    
                } catch (e) {
                    console.log("error", e)
                    return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            }).catch(err => {
                console.log("error", err)
                return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            })
        })
        } catch(e){
            console.log("error", e)
            return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
api.post('/likesupdate/:postId', async (req, res)=>{
    try {        
        if(req.params.postId){
            const likesdata = await userPostService.selfPostOne(req.params.postId);
            if(likesdata.status){
                const data = await userPostService.selfPostLikesUpdate(likesdata.data._id, req.user.userId );
                if(data.status){
                    return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data, status: constants.STATUS_TRUE });
                }else{
                    return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: data.data, status: constants.STATUS_FALSE });
                }
            }else{
                return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid post", status: constants.STATUS_FALSE });
            }
        }else{
            return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid URL", status: constants.STATUS_FALSE });
        }
    }catch(e){
        console.log("error", e)
        return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});
api.post('/viewsupdate/:postId', async (req, res)=>{
    try {        
        if(req.params.postId){
            const viewsdata = await userPostService.selfPostOne(req.params.postId);
            if(viewsdata.status){
                const data = await userPostService.selfPostViewsUpdate(viewsdata.data._id, req.user.userId );
                if(data.status){
                    return res.json({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data, status: constants.STATUS_TRUE });
                }else{
                    return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: data.data, status: constants.STATUS_FALSE });
                }
            }else{
                return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid post", status: constants.STATUS_FALSE });
            }
        }else{
            return res.json({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid URL", status: constants.STATUS_FALSE });
        }
    }catch(e){
        console.log("error", e)
        return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});
api.get('/allselfposts', async (req, res)=>{
    try {
        const data = await userPostService.getUserSelfPosts(req.user.userId);
        return data;
    }catch(e){
        console.log("error", e)
        return res.json({ statusCode: constants.STATUS_500, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});


return api;
};  