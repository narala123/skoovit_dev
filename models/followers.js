const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Followers = new Schema({
    followedBy:{ type: Schema.Types.ObjectId,ref:'users' },    
    userId:{ type: Schema.Types.ObjectId,ref:'users' },
    requestStatus:{ type: String, default:"pending" },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("followers",Followers);