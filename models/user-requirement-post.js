const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequirementPosts = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users' },	
    req_title:{ type: String },
    nameToBeDiplayed: { type: String } ,
    description:{ type: String },
    lookingFor : {
        category: { type: String },
        subCategory: { type: String },
        remuneration: { type: String },
    },
    age:{ 
        min:{ type: Number },
        max:{ type: Number },
    },
    availability:{ type: String },    
    gender:{ type: String },
    experience:{ 
        min:{ type: Number },
        max:{ type: Number },
    },
    locations:{ type: Array },
    languages:{ type: Array },
    postedOn:{ type: Date, default:Date.now },
    expiredOn:{ type: Date },
    isActive:{ type: Boolean },
    emailAlerts:{ type: Boolean, default:false},
    tags:{ type: Array },    
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("requirementpost",RequirementPosts);