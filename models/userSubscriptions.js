const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSubscriptions = new Schema({
	planId:{ type: Schema.Types.ObjectId,ref:'plans' },
	userId:{ type: Schema.Types.ObjectId,ref:'users' },
	subscriptionType: { type: String, default:'free' },
	startDate:{ type: Date },
	endDate:{ type: Date },
    active:{ type: Boolean, default: false },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("usersubscriptions",UserSubscriptions);