const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedRequirements = new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'users' },	    
    requirementId:{ type: Schema.Types.ObjectId,ref:'requirementpost' },
    requirementCreatedUserId:{ type: Schema.Types.ObjectId,ref:'users' },	
    createdDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("savedrequirements",SavedRequirements);