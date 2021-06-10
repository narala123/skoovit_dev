const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({	
    msg_fromId:{ type: Schema.Types.ObjectId,ref: 'users' },    
    msg_toId:{ type: Schema.Types.ObjectId,ref: 'users' },
    msg_fromName:{ type: String },
    msg_toName:{ type: String },
    msg_text:{ type: String },
    msg_sent:{ type: Number },
    msg_seen:{ type: Number },
    msg_delivered:{ type: Number },
    msg_sent_time:{ type: Date },
    msg_seen_time:{ type: Date },
    msg_delivered_time:{ type: Date },
    msg_type:{ type: Number },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("Chat",Chat);