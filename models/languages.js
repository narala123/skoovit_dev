const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Languages = new Schema({	
    language:{ type:String, required:true },    
    active:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("languages",Languages);

