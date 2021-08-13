const EventEmitter = require('events');
const db = require('../models');
const plansService = require('../services/planService');
const eventNames = require('../config/event-emitter-constants');
const NotificationService = require('../services/notificationService');
class Events {
    constructor() {
        this.eventNames = eventNames;
        this.em = new EventEmitter();
        this.db = db;
        this.plansService = plansService;
        this.notificationService = NotificationService;
        this.intializeListeners();
        
    }
    intializeListeners() {        
        this.em.on(this.eventNames.Assign_Plan_To_User, async(data)=>{
        let planDetails = await this.plansService.getFreePlan();
        planDetails = JSON.parse(JSON.stringify(planDetails));        
        planDetails["userId"] = data.userId;
        planDetails["planId"] = planDetails._id;  
        delete planDetails._id;
        await this.plansService.createActivePlan(planDetails);
        await this.plansService.createPlanHistory(planDetails);
      });
      this.em.on(this.eventNames.GENERATE_NOTIFICATION, async(data)=>{
        let notifyObj = await this.getNotificationObject(data);
        await this.notificationService.saveNotifications(notifyObj);
      })
    } 
    
    async getNotificationObject(data){
        let obj = {};
         switch(data["entity_type"]){
            case "Request":
                obj["senderId"] = data["followedBy"];
                obj["receiverId"] = data["userId"];
                const userInfo = await getUserNameAndImage(data["followedBy"]);
                obj["senderName"] = userInfo.fullName || null;
                obj["senderImage"] = userInfo.profileUrl || null;
                obj["content"] = "Friend request on your wall";
                obj["entity_type"] =  data["entity_type"];
                obj["entityId"] = data["_id"];   
            break;
            case "Accept":
                obj["senderId"] = data["userId"];
                obj["receiverId"] = data["followedBy"];
                const userInfoStatus = await getUserNameAndImage(data["userId"]);
                obj["senderName"] = userInfoStatus.fullName || null;
                obj["senderImage"] = userInfoStatus.profileUrl || null;
                obj["content"] = "Your Request Has been Accepted";
                obj["entity_type"] =  data["entity_type"];
                obj["entityId"] = data["_id"];
            break; 
            case "Comment":
                obj["senderId"] = data["userId"];
                const receiverInfo = await getReveiverUserIdByPostId(data["postId"]);
                const userInfoComment = await getUserNameAndImage(data["userId"]);
                obj["receiverId"] = receiverInfo.userId;               
                obj["senderName"] = userInfoComment.fullName || null;
                obj["senderImage"] = userInfoComment.profileUrl || null;
                obj["content"] = "Commnted on your post";
                obj["entity_type"] =  data["entity_type"];
                obj["entityId"] = data["postId"]; 
                obj["comment"] = data["comment"];
            break;
            case "Like":
                obj["senderId"] = data["userId"];                
                const userInfoLike = await getUserNameAndImage(data["userId"]);
                obj["receiverId"] = data["recieverId"];           
                obj["senderName"] = userInfoLike.fullName || null;
                obj["senderImage"] = userInfoLike.profileUrl || null;
                obj["content"] = "Commnted on your post";
                obj["entity_type"] =  data["entity_type"];
                obj["entityId"] = data["postId"];
            break;            
        }   
        return obj;
    }

    async getUserNameAndImage(userId){
        return await this.db.Users({_id:userId},{fullName:1, profileUrl:1});
    } 
    async getReveiverUserIdByPostId(postId){
        return await this.db.UserPosts({_id:postId},{userId:1});
    }

    
}
let em = new Events().em;
module.exports = em;