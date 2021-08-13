const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema({	
    senderId:{ type: Schema.Types.ObjectId,ref:'users'},
    senderName:{ type: String },
    receiverId:{ type: Schema.Types.ObjectId,ref:'users'},
    senderImage:{ type: String },
    isRead:{ type: Boolean, default:false },
    isDelete:{ type: Boolean, default:false },
    content:{ type: String },
    comment:{ type: String },
    entity_type:{ type: String },
    entityId:{ type: String },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("Notification",Notification);

