const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfile = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users' },	
    userName:{ type: String, unqiue:true },
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
            platFormType:{ type: String },
            followers: { type: Number },
            isActive:{ type: Boolean, default:true },
        }
    ],
    experience:[
        {
            projectName:{ type: String },
            role:{ type: String },
            from:{ type: String },
            to:{ type: String },
            description:{ type: String },
            releasedDateAndTime:{ type: String },
            refferenceLink:{ type: Array },
        }
    ],
    gallery:{
        images: [
            {
                type:{ type: String },
                filename:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String }
            }
        ],
        videos:[
            {
                type:{ type: String },
                filename:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String } 
            }
        ],
        audios:[
            {
                type:{ type: String },
                filename:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String } 
            }
        ],
        docs:[
            {
                type:{ type: String },
                filename:{ type: String },
                originalName:{ type: String },
                location:{ type: String },
                awsId:{ type: String } 
            }
        ]
    },
    entityForm:{
        name:{ type: String },
        contactPerson:{ type: String },
        estdYear:{ type: String },
        location:{
            address:{ type: String },
            longitude:{ type: String },
            lattitude:{ type: String }
        },
        about:{ type: String }
    },
    isActive:{ type: Boolean, default: true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("userprofile",UserProfile);