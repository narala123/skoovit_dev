const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPostComments = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users', required:true},
    postId:{ type: Schema.Types.ObjectId,ref:'userpost', required:true},
    comment:{ type:String, required:true },
    likes:{ type: Array },
    isActive:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("userpostcomments",UserPostComments);