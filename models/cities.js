const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cities = new Schema({
	state:{ type: Schema.Types.ObjectId,ref:'states', required:true },
    city:{ type:String, required:true },    
    active:{ type:Boolean, default:false },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("cities",Cities);

