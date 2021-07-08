const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionAds = new Schema({
	description:{ type: String },
    diplayContent:{ 
        url:{ type:String }, 
        type:{ type: String }
    },
    region:{ type: String },   
    active:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    expiryDate:{ type: Date },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("regionads",RegionAds);

