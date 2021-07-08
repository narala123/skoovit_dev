const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GlobalAds = new Schema({
	description:{ type: String },
    diplayContent:{ 
        url:{ type:String }, 
        type:{ type: String }
    },   
    active:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    expiryDate:{ type: Date },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("globalads",GlobalAds);

