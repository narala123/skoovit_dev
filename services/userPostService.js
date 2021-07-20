const db = require("../models");
const auth = require("../config/middlewares/authorization");
const mongoose = require('mongoose');
class UserService {
    constructor() {
      this.db = db;
    }
  async createSelfPost(data) {
    try {
      const selfPost = await this.db.UserPosts.create(data);
      return {
        data: selfPost,
        status:true,
      };
    } catch(err){
      console.log(err);
      return {
        data: err.message,
        status:false,
        //message: err.message
      };
    }
  };
  async selfPostOne(postId){
    try {
      const data = await this.db.UserPosts.findOne({_id:postId});
      return {
        data: data,
        status:true,
      };
    }catch(err){
      console.log(err);
      return {
        data: err.message,
        status:false,
        //message: err.message
      };
    }
  };
  async selfPostLikesUpdate(postId,userId){
    try {      
      let query = {};
      let msg;
      const ifLikeExisted = await  this.db.UserPosts.findOne({_id:postId,likes:{$in:[userId]}});
      if(ifLikeExisted){
        query = {$pull:{likes:{$in:[userId]}}};
        msg = "unliked"
      }else{
        query = {$push:{likes:userId}};
        msg = "liked"
      }      
      const likeStatus = await this.db.UserPosts.updateOne({_id:postId},query);
      return {
        data: msg,
        status:true
      };
    }catch(err){
      console.log(err);
      return {
        data: err.message,
        status:false,        
      };
    }
  };  
  async selfPostViewsUpdate(postId,userId){
    try {     
      const ifViewExisted = await  this.db.UserPosts.findOne({_id:postId,views:{$in:[userId]}});
      if(ifViewExisted){
        return {
          data: "Already Watched",
          status:true,
        };
      }else{
        const data = await this.db.UserPosts.updateOne({_id:postId},{$push:{views:userId}});
        return {
          data: "watching",
          status:true,
        };
      }      
    }catch(err){
      console.log(err);
      return {
        data: err.message,
        status:false,        
      };
    }
  };
  async getUserSelfPosts(userId){
    try {
      const followersList = await this.db.Followers.find({followedBy:userId},{userId:1});
      let arr = followersList.map(val =>{
        return val.userId;
      });
      arr.push(userId);
      let postData = await this.db.UserPosts.aggregate([{$match:{$or:[{userId:{$in:arr}},{visibleTo:"public"}]}},
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo"
          }
        },
        {
          $lookup:{
            from:"userpostcomments",
            localField:"_id",
            foreignField:"postId",
            as:"commentsInfo"
          }
        },
        {$unwind:"$userInfo"},
        {
          $project:{
            description:1,
            tagPeople:1,
            location:1,
            visibleTo:1,
            backgroundColour:1,
            postGallary:1,
            feelingActivity:1,
            gifUrl:1,
            likes:1,
            views:1,
            isActive:1,
            name:"$userInfo.fullName",
            email:"$userInfo.email",
            profilePic:"$userInfo.profileUrl",
            viewsCount:{$size: "$views"},
            likesCount:{$size: "$likes"},
            commentsCount: { $cond: { if: { $isArray: "$commentsInfo" }, then: { $size: "$commentsInfo" }, else: "NA"} },
          }
        }
      ]);
    postData = postData.filter(val=>{
      (val.views.includes(userId))?val["isViewd"] = true:val["isViewd"] = false;
      (val.likes.includes(userId))?val["isLiked"] = true:val["isLiked"] = false;
      return val
    })
    return {
      data: postData,
      status:true,
    };
    }catch(err){
      console.log(err);
      return {
        data: err.message,
        status:false,        
      };
    } 
  };
 async createComment(commentInfo){
   try{
    let saveComment = await this.db.UserPostComments.create(commentInfo);
    return saveComment
   }catch(err){
    throw new Error(err.message)
   }
 }

 async commentLikesUpdate(commentId,userId){
  let query = {};
  let msg;
  try{
  const isLikeExisted = await  this.db.UserPostComments.findOne({_id:commentId,likes:{$in:[userId]}});
  if(isLikeExisted){
    query = {$pull:{likes:{$in:[userId]}}};
    msg = "unliked"
  }else{
    query = {$push:{likes:userId}};
    msg = "liked"
  }      
  const likeStatus = await this.db.UserPostComments.updateOne({_id:commentId},query);
  return {
    data: msg,
    status:true
  };
}catch(err){
   throw new Error(err.message);
}
 }
 async userComments(postId,userId){
  try {
    
    let postData = await this.db.UserPostComments.aggregate([{$match:{postId:mongoose.Types.ObjectId(postId)}},{
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $lookup:{
        from:"userpostsubcomments",
        localField:"_id",
        foreignField:"commentId",
        as:"commentsInfo"
      }
    },
    {$unwind:"$userInfo"},
    {
      $project:{
        comment:1,
        likes:1,
        isActive:1,
        name:"$userInfo.fullName",
        email:"$userInfo.email",
        profilePic:"$userInfo.profileUrl",
        likesCount:{$size: "$likes"},
        subCommentsCount: { $cond: { if: { $isArray: "$commentsInfo" }, then: { $size: "$commentsInfo" }, else: "NA"} },
      }
    }
  ]);
  postData = postData.filter(val=>{
    (val.likes.includes(userId))?val["isLiked"] = true:val["isLiked"] = false;
    return val
  })
  return postData;
    
  }catch(err){
    console.log(err);
    throw new Error(err.message);
  } 
 }
};



module.exports = new UserService();
