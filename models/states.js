const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const States = new Schema({
	country:{ type: Schema.Types.ObjectId,ref:'countries', required:true },
    state:{ type:String, required:true },    
    active:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("states",States);

