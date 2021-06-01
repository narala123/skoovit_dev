const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catgories = new Schema({	
    category:{ type: String, required:true },    
    active:{ type:Boolean, default:true },
    createDate:{ type:Date, default:Date.now },
    modifiedDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("catgories",Catgories);