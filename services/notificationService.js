const db = require("../models");
class NotificationService {
  constructor() {
    this.db = db;
  }

    // save notifications on comments/likes/request accepted/follow
    async saveNotifications(data) {
        try {
            //console.log(data,"-------");
            let createNotification = await this.db.Notifications.create(data);
            return createNotification;
        } catch (e) {
            //console.error("error",e)
            throw new Error(e);
        }
    };

    // get user Notification count
    async getUserNotificationsCount(userId) {
        try {
            //console.log(data,"-------");
            const count = await this.db.Notifications.countDocuments({receiverId:userId, isRead:false, isDelete:false});
            return count;
        } catch (e) {
            //console.error("error",e)
            throw new Error(e);
        }
    };

    // get user Notifications 
    async getUserNotifications(userId) {
        try {
            //console.log(data,"-------");
            const data = await this.db.Notifications.find({receiverId:userId, isRead:false, isDelete:false});
            return data;
        } catch (e) {
            //console.error("error",e)
            throw new Error(e);
        }
    };

    // to update notifications for update read false/true delete 
    async updateReadStatusNotifications(notificationId) {
        try {
            //console.log(data,"-------");
            const data = await this.db.Notifications.findOneUpdate({_id:notificationId},{$set:{isRead:true}});
            return data;
        } catch (e) {
            //console.error("error",e)
            throw new Error(e);
        }
    };
    // to update notifications for delete status as true 
    async updateDeleteNotifications(notificationId) {
        try {
            //console.log(data,"-------");
            const data = await this.db.Notifications.findOneUpdate({_id:notificationId},{$set:{isDelete:true}});
            return data;
        } catch (e) {
            //console.error("error",e)
            throw new Error(e);
        }
    };
}

module.exports = new NotificationService();