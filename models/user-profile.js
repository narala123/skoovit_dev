const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfile = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users' },	
    userName:{ type: String },
    languages:{ type: Array },
    dob:{ type: String },
    gender:{ type: String },
    country:{ type: Schema.Types.ObjectId,ref:'countries' },
    state:{ type: Schema.Types.ObjectId,ref:'states' },
    city:{ type: Schema.Types.ObjectId,ref:'cities' },
    aboutMe:{ type: String },
    category:{ type: String },
    subCategory: { type: Array },
    education:{ type: String },
    skills:{ type: Array },
    physicalStats:{
        height:{ type: String },
        weight:{ type: String },
        waist:{ type: String },
        complexion:{ type: String },
    },
    socialMediaLinks: [
        {
            url:{ type: String },
            platFormType:{ type: String }
        }
    ],
    experience:[
        {
            projectName:{ type: String },
            role:{ type: String },
            description:{ type: String },
            releasedDateAndTime:{ type: String },
            refferenceLink:{ type: Array },
        }
    ],
    gallery:{
        images: [
            {
                name:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String }
            }
        ],
        videos:[
            {
                name:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String } 
            }
        ],
        audios:[
            {
                name:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String } 
            }
        ],
        docs:[
            {
                name:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String } 
            }
        ]
    },
    isActive:{ type: Boolean, default: true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("userprofile",UserProfile);