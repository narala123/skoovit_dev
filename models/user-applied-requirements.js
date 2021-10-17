const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppliedRequirements = new Schema({
    requirementAplliedUserId:{ type: Schema.Types.ObjectId,ref:'users' },	    
    requirementId:{ type: Schema.Types.ObjectId,ref:'requirementpost' },
    requirementCreatedUserId:{ type: Schema.Types.ObjectId,ref:'users' },	
    createdDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("appliedrequirements", AppliedRequirements);