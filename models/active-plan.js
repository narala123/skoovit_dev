const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivePlans = new Schema({
	userId:{ type: Schema.Types.ObjectId,ref:'users' },
    planId:{ type: Schema.Types.ObjectId,ref:'plans' }, 
    planType:{ type: String },   
    startDate:{  type:Date, default:Date.now },
    endDate:{ type: Date },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("activeplans",ActivePlans);

