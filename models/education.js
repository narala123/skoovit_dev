const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Education = new Schema({	
    education:{ type:String, required:true },    
    active:{ type:Boolean, default:true },
    location:{ type:String },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});
module.exports = mongoose.model("education",Education);

