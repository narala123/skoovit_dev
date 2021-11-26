const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Influencer = new Schema({	   
    clientId:{ type: Schema.Types.ObjectId,ref:'users' },
    influencerId:{ type: Schema.Types.ObjectId,ref:'users' },
    selectedService:{ type:Array },
    description:{ type:String },
    budget:{ type:Number },
    active:{ type:Boolean, default:true },    
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("Influencer",Influencer);

