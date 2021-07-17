const db = require("../models");
const auth = require("../config/middlewares/authorization");

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
      const postData = await this.db.UserPosts.aggregate([{$match:{$or:[{userId:{$in:arr}},{visibleTo:"public"}]}},
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo"
          }
        },
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
            isViewd:{
              $switch: {
                branches: [
                  { case: { $eq : [ "$views", userId ] }, then: true } , 
                  { case: { $ne : [ "$views", userId ] }, then: false }                                                        
                ],
                
              }
            }     
          }
        }
      ]);
      console.log(JSON.stringify(postData, null, 1),"postData")

    }catch(err){
      console.log(err);
      return {
        data: err.message,
        status:false,        
      };
    } 
  };
};

module.exports = new UserService();
