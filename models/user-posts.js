const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPost = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users', required:true},
    description:{ type:String, required:true },
    tagPeople:{ type: Array },
    location:{
        address:{ type: String },
        longitude:{ type: String },
        lattitude:{ type: String }
    },
    visibleTo:{ type: String, default: "public" },
    backgroundColour:{ type: String },
    postGallary:[
        {
            type:{ type: String },
            filename:{ type: String },
            originalName:{ type: String }
        }
    ],
    feelingActivity:{ type: String },
    gifUrl:{ type: String },
    likes:{ type: Array },
    views: { type: Array },
    isActive:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("userpost",UserPost);