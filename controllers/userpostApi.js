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
                    console.log(req.user.userId,"token id")
                    req.body.userId = req.user.userId;
                    const postData = await userPostService.createSelfPost(req.body);                    
                    if(postData.status){
                        return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: postData.data, status: constants.STATUS_TRUE });
                    }else{
                        return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: postData.data, status: constants.STATUS_FALSE });
                    }                    
                } catch (e) {
                    console.log("error", e)
                    return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
                }
            }).catch(err => {
                console.log("error", err)
                return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:err.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
            })
        })
        } catch(e){
            console.log("error", e)
            return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
        }
    });
api.post('/likesupdate/:postId', async (req, res)=>{
    try {        
        if(req.params.postId){
            const likesdata = await userPostService.selfPostOne(req.params.postId);
            if(likesdata.status){
                const data = await userPostService.selfPostLikesUpdate(likesdata.data._id, req.user.userId );
                if(data.status){
                    return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data, status: constants.STATUS_TRUE });
                }else{
                    return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: data.data, status: constants.STATUS_FALSE });
                }
            }else{
                return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid post", status: constants.STATUS_FALSE });
            }
        }else{
            return res.status(constants.STATUS_404).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid URL", status: constants.STATUS_FALSE });
        }
    }catch(e){
        console.log("error", e)
        return res.json({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});
api.post('/viewsupdate/:postId', async (req, res)=>{
    try {        
        if(req.params.postId){
            const viewsdata = await userPostService.selfPostOne(req.params.postId);
            if(viewsdata.status){
                const data = await userPostService.selfPostViewsUpdate(viewsdata.data._id, req.user.userId );
                if(data.status){
                    return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data, status: constants.STATUS_TRUE });
                }else{
                    return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: data.data, status: constants.STATUS_FALSE });
                }
            }else{
                return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid post", status: constants.STATUS_FALSE });
            }
        }else{
            return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: "Invalid URL", status: constants.STATUS_FALSE });
        }
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// get all users self posts to all fans created posts
api.get('/allselfposts', async (req, res)=>{
    try {
        const data = await userPostService.getUserSelfPosts(req.user.userId);   
        if(data.status){
            return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data.data, status: constants.STATUS_TRUE });
        }else{
            return res.status(constants.STATUS_400).send({ statusCode: constants.STATUS_400, message: constants.STATUS_MSG_400, data: data.data, status: constants.STATUS_FALSE });
        }        
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// create comment on users posts (req.body need userId, and PostId and comment)
api.post("/postcomment",async (req,res)=>{
    try{
        req.body.userId = req.user.userId;
        const data = await userPostService.createComment(req.body);
        return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: data, status: constants.STATUS_TRUE });
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// to update likes count on users posts 
api.put("/commentlikesupdate/:commentId",async (req,res)=>{
    try{
        const data =  await userPostService.commentLikesUpdate(req.params.commentId,req.user.userId);
        return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: data.data, status: constants.STATUS_TRUE });
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// get comments on user posts
api.get("/getcomments/:postId",async (req,res)=>{
    try{
       const data = await userPostService.userComments(req.params.postId,req.user.userId);
       return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// write sub comments on user post comments
api.post("/postsubcomment",async (req,res)=>{
    try{
        req.body.userId = req.user.userId;
        const data = await userPostService.userSubComments(req.body);
        return res.status(constants.STATUS_201).send({ statusCode: constants.STATUS_201, message: constants.STATUS_MSG_201, data: data, status: constants.STATUS_TRUE });
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500, data:e.message, message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// get sub comments on user post commnets
api.get("/getsubcomments/:commentId",async (req,res)=>{
    try{
       const data = await userPostService.userSubComments(req.params.commentId,req.user.userId);
       return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, data: data, status: constants.STATUS_TRUE });
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

// get sub comments on user post commnets
api.get("/skoovcount/:username",async (req,res)=>{
    try{
       const data = await userPostService.getSkoovCount(req.params.username);
       return res.status(constants.STATUS_200).send({ statusCode: constants.STATUS_200, message: constants.STATUS_MSG_200, count: data, status: constants.STATUS_TRUE });
    }catch(e){
        console.log("error", e)
        return res.status(constants.STATUS_500).send({ statusCode: constants.STATUS_500,data:e.message,  message: constants.STATUS_MSG_500, status: constants.STATUS_FALSE });
    }
});

return api;
};  