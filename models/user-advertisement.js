const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAdvProfile = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users' },	
    company_name:{ type: String },
    contactPerson:{ type: String },
    contactNo: { type: String },
    servicesOffered:{ type: Array },
    estdYear:{ type: String },
    location:{ type: String },
    description:{ type: String },
    isActive:{ type: Boolean, default: true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("useradvprofile",UserAdvProfile);