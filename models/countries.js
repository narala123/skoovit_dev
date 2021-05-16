const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Countries = new Schema({
    country:{ type:String,required:true },    
    active:{ type:Boolean,default:false },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("countries",Countries);